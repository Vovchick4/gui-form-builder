'use client';

import useSWR from "swr"
import { useMemo } from "react";
import { v4 as uuid4 } from "uuid";
import { useParams } from "next/navigation";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { ProgressSpinner } from "primereact/progressspinner";

import genereteData from "./utils";
import { getFormById } from "../../form/[formId]/actions";
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
                dataKey="id"
                value={req}
            >
                <Column style={{ width: '5%' }} field="index" header="Id" />
                {data.table_columns.map(({ column_name, relation_field }: any, i: number) => {
                    return <Column
                        key={i}
                        style={{ width: '25%' }}
                        field={relation_field}
                        header={column_name}
                    />;
                })}
            </DataTable>
        </div>
    )
}
