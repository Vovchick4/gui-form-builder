import { Icon } from "react-feather";

export type TInputInstance = {
    id: string;
    type: string;
    label: string;
    required: boolean;
    fieldName: string;
    index?: number;
    componentsRender: ETInput
}

export type TInputsFields = TInputInstance & TTextField & TCheckBox

export type TTextField = {
    placeholder?: string;
}

export type TCheckBox = {
    checked?: boolean;
}

export enum ETInput {
    default = "default",
    checkbox = "checkbox",
    markdown = "markdown"
}

export type Field = { Icon: Icon } & Omit<TInputInstance, "id" | "index" | "required" | "placeholder">

export const ItemTypes = {
    BOX: 'box',
    CARD: 'card'
}

export type TListOfFileds = { category: string; fields: Field[]; }[]
