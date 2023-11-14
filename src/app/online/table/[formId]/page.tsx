'use client';

import useSWR from "swr"
import { useMemo } from "react";
import { useParams } from "next/navigation";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { ProgressSpinner } from "primereact/progressspinner";

import genereteData from "./utils";
import { getFormById } from "../../form/[formId]/actions";
import { BodyTemplate } from "@/components";
import { TFormDataBase } from "@/components/form-builder/types";

export default function Table() {
    const { formId } = useParams();
    const { data, isLoading } = useSWR<any>(formId, getFormById);
    const req = useMemo(() => data && genereteData(JSON.parse(data.requested)), [data])

    if (isLoading) {
        return <ProgressSpinner />
    }

    if (!data || !req) {
        return 'no data!'
    }

    return (
        <div className="max-w-7xl mx-auto">
            <DataTable
                dataKey="Id"
                value={req}
                showGridlines
                stateStorage="session"
                paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}
            >
                <Column style={{ width: '5%' }} field="Index" header="Id" sortable />
                {data.table_columns.map(({ column_name, relation_field, field_type }: any, i: number) => {
                    return <Column
                        key={i}
                        sortable
                        style={{ width: '25%' }}
                        field={relation_field}
                        header={column_name}
                        body={(field_type && BodyTemplate[field_type]) && ((options) => BodyTemplate[field_type](options, relation_field, column_name))}
                    />
                })}
            </DataTable>
        </div>
    )
}
