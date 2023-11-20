import { FC } from "react";
import { TMarkSettings } from "../form-builder/types";
import { InputSwitchChangeEvent } from "primereact/inputswitch";

export interface IEditorSettings {
    markdown?: TMarkSettings['settings']
    onChange: (e: InputSwitchChangeEvent) => void
}

export type TEditSettings = {
    key: string
    render: FC<{ name: string
        data: string[]
        isVisible: boolean, onChange: (e: InputSwitchChangeEvent) => void }>
}

export type THeaderTemp = {
    [key: string]: FC<{isVisible: boolean}>
    font: FC<{isVisible: boolean}>
}