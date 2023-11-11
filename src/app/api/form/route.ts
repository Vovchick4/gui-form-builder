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
        console.log(error);
        
        NextResponse.json({ messaage: (error as Error).message });
    }
}

export async function POST(request: NextRequest) {
    try {
        const formData: any = await request.json();

        if (!formData) {
            return NextResponse.json({ message: "Data not found!" });
        }

        const newFormData = await prisma.form.create({data: {
            ...formData
        }});
        return NextResponse.json({data: newFormData, message: "OK"});
    } catch (error) {
        return NextResponse.json({ message: (error as Error).message }, { status: 500 });
    }
}
