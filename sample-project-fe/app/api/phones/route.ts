import { NextRequest, NextResponse } from "next/server";
import {string, z} from 'zod'
import prisma from "@/prisma/client";

const createPhoneSchema = z.object({
    name: z.string(),
    unit: z.string(),
    brand: z.string(),
    manufacturer: z.string(),
    ram_size: z.string(),
    rom_size: z.string(),
    is_dual_sim: z.boolean(),
    has_5g_lte: z.boolean(),
})

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = createPhoneSchema.safeParse(body)
    if(!validation.success)
        return NextResponse.json(validation.error.errors, { status: 400 })
    const newPhone = await prisma.phone.create({
        data: {
            name: body.name,
            unit: body.unit,
            brand: body.brand,
            manufacturer: body.manufacturer,
            ram_size: body.ram_size,
            rom_size: body.rom_size,
            is_dual_sim: body.is_dual_sim,
            has_5g_lte: body.has_5g_lte,
        }
    })
    
    return NextResponse.json(newPhone, {status: 201})
}

export async function GET() {
    const newPhone = await prisma.phone.findMany();
    return NextResponse.json(newPhone, {status: 201})
}