'use client'

import { useState, useEffect, createElement } from "react";
import { useParams } from "next/navigation"
import useSWR from "swr";
import { getFormById } from "./actions";
import { FormInputs } from "@/components";
import { TFormDataBase, TInputsFields } from "@/components/form-builder/types";

export default function OnlienForm() {
    const { formId } = useParams();
    const { data } = useSWR<TFormDataBase>(formId, getFormById);
    const [requested, setRequested] = useState<{ name: string; value: string }[]>([]);

    useEffect(() => {
        if (data) {
            const formData = JSON.parse(data.formData) as TInputsFields[];
            const initialRequested = formData.map(current => ({ name: current.name, value: '' }));
            setRequested(initialRequested);
        }
    }, [data]);

    if (!data || requested.length === 0) {
        return <p>Empty!</p>
    }
    const formData = (JSON.parse(data.formData) as TInputsFields[])

    return (
        <div className="max-w-7xl mx-auto">
            <div className="px-4 py-4 bg-yellow-800 backdrop-opacity-5 backdrop-invert">
                <h1>Form: {data.title}</h1>
                <h3>Author: {data.author}</h3>
            </div>

            <form className="px-4 py-4 mt-4 max-w-4xl mx-auto flex flex-col gap-2 shadow-[0_35px_60px_-15px_rgba(255,255,255,.8)]">
                {formData && requested.length !== 0 &&
                    formData.map((i: any, index: number) => (
                        createElement(FormInputs.Components[i.componentsRender], { ...i, name: requested[index]?.name, value: requested[index]?.value, index, editable: true })
                    ))
                }
            </form>
        </div>
    )
}
