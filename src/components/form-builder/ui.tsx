'use client';

import { useMemo } from "react";
import { useDrop } from "react-dnd/dist/hooks";

import { FormInputs } from ".";
import { useDesigner } from "@/contexts"

import { ItemTypes } from "./types";

export default function FormBuilderUI() {
    const { inputs } = useDesigner();

    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.BOX,
        drop: () => ({ name: 'formBuilder' }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }))

    const classes = useMemo(() => {
        const styles: string[] = [];

        if (canDrop && isOver) {
            styles.push("bg-gray-500");
        } else {
            styles.push("bg-slate-950");
        }

        return styles.join(" ");
    }, [canDrop, isOver])

    return (
        <div ref={drop} data-testid="formBuilder" className={`p-2 relative rounded-lg ${classes}`}>
            <ul className="flex flex-col gap-4 relative z-[9999]">
                {inputs && inputs.map((input, i) => (
                    <li key={input.id}>
                        {<FormInputs.FormInputs {...input} index={i} />}
                    </li>
                ))}
            </ul>
            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-700 select-none">DropHere</p>
        </div>
    )
}