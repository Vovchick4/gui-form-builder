'use client'

import { useMemo, useState } from "react";
import { Button } from "primereact/button";
import { Codesandbox } from "react-feather";
import { Dialog } from "primereact/dialog";

import { useDesigner } from "@/contexts";
import FieldList from "./field-list";
import { listInpts } from "./list-of-fields";
import EditFormInputs from "./edit-form-inputs";
import { TInputsFields, rightAsideMode } from "../types";
import DialogForm from "./dialog-form";

const stateDialog = {
    [rightAsideMode.create]: "CREATE_FORM",
    [rightAsideMode.edit]: "EDIT_FORM"
}

const buttonMessage = {
    [rightAsideMode.create]: "Publish",
    [rightAsideMode.edit]: "Edit"
}

export default function RightAside({ mode = rightAsideMode.create }: { mode?: rightAsideMode }) {
    const [activeDialog, setActiveDialog] = useState<string | null>(null)
    const { inputs, activeInputID } = useDesigner();
    const input: TInputsFields = useMemo(() => {
        return inputs.find(input => input.id === activeInputID) as TInputsFields
    }, [inputs, activeInputID])

    return (
        <div className="sticky top-0 p-2 flex flex-col justify-between rounded-lg bg-slate-950 select-none">
            {activeInputID ? (
                <EditFormInputs {...input} />
            ) : (
                <ul className="flex flex-col gap-4">
                    {listInpts.map(({ category, fields }, i) => (
                        <li className="text-white" key={i}>
                            <p className="text-gray-500 text-sm mb-2">{category}</p>
                            <ul className="grid grid-cols-3 gap-4">
                                {fields.map((field) => <FieldList key={field.label} {...field} />)}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}

            <Dialog header="Last touches" visible={activeDialog === stateDialog['create']} onHide={() => setActiveDialog(null)}
                style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                <DialogForm inpts={inputs} onCloseDialog={() => setActiveDialog(null)} />
            </Dialog>

            <Dialog header="Last touches" visible={activeDialog === stateDialog['edit']} onHide={() => setActiveDialog(null)}
                style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                <DialogForm mode={rightAsideMode.edit} inpts={inputs} onCloseDialog={() => setActiveDialog(null)} />
            </Dialog>

            <Button
                disabled={inputs?.length === 0}
                className="mt-10 p-2 w-full flex items-center justify-between text-center"
                severity="success"
                onClick={() => {
                    if (inputs?.length === 0) {
                        return;
                    }
                    setActiveDialog(stateDialog[mode]);
                }}
            >
                <span>{buttonMessage[mode]}</span>
                <Codesandbox />
            </Button>
        </div>
    )
}
