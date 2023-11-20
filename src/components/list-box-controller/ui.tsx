import { createRef } from "react";
import { Button } from "primereact/button";
import { ListBox } from "primereact/listbox";
import { InputText } from "primereact/inputtext";

import { TListBoxController } from "./types";

export default function ListBoxController({ value, options, onChange, addOption, deleteOption }: TListBoxController) {
    const ref = createRef<any>()

    const itemTemp = (option: any) => {
        return (
            <div className="flex relative items-center justify-between">
                <p>{option}</p>
                <Button className="absolute right-2" style={{ width: 25, height: 30 }} icon="pi pi-trash" severity="danger" rounded outlined aria-label="Filter" size="small" onClick={() => deleteOption(option)} />
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-2">
            <span className="mt-4 w-full p-input-icon-right">
                <i className="pi pi-check-circle cursor-pointer" onClick={() => addOption(ref.current.value || "ok")} />
                <InputText className="w-full" ref={ref} placeholder="Provide text" />
            </span>
            <ListBox itemTemplate={itemTemp} defaultValue={value} value={value} options={options || []} onChange={onChange} />
        </div>
    )
}
