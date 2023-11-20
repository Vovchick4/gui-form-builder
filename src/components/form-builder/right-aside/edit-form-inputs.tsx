import { Fragment, createElement } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputSwitch, InputSwitchChangeEvent } from 'primereact/inputswitch';
import { Accordion, AccordionTab } from "primereact/accordion";

import { useDesigner } from "@/contexts";
import { EditorSettings, ListBoxController } from "@/components";
import { IComponets } from "../form-inputs/types";
import { ETInput, TInputsFields } from "../types";
import type { TDesignerContext } from "@/contexts/types";
import SlugInput from "@/components/text-field-sluggbale/ui";

const editInputs: IComponets<React.FC<Omit<TInputsFields & Pick<TDesignerContext, "fillFieldInput" | "updateInputByID">, "componentsRender">>> = {
    [ETInput.default]: ({ id, placeholder, updateInputByID }) => {
        return (
            <Fragment>
                <p className="mb-2 text-sm">Placeholder:</p>
                <InputText autoComplete="off" className="p-2 w-full" name="placeholder" value={placeholder} onChange={(event) => updateInputByID(id, event)} />
            </Fragment>
        )
    },
    [ETInput.checkbox]: ({ id, value, updateInputByID }) => {
        return (
            <Fragment>
                <p className="mb-2 text-sm">Checked:</p>
                <InputSwitch checked={!!value || false} onChange={(event) => updateInputByID(id, event.value, "value")} />
            </Fragment>
        )
    },
    [ETInput.markdown]: ({ id, options, settings, fillFieldInput, updateInputByID }) => {
        function toggleSettings(e: InputSwitchChangeEvent) {
            const settingsName = e.target.name.toLocaleLowerCase();
            if (!settings || !settings[settingsName]) {
                return;
            }

            fillFieldInput(id, 'settings', { ...settings, [settingsName]: { ...settings[settingsName], isVisible: e.value } });
        }

        return (
            <Fragment>
                <EditorSettings markdown={settings} onChange={toggleSettings} />
            </Fragment>
        )
    },
    [ETInput.dropdown]: ({ id, value, options, placeholder, fillFieldInput, updateInputByID }) => {
        function addOpts(value: string) {
            fillFieldInput(id, 'options', [...options || [], value]);
        }

        function deleteOption(value: string) {
            fillFieldInput(id, 'options', options?.filter(op => op !== value));
        }

        return (
            <div>
                <Accordion activeIndex={0}>
                    <AccordionTab header="Options">
                        <p>Add a new Option</p>
                        <ListBoxController value={value} options={options} onChange={(e) => updateInputByID(id, e.value, "value")} addOption={addOpts} deleteOption={deleteOption} />
                    </AccordionTab>
                </Accordion>
                <p className="mb-2 text-sm">Placeholder:</p>
                <InputText autoComplete="off" className="p-2 w-full" name="placeholder" value={placeholder} onChange={(event) => updateInputByID(id, event)} />
            </div>

        )
    },
}

export default function EditFormInputs({ id, name, label, placeholder, required, componentsRender, ...rest }: TInputsFields) {
    const { fillFieldInput, updateInputByID, removeInputById } = useDesigner();

    return (
        <div>
            <form className="flex flex-col text-white gap-4" autoComplete="off">
                <div>
                    <p className="mb-2 text-sm">Name:</p>
                    <SlugInput name="name" value={name} onChange={(e) => updateInputByID(id, e)} />
                </div>
                <div>
                    <p className="mb-2 text-sm">Label:</p>
                    <InputText autoComplete="off" className="p-2 w-full" name="label" value={label} onChange={(event) => updateInputByID(id, event)} />
                </div>
                <div>
                    {editInputs[componentsRender] && createElement(editInputs[componentsRender], { id, name, label, placeholder, required, fillFieldInput, updateInputByID, ...rest })}
                </div>
                <div>
                    <p className="mb-2 text-sm">Required:</p>
                    <InputSwitch checked={required} onChange={(event) => updateInputByID(id, event.value, "required")} />
                </div>
            </form>
            <div className="mt-3">
                <Button className="w-full d-flex gap-2 justify-center items-center text-center p-3" severity="danger" onClick={() => removeInputById(id)}>
                    <span>Delete</span>
                    <i className="pi pi-trash"></i>
                </Button>
            </div>
        </div>
    )
}
