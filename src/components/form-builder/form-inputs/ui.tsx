'use client';

import { useRef, ReactNode, Fragment, createElement, useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import type { Identifier, XYCoord } from 'dnd-core'
import { getEmptyImage } from "react-dnd-html5-backend";
import { Editor } from "primereact/editor";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";

import { useDesigner } from '@/contexts';

import type { InputInstance } from "./types";
import { ETInput, ItemTypes, TInputsFields } from "../types";
import { Dropdown } from "primereact/dropdown";
import { headerTemplates } from "@/components/editor-settings/ui";

const inputInctance: InputInstance = {
    Container({ children, id, index }: { children: ReactNode; id: string, index: number }) {
        const ref = useRef<HTMLDivElement>(null)
        const { shuffleInputs, currentTranslate, changeCurrentTranslateY } = useDesigner();

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
                drop(item) {
                    changeCurrentTranslateY(0);
                },
                hover(item, monitor) {
                    if (!ref.current) {
                        return
                    }
                    const dragIndex = item.index
                    const hoverIndex = index

                    const delta = monitor.getDifferenceFromInitialOffset() as {
                        x: number
                        y: number
                    }

                    changeCurrentTranslateY(Math.round(delta.y));

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
                    const hoverClientY = ((clientOffset as XYCoord).y + Math.round(delta.y / 2)) - hoverBoundingRect.top

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

                    changeCurrentTranslateY(0);

                    // Time to actually perform the action
                    shuffleInputs(dragIndex, hoverIndex)

                    // Note: we're mutating the monitor item here!
                    // Generally it's better to avoid mutations,
                    // but it's good here for the sake of performance
                    // to avoid expensive index searches.
                    item.index = hoverIndex
                },
            }, [shuffleInputs, changeCurrentTranslateY]);

        const [{ isDragging }, drag, preview] = useDrag({
            type: ItemTypes.CARD,
            item: () => ({ id, index }),
            collect: (monitor: any) => ({
                isDragging: monitor.isDragging(),
            }),
        }, [id, index])

        useEffect(() => {
            preview(getEmptyImage(), { captureDraggingState: true })
        }, [])

        drag(drop(ref))

        return (
            <div style={{ transform: isDragging && `rotate(5deg) translate3d(0,${currentTranslate}px,0)` }} ref={ref} data-handler-id={handlerId} className={`${isDragging ? `cursor-move opacity-1 rotate-3 border-2 rounded-lg border-gray-500` : 'cursor-pointer'} transition-all`} >
                {children}
            </div>
        )
    },
    FormInputs(props: TInputsFields) {
        const { activeInputID, currentTranslate, toggleActiveInputID } = useDesigner();
        return (
            <inputInctance.Container id={props.id} index={props.index || 0}>
                <div className={`p-4 relative border-2 ${props.id === activeInputID ? 'border-slate-400' : 'border-none'} rounded-lg bg-slate-800 transition-all`} onClick={() => toggleActiveInputID(props.id)}>
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
        [ETInput.default]: ({ name, value, type, label, required, placeholder, editable = false, onChange = (e) => { } }) => {
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
                    onChange={onChange}
                    autoComplete="off"
                />
            </Fragment>)
        },
        [ETInput.checkbox]: ({ name, label, value, checked, editable, required, onChange = (e, key) => { } }) => {
            return (
                <Fragment>
                    <p className="text-white text-sm mb-2">{required && "*"}</p>
                    <label className={`flex gap-2 items-center ${editable ? "" : "select-none pointer-events-none"}`}>
                        <Checkbox size={4} checked={!!value || false} required={required} onChange={(e) => onChange(e as any, name)} />
                        <label className="text-white ml-2 text-sm">{label}</label>
                    </label>
                </Fragment>
            )
        },
        [ETInput.markdown]: ({ name, value, label, required, placeholder, editable = false, settings, onChange = (e, key) => { } }) => {
            return (
                <Fragment>
                    <p className="text-white text-sm mb-2">{label}{required && "*"}</p>
                    <Editor name={name} value={editable ? value : ""} headerTemplate={settings && Object.keys(settings).map((key) => (createElement(headerTemplates[key], settings[key])))} onTextChange={(e) => onChange(e as any, name)} className={`${editable ? '' : 'select-none pointer-events-none'}`} placeholder={placeholder} />
                </Fragment>
            )
        },
        [ETInput.dropdown]: ({ name, label, value, options = [], placeholder = "", editable = false, required, onChange = (e, key) => { } }) => {
            return (
                <div>
                    <p className="text-white text-sm mb-2">{label}{required && "*"}</p>
                    <Dropdown className={`w-full ${editable ? "" : "select-none pointer-events-none"}`} options={options} value={value} defaultValue={value} required={required} placeholder={!placeholder ? "Provide options!" : placeholder} onChange={(e) => onChange(e as any, name)} />
                </div>
            )
        }
    }
}

export default inputInctance