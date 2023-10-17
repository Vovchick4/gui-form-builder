import { Type, Eye } from "react-feather";
import { TListOfFileds } from "../types";

export const listInpts: TListOfFileds = [{
    category: "Default fields",
    fields: [
        {
            Icon: Type,
            type: 'text',
            label: "Text field",
            fieldName: "Text field"
        },
        {
            Icon: Eye,
            type: 'password',
            label: "Password field",
            fieldName: "Password field"
        }
    ]
}]