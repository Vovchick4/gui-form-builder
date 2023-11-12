'use client'

import { v4 as uuid4 } from "uuid"
import { useState, useMemo } from "react";
import { useDesigner } from "@/contexts";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Column, ColumnEditorOptions } from "primereact/column";
import { TCol } from "./types";

const columns = [
    { field: 'column_name', header: 'Column name' },
    {
        field: 'relation_field', header: 'Relation filed', body: (rowData: any) => {
            return (
                <div>
                    <p>{rowData.relation_field}</p>
                </div>
            )
        }
    },
];

export default function RelationTable() {
    const [selectionRow, setSelectionRow] = useState<TCol[]>([]);
    const { inputs, requested, onAddRequest, onChangeRequsted, onRemoveRequsted } = useDesigner();
    const items = useMemo(() => inputs.map(({ name }) => (name)), [inputs]);

    const cellEditor = (options: ColumnEditorOptions) => {
        if (options.field === 'relation_field') return selectEditor(options);
        return textEditor(options);
    };

    const textEditor = (options: ColumnEditorOptions) => {
        return <InputText className="w-full" type="text" value={options.value} onChange={(e) => options?.editorCallback && options.editorCallback(e.target.value)} />;
    };

    const selectEditor = (options: ColumnEditorOptions) => {
        return <Dropdown options={items} value={options.value} placeholder="select field" onChange={(e) => options?.editorCallback && options.editorCallback(e.value)} />
    }

    const onRowEditComplete = (e: any) => {
        let _products = [...requested];
        let { newData, index } = e;

        _products[index] = newData;

        onChangeRequsted(_products);
    };

    const onSelectionChange = (e: any) => {
        setSelectionRow(e.value);
    }

    return (
        <div>
            <Button
                onClick={() => onAddRequest({ id: uuid4(), column_name: "edit field", relation_field: items[0] })}>
                Add a new field!
            </Button>
            <Button
                severity="danger"
                disabled={selectionRow.length === 0}
                onClick={() => onRemoveRequsted(selectionRow.map(({ id }) => id))}>
                {selectionRow?.length !== 0 ? `Delete choosen items ${selectionRow?.length}` : 'Choose items'}
            </Button>
            <DataTable
                editMode="row"
                dataKey="id"
                value={requested}
                selectionMode={"checkbox"}
                selection={selectionRow}
                tableStyle={{ position: "relative", minWidth: '50rem', zIndex: 999 }}
                onSelectionChange={onSelectionChange}
                onRowEditComplete={onRowEditComplete}
            >
                <Column selectionMode="multiple" exportable={false}></Column>
                {columns.map(({ field, header, body }) => {
                    return <Column
                        style={{ width: '25%' }}
                        key={field}
                        field={field}
                        header={header}
                        body={body && body}
                        editor={(options) => cellEditor(options)}
                    />;
                })}
                <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
            </DataTable>
        </div>
    )
}
