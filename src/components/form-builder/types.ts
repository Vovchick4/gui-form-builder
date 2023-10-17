import { Icon } from "react-feather";

export type TInputInstance = {
    id: string;
    type: string;
    label: string;
    placeholder: string;
    required: boolean;
    fieldName: string;
    index?: number;
}

export type Field = { type: string, label: string, Icon: Icon, fieldName: string }

export const ItemTypes = {
    BOX: 'box',
    CARD: 'card'
}

export type TListOfFileds = { category: string; fields: Field[]; }[]
