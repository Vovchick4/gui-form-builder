import { prisma } from "@/lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const forms = await prisma.form.findMany({ });
        if (forms.length === 0) {
            return NextResponse.json({ data: [], message: "Data not found!" });
        }
        return NextResponse.json({data: forms, message: "OK"});
    } catch (error) {
        NextResponse.json({ messaage: (error as Error).message });
    }
}
