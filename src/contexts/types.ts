import { Field, TInputInstance } from "@/components/form-builder/types";
import { ChangeEvent } from "react";

export type TDesignerContext = { inputs: TInputInstance[], activeInputID: string | null, toggleActiveInputID: (id: string) => void, updateInputByID: (id: string, event: ChangeEvent<HTMLInputElement> | boolean) => void, addInput: (param: Omit<Field, "Icon">) => void, shuffleInputs: (dr: number, hr: number) => void }