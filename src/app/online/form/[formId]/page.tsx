'use client'

import { useParams } from "next/navigation"
import { useState, useEffect, createElement, useRef } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { EditorTextChangeEvent } from "primereact/editor";
import { getFormById } from "./actions";
import { FormInputs } from "@/components";
import { updateForm } from "@/components/form-builder/right-aside/actions";
import { TFormDataBase, TInputsFields } from "@/components/form-builder/types";
import displayErrorMessage from "@/lib/errorMessage";
import { DropdownChangeEvent } from "primereact/dropdown";

export default function OnlienForm() {
    const { formId } = useParams();
    const editorToastRef: any = useRef(null);
    const { data } = useSWR<TFormDataBase>(formId, getFormById);
    const { trigger, isMutating } = useSWRMutation<any, any, any, any>(`/api/form/request/${data?.id}`, updateForm);
    const [requested, setRequested] = useState<{ name: string; value: string | boolean, checked: boolean }[]>([]);

    useEffect(() => {
        if (data) {
            const formData = JSON.parse(data.formData) as TInputsFields[];
            const initialRequested = formData.map(current => ({ name: current.name, value: current.value || "", checked: current.checked || false }));
            setRequested(initialRequested);
        }
    }, [data]);

    if (!data || requested.length === 0) {
        return <p>Empty!</p>
    }
    const formData = (JSON.parse(data.formData) as TInputsFields[])

    function onChange(e: EditorTextChangeEvent & React.ChangeEvent<HTMLInputElement> & DropdownChangeEvent, key?: string) {
        if (!key) {
            setRequested(prev => prev.map(pr => pr.name === e.target.name ? { ...pr, value: e.target.value || (e as any).value } : pr))
        } else {
            setRequested(prev => prev.map(pr => pr.name === key ? { ...pr, value: e.htmlValue || (e as any).checked || e.value || "" } : pr))
        }
    }

    async function onHandleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();

        //const req = data?.requested ? [...JSON.parse(data.requested), ...requested] : requested
        //console.log(req);

        try {
            await trigger({ ...data, requested: JSON.stringify(requested), id: undefined });
            editorToastRef.current?.show({ severity: "success", detail: "Successfull send!", life: 4300 });
        } catch (error) {
            editorToastRef.current?.show({ severity: "error", detail: displayErrorMessage(error as Error), life: 4300 });
        }
    }

    return (
        <div className="max-w-7xl mx-auto">
            <Toast ref={editorToastRef} position="center" />
            <div className="px-4 py-4 bg-yellow-800 backdrop-opacity-5 backdrop-invert">
                <h1>Form: {data.title}</h1>
                <h3>Author: {data.author}</h3>
            </div>
            <form
                onSubmit={onHandleSubmit}
                className="px-4 py-4 mt-4 max-w-4xl mx-auto flex flex-col gap-2 shadow-[0_35px_60px_-15px_rgba(255,255,255,.8)]"
            >
                {formData && requested.length !== 0 &&
                    formData.map((i: any, index: number) => (
                        createElement(FormInputs.Components[i.componentsRender], { ...i, name: requested[index]?.name, value: requested[index]?.value, index, editable: true, onChange })
                    ))
                }
                <Button type="submit" severity="success" loading={isMutating} disabled={isMutating}>Submit</Button>
            </form>
        </div>
    )
}
