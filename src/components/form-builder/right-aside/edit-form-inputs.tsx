import { Fragment, createElement } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputSwitch } from 'primereact/inputswitch';

import { useDesigner } from "@/contexts";
import { IComponets } from "../form-inputs/types";
import { ETInput, TInputsFields } from "../types";
import type { TDesignerContext } from "@/contexts/types";

const editInputs: IComponets<React.FC<Omit<TInputsFields & Pick<TDesignerContext, "updateInputByID">, "componentsRender">>> = {
    [ETInput.default]: ({ id, placeholder, updateInputByID }) => {
        return (
            <Fragment>
                <p className="mb-2 text-sm">Placeholder:</p>
                <InputText className="p-2 w-full" name="placeholder" value={placeholder} onChange={(event) => updateInputByID(id, event)} />
            </Fragment>
        )
    },
    [ETInput.checkbox]: ({ id, checked, updateInputByID }) => {
        return (
            <Fragment>
                <p className="mb-2 text-sm">Required:</p>
                <InputSwitch checked={checked || false} onChange={(event) => updateInputByID(id, event.value, "checked")} />
            </Fragment>
        )
    },
}

export default function EditFormInputs({ id, label, placeholder, required, componentsRender, ...rest }: TInputsFields) {
    const { updateInputByID, removeInputById } = useDesigner();

    return (
        <Fragment>
            <form className="flex flex-col gap-4">
                <div>
                    <p className="mb-2 text-sm">Label:</p>
                    <InputText className="p-2 w-full" name="label" value={label} onChange={(event) => updateInputByID(id, event)} />
                </div>
                <div>
                    {createElement(editInputs[componentsRender], { id, label, placeholder, required, updateInputByID, ...rest })}
                </div>
                <div>
                    <p className="mb-2 text-sm">Required:</p>
                    <InputSwitch checked={required} onChange={(event) => updateInputByID(id, event.value)} />
                </div>
            </form>
            <div className="mt-3">
                <Button className="w-full d-flex gap-2 justify-center items-center text-center p-3" severity="danger" onClick={() => removeInputById(id)}>
                    <span>Delete</span>
                    <i className="pi pi-trash"></i>
                </Button>
            </div>
        </Fragment>
    )
}
