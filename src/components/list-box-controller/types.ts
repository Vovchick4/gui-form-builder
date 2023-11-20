import { ListBoxChangeEvent } from "primereact/listbox"

export type TListBoxController = {
    value: string
    options?: string[]
    onChange: (e: ListBoxChangeEvent) => void
    addOption: (value: string) => void
    deleteOption: (value: string) => void
}