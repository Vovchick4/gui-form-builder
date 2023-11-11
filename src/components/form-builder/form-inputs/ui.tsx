'use client';

import { useRef, ReactNode, Fragment, createElement } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Editor } from "primereact/editor";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";

import { useDesigner } from '@/contexts';

import type { Identifier, XYCoord } from 'dnd-core'
import type { InputInstance } from "./types";
import { ETInput, ItemTypes, TInputsFields } from "../types";

const inputInctance: InputInstance = {
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
    FormInputs(props: TInputsFields) {
        const { activeInputID, toggleActiveInputID } = useDesigner();
        return (
            <inputInctance.Container id={props.id} index={props.index || 0}>
                <div className={`p-4 relative border-2 ${props.id === activeInputID ? 'border-slate-400' : 'border-none'} rounded-lg bg-slate-800`} onClick={() => toggleActiveInputID(props.id)}>
                    {inputInctance.Components[props.componentsRender] &&
                        createElement(inputInctance.Components[props.componentsRender], props)}
                    <div className="absolute top-2 right-2 select-none pointer-events-none">
                        <p className="text-sm text-gray-500">{props.fieldName}</p>
                    </div>
                </div>
            </inputInctance.Container>
        )
    },
    Components: {
        [ETInput.default]: ({ name, value, type, label, required, placeholder, editable = false }) => {
            return (<Fragment>
                <p className="text-white text-sm mb-2">{label}{required && "*"}</p>
                <InputText
                    name={name}
                    type={type}
                    className={`px-2 w-full ${editable ? '' : 'select-none pointer-events-none'}`}
                    title={label}
                    placeholder={placeholder}
                    required={required}
                    value={editable ? value : ""}
                    autoComplete="off"
                />
            </Fragment>)
        },
        [ETInput.checkbox]: ({ label, checked, required }) => {
            return (
                <Fragment>
                    <p className="text-white text-sm mb-2">{required && "*"}</p>
                    <Checkbox size={4} checked={checked || false} />
                    <label className="text-white ml-2 text-sm">{label}</label>
                </Fragment>
            )
        },
        [ETInput.markdown]: ({ name, value, label, required, placeholder, editable = false }) => {
            return (
                <Fragment>
                    <p className="text-white text-sm mb-2">{label}{required && "*"}</p>
                    <Editor name={name} value={editable ? value : ""} className={`${editable ? '' : 'select-none pointer-events-none'}`} placeholder={placeholder} />
                </Fragment>
            )
        }
    }
}

export default inputInctance