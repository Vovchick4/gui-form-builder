import { Type, Eye, ToggleRight } from "react-feather";
import { ETInput, TListOfFileds } from "../types";

export const listInpts: TListOfFileds = [{
    category: "Default fields",
    fields: [
        {
            Icon: Type,
            componentsRender: ETInput.default,
            type: "text",
            label: "Text field",
            fieldName: "Text field",
        },
        {
            Icon: Eye,
            componentsRender: ETInput.default,
            type: "password",
            label: "Password field",
            fieldName: "Password field",
        },
        {
            Icon: ToggleRight,
            componentsRender: ETInput.checkbox,
            type: "checkbox",
            label: "Checkbox field",
            fieldName: "Checkbox field",
        }
    ]
}]