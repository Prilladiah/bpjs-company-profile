import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const testimoni = await prisma.kerjasamaTestimoni.findMany({ orderBy: { urutan: "asc" } });
  return NextResponse.json({ data: testimoni });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { isi, nama, jabatan, urutan } = body;

  if (!isi) {
    return NextResponse.json({ error: "Isi testimoni wajib diisi" }, { status: 400 });
  }

  const item = await prisma.kerjasamaTestimoni.create({
    data: { isi, nama: nama || null, jabatan: jabatan || null, urutan: urutan ?? 0 },
  });
  return NextResponse.json({ data: item }, { status: 201 });
}