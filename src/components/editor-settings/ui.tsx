import { InputSwitch } from "primereact/inputswitch"
import { TMarkSettings } from "../form-builder/types"
import { TEditSettings, IEditorSettings, THeaderTemp } from "./types"
import { Fragment } from "react"

export const settings: TEditSettings[] = [
    {
        key: "font",
        render: ({ name, data, isVisible, onChange }) => <div className="">
            <h3 className="mb-2 font-bold">{name}</h3>
            <div className="flex gap-4 items-center">
                <InputSwitch name={name} checked={isVisible} onChange={(e) => onChange(e)} />
                <label>{isVisible ? "on" : "off"}</label>
            </div>
        </div>
    },
]

export const headerTemplates: THeaderTemp = {
    font: ({ isVisible }) => {
        return (
            <span className="ql-formats">
                {isVisible &&
                    <Fragment>
                        <button className="ql-bold" aria-label="Bold"></button>
                        <button className="ql-italic" aria-label="Italic"></button>
                        <button className="ql-underline" aria-label="Underline"></button>
                    </Fragment>
                }
            </span>
        )
    }

}

export default function EditorSettings({ markdown, onChange }: IEditorSettings) {
    return (
        <div className="flex items-center justify-between">
            {markdown && settings.map(({ key, render: Render }) => (
                <div>
                    <Render name={markdown[key].name} isVisible={markdown[key].isVisible} data={markdown[key].data} onChange={onChange} />
                </div>
            ))}
        </div>
    )
}