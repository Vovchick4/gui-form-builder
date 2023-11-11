import { DesignerProvider } from "@/contexts"

export default function layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <DesignerProvider>
            {children}
        </DesignerProvider>
    )
}
