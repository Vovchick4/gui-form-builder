'use client'

import { useEffect } from "react";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ProgressSpinner } from "primereact/progressspinner";

import { FormBuilder, RightAside } from "@/components";
import { useDesigner } from "@/contexts";
import { getFormById } from "@/app/online/[formId]/actions";
import { TFormDataBase, rightAsideMode } from "@/components/form-builder/types";

export default function EditFormId() {
    const { formId } = useParams();
    const { addInput, fillFormDataBase, clearInputs } = useDesigner();
    const { data, isLoading } = useSWR<TFormDataBase>(formId, getFormById);

    useEffect(() => {
        if (!data || !data.formData) return;

        let fillDate: Omit<TFormDataBase, "formData" | "requested"> = {};
        Object.entries(data).forEach(([key, value]) => {
            if (key !== "formData" && key !== "requested") {
                fillDate[key] = value;
            }
        });
        if (fillDate) {
            fillFormDataBase(fillDate);
        }

        const inputsParseds = JSON.parse(data.formData);
        for (const inputParsed in inputsParseds) {
            if (Object.prototype.hasOwnProperty.call(inputsParseds, inputParsed)) {
                addInput(inputsParseds[inputParsed] as any);
            }
        }

        return () => {
            clearInputs();
        }
    }, [data])

    if (isLoading) {
        return <ProgressSpinner />
    }

    if (!data) {
        return <p>Empty!</p>
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="mx-auto grid grid-cols-[1fr_400px] gap-4 max-w-7xl w-full">
                <FormBuilder />
                <RightAside mode={rightAsideMode.edit} />
            </div>
        </DndProvider>
    )
}
