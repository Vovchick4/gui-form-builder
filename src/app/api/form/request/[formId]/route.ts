import { prisma } from "@/lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, { params: { formId } }: { params: { formId: string } }) {
    try {
        const forms = await prisma.form.findFirst({ where: { id: formId } });
        if (!forms) {
            return NextResponse.json({ data: [], message: "Data not found!" });
        }
        let data;
        const req: any = await request.json();

        if (forms.requested && typeof forms.requested === 'string') {
            console.log(JSON.parse(req.requested));

            data = [...JSON.parse(forms.requested), ...JSON.parse(req.requested)]
        } else {
            data = [...forms.requested as any, ...JSON.parse(req.requested)]
        }

        const formUpdated = await prisma.form.update({ where: { id: formId }, data: { ...req, requested: JSON.stringify(data) } });
        return NextResponse.json({ data: formUpdated, message: "OK" });
    } catch (error) {
        console.log(error);

        NextResponse.json({ messaage: (error as Error).message }, { status: 500 });
    }
}