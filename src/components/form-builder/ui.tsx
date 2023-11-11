'use client';

import { useMemo } from "react";
import { TabPanel, TabView } from "primereact/tabview";
import { useDrop } from "react-dnd/dist/hooks";

import { FormInputs } from ".";
import { useDesigner } from "@/contexts"

import { ItemTypes } from "./types";
import RelationTable from "./relation-table";

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
            <TabView>
                <TabPanel header="Inputs" leftIcon="pi pi-database mr-2">
                    <ul className="flex flex-col gap-4 relative z-20">
                        {inputs && inputs.map((input, i) => (
                            <li key={input.id}>
                                {<FormInputs.FormInputs {...input} index={i} />}
                            </li>
                        ))}
                    </ul>
                </TabPanel>
                <TabPanel header="Table" leftIcon="pi pi-table mr-2">
                    <RelationTable />
                </TabPanel>
            </TabView>
            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-700 select-none">DropHere</p>
        </div>
    )
}