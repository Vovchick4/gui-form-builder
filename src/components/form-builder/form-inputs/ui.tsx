'use client';

import { useRef, ReactNode } from "react";
import { useDrag, useDrop } from "react-dnd";
import { InputText } from "primereact/inputtext";
import type { Identifier, XYCoord } from 'dnd-core'

import { useDesigner } from '@/contexts';
import { ItemTypes, TInputInstance } from "../types";

const inputInctance = {
    Container({ children, id, index }: { children: ReactNode; id: string, index: number }) {
        const ref = useRef<HTMLDivElement>(null)
        const { shuffleInputs } = useDesigner();

        const [{ handlerId }, drop] = useDrop<
            { id: string; index: number },
            void,
            { handlerId: Identifier | null }>({
                accept: ItemTypes.CARD,
                collect(monitor) {
                    return {
                        handlerId: monitor.getHandlerId(),
                    }
                },
                hover(item, monitor) {
                    if (!ref.current) {
                        return
                    }
                    const dragIndex = item.index
                    const hoverIndex = index

                    // Don't replace items with themselves
                    if (dragIndex === hoverIndex) {
                        return
                    }

                    // Determine rectangle on screen
                    const hoverBoundingRect = ref.current?.getBoundingClientRect()

                    // Get vertical middle
                    const hoverMiddleY =
                        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

                    // Determine mouse position
                    const clientOffset = monitor.getClientOffset()

                    // Get pixels to the top
                    const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

                    // Only perform the move when the mouse has crossed half of the items height
                    // When dragging downwards, only move when the cursor is below 50%
                    // When dragging upwards, only move when the cursor is above 50%

                    // Dragging downwards
                    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                        return
                    }

                    // Dragging upwards
                    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                        return
                    }

                    // Time to actually perform the action
                    shuffleInputs(dragIndex, hoverIndex)

                    // Note: we're mutating the monitor item here!
                    // Generally it's better to avoid mutations,
                    // but it's good here for the sake of performance
                    // to avoid expensive index searches.
                    item.index = hoverIndex
                },
            });

        const [{ isDragging }, drag] = useDrag({
            type: ItemTypes.CARD,
            item: () => ({ id, index }),
            collect: (monitor: any) => ({
                isDragging: monitor.isDragging(),
            }),
        })

        drag(drop(ref))

        return (
            <div ref={ref} className={`${isDragging ? 'cursor-move opacity-0' : 'cursor-pointer'}`} data-handler-id={handlerId}>
                {children}
            </div>
        )
    },
    FormInputs({ id, index, type = "text", label = "label", placeholder = "placeholder", required = true, fieldName = "", }: TInputInstance) {
        const { activeInputID, toggleActiveInputID } = useDesigner();
        return (
            <inputInctance.Container id={id} index={index || 0}>
                <div className={`p-4 relative border-2 ${id === activeInputID ? 'border-slate-400' : 'border-none'} rounded-lg bg-slate-800`} onClick={() => toggleActiveInputID(id)}>
                    <p className="text-sm mb-2">{label}{required && "*"}</p>
                    <InputText className="px-2 w-full select-none pointer-events-none" type={type} title={label} placeholder={placeholder} required={required} />
                    <div className="absolute top-2 right-2 select-none pointer-events-none">
                        <p className="text-sm text-gray-500">{fieldName}</p>
                    </div>
                </div>
            </inputInctance.Container>
        )
    }
}

export default inputInctance