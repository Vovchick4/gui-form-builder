import { useMemo } from "react";
import { useDesigner } from "@/contexts";
import FieldList from "./field-list";
import { listInpts } from "./list-of-fields";
import EditFormInputs from "./edit-form-inputs";
import { TInputInstance, TInputsFields } from "../types";

export default function RightAside() {
    const { inputs, activeInputID } = useDesigner();
    const input: TInputsFields = useMemo(() => {
        return inputs.find(input => input.id === activeInputID) as TInputsFields
    }, [inputs, activeInputID])

    return (
        <div className="p-2 rounded-lg bg-slate-950 select-none">
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
        </div>
    )
}
