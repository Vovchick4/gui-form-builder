'use client'

import { useRouter } from "next/navigation";
import useSWR from "swr"
import { getForms } from "./actions";
import { ProgressSpinner } from "primereact/progressspinner";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { TFormDataBase } from "@/components/form-builder/types";

export default function HomePage() {
  const router = useRouter()
  const { data, isLoading } = useSWR<TFormDataBase[]>('api/form', getForms);

  return (
    <main className="max-w-7xl mx-auto">
      {isLoading && <ProgressSpinner />}
      {!isLoading && data &&
        <ul className="grid gap-8" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))" }}>
          {data && data.map(({ id, title, author }) => (
            <li key={id}>
              <Card className="relative" title={title} subTitle={author} footer={<Button label="Go to form online" link onClick={() => router.push(`/online/form/${id}`)} />}>
                <div className="flex gap-4 absolute top-2 right-2">
                  <Button icon="pi pi-table" onClick={() => router.push(`/online/table/${id}`)} />
                  <Button icon="pi pi-file-edit" onClick={() => router.push(`/form-builder/${id}`)} />
                </div>
              </Card>
            </li>
          ))}
        </ul>
      }
    </main>
  )
}
