'use client'

import React, { Fragment, useRef } from "react"
import { Codesandbox } from "react-feather"
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import useSWRMutation from "swr/mutation"
import { createForm, updateForm } from "./actions"
import { TInputsFields, rightAsideMode } from "../types"
import { Toast } from "primereact/toast"
import displayErrorMessage from "@/lib/errorMessage"
import { useDesigner } from "@/contexts"

const swrOptions = {
    [rightAsideMode['create']]: {
        url: '/api/form',
        meth: createForm,
        message: 'Created!'
    },
    [rightAsideMode.edit]: {
        url: '/api/form/',
        meth: updateForm,
        message: 'Edited!'
    }
}

export default function DialogForm({ mode = rightAsideMode.create, inpts, onCloseDialog }: { mode?: rightAsideMode, inpts: TInputsFields[], onCloseDialog: () => void }) {
    const { formDataBase } = useDesigner();
    const editorToastRef: any = useRef(null);
    const { trigger, isMutating } = useSWRMutation<any, any, any, any>(swrOptions[mode].url + (formDataBase?.id ? formDataBase?.id : ''), swrOptions[mode].meth);

    async function onSubmit(event: React.FormEvent) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget as HTMLFormElement);
        const data = Object.fromEntries(formData);

        // Log the form data
        console.log('Form Data:', data);
        try {
            await trigger({ ...data, requested: JSON.stringify([]), formData: JSON.stringify(inpts) })

            editorToastRef.current?.show({ severity: "success", summary: swrOptions[mode].message, life: 4300 });

            onCloseDialog();
        } catch (error) {
            editorToastRef.current?.show({ severity: "error", detail: displayErrorMessage(error as Error), life: 4300 });
        }
    }

    return (
        <Fragment>
            <Toast ref={editorToastRef} position="center" />
            <form onSubmit={onSubmit}>
                <InputText className="mt-4 p-4 w-full" name="title" placeholder="title" defaultValue={formDataBase?.title} />
                <InputText className="mt-4 p-4 w-full" name="email" placeholder="email" defaultValue={formDataBase?.email} />
                <InputText className="mt-4 p-4 w-full" name="author" placeholder="author" defaultValue={formDataBase?.author} />

                <Button
                    type="submit"
                    loading={isMutating}
                    outlined
                    severity="success"
                    className="mt-10 p-2 w-full flex items-center justify-between text-center"
                >
                    <span>Save</span>
                    <Codesandbox />
                </Button>
            </form>
        </Fragment>
    )
}
