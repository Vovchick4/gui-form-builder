'use client';

import { v4 as uuidv4 } from 'uuid';
import update from "immutability-helper";
import { ChangeEvent, ReactNode, createContext, useContext, useState } from "react";

import { TDesignerContext } from "./types";
import { IComponets } from '@/components/form-builder/form-inputs/types';
import { ETInput, Field, TInputsFields } from "@/components/form-builder/types";

export const DesignerContext = createContext<TDesignerContext>({} as TDesignerContext);

export function useDesigner() {
    return useContext(DesignerContext);
}

function generateDataForInput(data: Omit<Field, "Icon">): Omit<TInputsFields, "id" | "required"> {
    const addedData: IComponets<object> = {
        [ETInput.checkbox]: { checked: false },
        [ETInput.default]: { placeholder: "" },
        [ETInput.markdown]: { },
    }

    if (!addedData[data.componentsRender]) {
        throw new Error("Added data for input type not found");
    }

    return { ...data, ...addedData[data.componentsRender] }
}

export const DesignerProvider = ({ children }: { children: ReactNode }) => {
    const [inputs, setInputs] = useState<TInputsFields[]>([])
    const [activeInputID, setActiveInputID] = useState<string | null>(null);

    function addInput(data: Omit<Field, "Icon">) {
        setInputs(prev => ([...prev, { ...generateDataForInput(data), required: false, id: uuidv4() }]))
    }

    function toggleActiveInputID(id: string) {
        setActiveInputID(prev => prev === id ? null : id);
    }

    function updateInputByID(id: string, event: ChangeEvent<HTMLInputElement> | boolean, nameKey?: string) {
        if (nameKey) {
            setInputs(prev => prev.map(input => input.id === id ? { ...input, [nameKey]: event } : input))
        } else {
            if(typeof event === "boolean") return;
            setInputs(prev => prev.map(input => input.id === id ? { ...input, [event.target.name]: event.target.value } : input))
        }
    }

    function removeInputById(id: string) {
        if (id) {
            setActiveInputID(null);
            setInputs(prev => prev.filter((input) => input.id !== id))
        }
    }

    function shuffleInputs(dr: number, hr: number) {
        setInputs(prev => update(prev, {
            $splice: [
                [dr, 1],
                [hr, 0, prev[dr]],
            ]
        }))
    }

    return <DesignerContext.Provider value={{ inputs, activeInputID, toggleActiveInputID, updateInputByID, removeInputById, shuffleInputs, addInput }}>{children}</DesignerContext.Provider>
}