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
              <Card className="relative" title={title} subTitle={author} footer={<Button label="Go to form online" link onClick={() => router.push(`/online/${id}`)} />}>
                <Button style={{ position: "absolute" }} className="top-2 right-2" icon="pi pi-file-edit" onClick={() => router.push(`/form-builder/${id}`)} />
              </Card>
            </li>
          ))}
        </ul>
      }
    </main>
  )
}
