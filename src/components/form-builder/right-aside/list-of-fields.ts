import { Type, Eye, AlignCenter, ToggleRight, List} from "react-feather";
import { ETInput, TListOfFileds } from "../types";

export const field_types = ["String", "Text", "Switcher", "TextEditor"]

export const listInpts: TListOfFileds = [{
    category: "Default fields",
    fields: [
        {
            Icon: Type,
            name: "",
            value: "",
            required: false,
            componentsRender: ETInput.default,
            type: "text",
            label: "Text",
            fieldName: "Text field",
        },
        {
            Icon: Eye,
            name: "",
            value: "",
            required: false,
            componentsRender: ETInput.default,
            type: "password",
            label: "Password",
            fieldName: "Password field",
        },
        {
            Icon: ToggleRight,
            name: "",
            value: "",
            required: false,
            componentsRender: ETInput.checkbox,
            type: "checkbox",
            label: "Checkbox",
            fieldName: "Checkbox field",
        },
        {
            Icon: List,
            name: "",
            value: "",
            required: false,
            componentsRender: ETInput.dropdown,
            type: "dropdown",
            label: "Dropdown",
            fieldName: "Dropdown field",
        }
    ]
},
{
    category: "Modern fields",
    fields: [
        {
            Icon: AlignCenter,
            name: "",
            value: "",
            required: false,
            componentsRender: ETInput.markdown,
            type: "",
            label: "Text editor",
            fieldName: "Text editor field"
        }
    ]
}
]
