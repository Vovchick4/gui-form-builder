'use client';

import { useDrag } from "react-dnd";

import { useDesigner } from "@/contexts";
import { Field, ItemTypes, TInputsFields } from "../types";
import { v4 } from "uuid";

export default function FieldList({ Icon, ...rest }: Omit<Field, 'id'>) {
    const { addInput, toggleActiveInputID } = useDesigner();

    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.BOX,
        item: { name: rest.label },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult<TInputsFields>()
            if (item && dropResult) {
                const gIds = v4();
                addInput({ ...rest, id: gIds });
                toggleActiveInputID(gIds);
                alert(`You dropped ${item.name} into Form builder!`)
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
        }),
    }))

    return (
        <li ref={drag} data-testid={`formBuilder`} className="py-2 flex flex-col items-center text-center bg-gray-900 rounded-lg cursor-pointer transition-colors hover:bg-gray-700">
            <Icon />
            <p className="text-sm">{rest.label}</p>
        </li>
    )
}