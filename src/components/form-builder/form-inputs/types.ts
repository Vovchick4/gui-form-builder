import { ReactNode } from "react";
import { TInputsFields } from "../types";

// Define types for the input instance
export interface InputInstance {
    Container: React.FC<{ children: ReactNode; id: string; index: number }>;
    FormInputs: React.FC<TInputsFields>;
    Components: IComponets<React.FC<TInputsFields>>;
}

export interface IComponets<M> {
    [key: string]: M;
    default: M;
    checkbox: M;
    markdown: M;
}