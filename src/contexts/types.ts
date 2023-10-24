import { ChangeEvent } from "react";
import { Field, TInputsFields } from "@/components/form-builder/types";

export type TDesignerContext = { inputs: TInputsFields[], activeInputID: string | null, toggleActiveInputID: (id: string) => void, updateInputByID: (id: string, event: ChangeEvent<HTMLInputElement> | boolean, nameKey?: string) => void, removeInputById: (id: string) => void, addInput: (param: Omit<Field, "Icon">) => void, shuffleInputs: (dr: number, hr: number) => void }