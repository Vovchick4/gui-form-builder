import { ChangeEvent } from "react";
import { Field, TCol, TFormDataBase, TInputsFields } from "@/components/form-builder/types";
import { ColumnEvent } from "primereact/column";

export type TDesignerContext = {
    inputs: TInputsFields[],
    activeInputID: string | null,
    formDataBase: Omit<TFormDataBase, "formData" | "requested"> | null,
    requested: TCol[],
    currentTranslate: string,
    changeCurrentTranslateY: (param: number) => void,
    onAddRequest: (data: TCol) => void,
    fillFormDataBase: (data: Omit<TFormDataBase, "formData" | "requested">, parsed: any) => void,
    onChangeRequsted: (data: TCol[]) => void,
    onRemoveRequsted: (ids: string[]) => void,
    toggleActiveInputID: (id: string) => void,
    updateInputByID: (id: string, event: ChangeEvent<HTMLInputElement> | boolean, nameKey?: string) => void,
    removeInputById: (id: string) => void,
    addInput: (param: Omit<Field, "Icon">) => void,
    clearInputs: () => void,
    shuffleInputs: (dr: number, hr: number) => void
}