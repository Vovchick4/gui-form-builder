import { ChangeEventHandler, ReactNode } from "react";
import { TInputsFields } from "../types";
import { EditorTextChangeEvent } from "primereact/editor";

// Define types for the input instance
export interface InputInstance {
    Container: React.FC<{ children: ReactNode; id: string; index: number }>;
    FormInputs: React.FC<TInputsFields>;
    Components: IComponets<React.FC<TInputsFields & { editable?: boolean, onChange?: (e: EditorTextChangeEvent & React.ChangeEvent<HTMLInputElement>, key?: string) => void }>>;
}

export interface IComponets<M> {
    [key: string]: M;
    default: M;
    checkbox: M;
    markdown: M;
}