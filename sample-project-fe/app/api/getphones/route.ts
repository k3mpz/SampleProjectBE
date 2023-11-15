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

export async function GET() {
    const newPhone = await prisma.phone.findMany();
    return NextResponse.json(newPhone, {status: 201})
}