import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
  params: { id: string };
}

export async function GET(_req: NextRequest, { params }: Params) {
  const galeri = await prisma.galeri.findUnique({ where: { id: params.id } });
  if (!galeri) return NextResponse.json({ error: "Galeri tidak ditemukan" }, { status: 404 });
  return NextResponse.json({ data: galeri });
}

export async function PUT(req: NextRequest, { params }: Params) {
  const body = await req.json();
  const { keterangan, kategori, foto, urutan } = body;

  try {
    const galeri = await prisma.galeri.update({
      where: { id: params.id },
      data: {
        ...(keterangan !== undefined && { keterangan }),
        ...(kategori !== undefined && { kategori }),
        ...(foto !== undefined && { foto }),
        ...(urutan !== undefined && { urutan }),
      },
    });
    return NextResponse.json({ data: galeri });
  } catch {
    return NextResponse.json({ error: "Galeri tidak ditemukan" }, { status: 404 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    await prisma.galeri.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Galeri tidak ditemukan" }, { status: 404 });
  }
}
