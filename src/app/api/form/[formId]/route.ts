import { prisma } from "@/lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params: { formId } }: { params: { formId: string } }) {
    try {
        const forms = await prisma.form.findFirst({ where: { id: formId } });
        if (!forms) {
            return NextResponse.json({ data: [], message: "Data not found!" });
        }
        return NextResponse.json({ data: forms, message: "OK" });
    } catch (error) {
        console.log(error);

        NextResponse.json({ messaage: (error as Error).message }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params: { formId } }: { params: { formId: string } }) {
    try {
        const forms = await prisma.form.findFirst({ where: { id: formId } });
        if (!forms) {
            return NextResponse.json({ data: [], message: "Data not found!" });
        }
        const formData: any = await request.json();
        const formUpdated = await prisma.form.update({ where: { id: formId }, data: { ...formData } });
        return NextResponse.json({ data: formUpdated, message: "OK" });
    } catch (error) {
        console.log(error);

        NextResponse.json({ messaage: (error as Error).message }, { status: 500 });
    }
}
