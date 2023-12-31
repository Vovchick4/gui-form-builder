'use client';

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { FormBuilder, RightAside } from "@/components";

export default function FormBuilderPage() {
    return (
        <DndProvider backend={HTML5Backend}>
            <div className="mx-auto grid grid-cols-[1fr_400px] gap-4 max-w-7xl w-full">
                <FormBuilder />
                <RightAside />
            </div>
        </DndProvider>
    )
}
