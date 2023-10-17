'use client';

import { v4 as uuidv4 } from 'uuid';
import update from "immutability-helper";
import { ChangeEvent, ReactNode, createContext, useContext, useState } from "react";

import { TDesignerContext } from "./types";
import { Field, TInputInstance } from "@/components/form-builder/types";

export const DesignerContext = createContext<TDesignerContext>({} as TDesignerContext);

export function useDesigner() {
    return useContext(DesignerContext);
}

export const DesignerProvider = ({ children }: { children: ReactNode }) => {
    const [inputs, setInputs] = useState<TInputInstance[]>([])
    const [activeInputID, setActiveInputID] = useState<string | null>(null);

    function addInput(data: Omit<Field, "Icon">) {
        setInputs(prev => ([...prev, { id: uuidv4(), label: data.label, type: data.type, placeholder: "", fieldName: data.fieldName, required: false }]))
    }

    function toggleActiveInputID(id: string) {
        setActiveInputID(prev => prev === id ? null : id);
    }

    function updateInputByID(id: string, event: ChangeEvent<HTMLInputElement> | boolean) {
        if (typeof event === "boolean") {
            setInputs(prev => prev.map(input => input.id === id ? { ...input, ["required"]: event } : input))
        } else {
            setInputs(prev => prev.map(input => input.id === id ? { ...input, [event.target.name]: event.target.value } : input))
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

    return <DesignerContext.Provider value={{ inputs, activeInputID, toggleActiveInputID, updateInputByID, shuffleInputs, addInput }}>{children}</DesignerContext.Provider>
}