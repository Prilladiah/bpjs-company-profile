import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
  params: { id: string };
}

export async function GET(_req: NextRequest, { params }: Params) {
  const kerjasama = await prisma.kerjasama.findUnique({ where: { id: params.id } });
  if (!kerjasama) return NextResponse.json({ error: "Kerjasama tidak ditemukan" }, { status: 404 });
  return NextResponse.json({ data: kerjasama });
}

export async function PUT(req: NextRequest, { params }: Params) {
  const body = await req.json();
  const { namaPerusahaan, kategori, deskripsi, foto, urutan } = body;

  try {
    const kerjasama = await prisma.kerjasama.update({
      where: { id: params.id },
      data: {
        ...(namaPerusahaan !== undefined && { namaPerusahaan }),
        ...(kategori !== undefined && { kategori }),
        ...(deskripsi !== undefined && { deskripsi }),
        ...(foto !== undefined && { foto }),
        ...(urutan !== undefined && { urutan }),
      },
    });
    return NextResponse.json({ data: kerjasama });
  } catch {
    return NextResponse.json({ error: "Kerjasama tidak ditemukan" }, { status: 404 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    await prisma.kerjasama.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Kerjasama tidak ditemukan" }, { status: 404 });
  }
}
