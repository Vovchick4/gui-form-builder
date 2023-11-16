import { Icon } from "react-feather";

export enum rightAsideMode {
    create = "create",
    edit = "edit"
}

export type TFormDataBase = {
    [key: string]: string
    id: string
    title: string
    author: string
    email: string
    formData: string
    requested: string
    table_columns: string
}

export type TInputInstance = {
    id: string;
    value: string;
    type: string;
    name: string;
    label: string;
    required: boolean;
    fieldName: string;
    index?: number;
    componentsRender: ETInput
}

export type TCol = {
    [key: string]: string
    id: string
    column_name: string
    relation_field: string
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
    markdown = "markdown",
    dropdown = "dropdown"
}

export type Field = { Icon: Icon } & Omit<TInputsFields, "id" | "index">
export type ListOfField = { Icon: Icon } & Omit<TInputInstance, "id" | "index" | "placeholder">

export const ItemTypes = {
    BOX: 'box',
    CARD: 'card'
}

export type TListOfFileds = { category: string; fields: ListOfField[]; }[]
