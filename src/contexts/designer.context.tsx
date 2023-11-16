'use client';

import { v4 as uuidv4 } from 'uuid';
import update from "immutability-helper";
import { ChangeEvent, ReactNode, createContext, useContext, useState } from "react";

import { TDesignerContext } from "./types";
import { ColumnEvent } from 'primereact/column';
import { IComponets } from '@/components/form-builder/form-inputs/types';
import { ETInput, Field, TCol, TFormDataBase, TInputsFields } from "@/components/form-builder/types";

export const DesignerContext = createContext<TDesignerContext>({} as TDesignerContext);

export function useDesigner() {
    return useContext(DesignerContext);
}

function generateDataForInput(data: Omit<Field, "Icon">): Omit<TInputsFields, "id"> {
    const addedData: IComponets<object> = {
        [ETInput.checkbox]: { checked: data.checked || false },
        [ETInput.default]: { placeholder: data.placeholder || "" },
        [ETInput.markdown]: {},
        [ETInput.dropdown]: {}
    }

    if (!addedData[data.componentsRender]) {
        throw new Error("Added data for input type not found");
    }

    return { ...data, ...addedData[data.componentsRender] }
}

export const DesignerProvider = ({ children }: { children: ReactNode }) => {
    const [requested, setRequested] = useState<TCol[]>([])
    const [inputs, setInputs] = useState<TInputsFields[]>([])
    const [activeInputID, setActiveInputID] = useState<string | null>(null);
    const [formDataBase, setFormDataBase] = useState<Omit<TFormDataBase, "formData" | "requested" | "table_columns"> | null>(null)

    function onAddRequest(data: TCol) {
        setRequested(prev => [...prev, data])
    }

    function onChangeRequsted(data: TCol[]) {
        setRequested(data);
    }

    function onRemoveRequsted(ids: string[]) {
        setRequested(prev => prev.filter(pr => !ids.includes(pr.id)));
    }

    function addInput(data: Omit<Field, "Icon">) {
        setInputs(prev => ([...prev, { ...generateDataForInput(data), id: uuidv4() }]))
    }

    function fillFormDataBase(data: Omit<TFormDataBase, "formData" | "requested">, parsed: any) {
        setRequested(parsed);
        setFormDataBase(data);
    }

    function clearInputs() {
        setInputs([]);
        setRequested([]);
        setFormDataBase(null);
    }

    function toggleActiveInputID(id: string) {
        setActiveInputID(prev => prev === id ? null : id);
    }

    function updateInputByID(id: string, event: ChangeEvent<HTMLInputElement> | boolean, nameKey?: string) {
        if (nameKey) {
            setInputs(prev => prev.map(input => input.id === id ? { ...input, [nameKey]: event } : input))
        } else {
            if (typeof event === "boolean") return;
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

    return <DesignerContext.Provider
        value={{
            inputs,
            activeInputID,
            formDataBase,
            requested,
            onAddRequest,
            onChangeRequsted,
            fillFormDataBase,
            onRemoveRequsted,
            toggleActiveInputID,
            updateInputByID,
            removeInputById,
            shuffleInputs,
            addInput,
            clearInputs
        }}>{children}</DesignerContext.Provider>
}