import { Type, Eye, AlignCenter, ToggleRight } from "react-feather";
import { ETInput, TListOfFileds } from "../types";

export const listInpts: TListOfFileds = [{
    category: "Default fields",
    fields: [
        {
            Icon: Type,
            componentsRender: ETInput.default,
            type: "text",
            label: "Text",
            fieldName: "Text field",
        },
        {
            Icon: Eye,
            componentsRender: ETInput.default,
            type: "password",
            label: "Password",
            fieldName: "Password field",
        },
        {
            Icon: ToggleRight,
            componentsRender: ETInput.checkbox,
            type: "checkbox",
            label: "Checkbox",
            fieldName: "Checkbox field",
        }
    ]
},
 {
    category: "Modern fields",
    fields: [
        {
            Icon: AlignCenter,
            componentsRender: ETInput.markdown,
            type: "",
            label: "Text editor",
            fieldName: "Text editor field"
        }
    ]
 }
]