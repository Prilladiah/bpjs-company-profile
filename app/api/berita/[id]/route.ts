import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
  params: { id: string };
}

export async function GET(_req: NextRequest, { params }: Params) {
  const berita = await prisma.berita.findUnique({ where: { id: params.id } });
  if (!berita) return NextResponse.json({ error: "Berita tidak ditemukan" }, { status: 404 });
  return NextResponse.json({ data: berita });
}

export async function PUT(req: NextRequest, { params }: Params) {
  const body = await req.json();
  const { keterangan, tanggal, link, foto, isPublished } = body;

  try {
    const berita = await prisma.berita.update({
      where: { id: params.id },
      data: {
        ...(keterangan !== undefined && { keterangan }),
        ...(tanggal !== undefined && { tanggal: new Date(tanggal) }),
        ...(link !== undefined && { link }),
        ...(foto !== undefined && { foto }),
        ...(isPublished !== undefined && { isPublished }),
      },
    });
    return NextResponse.json({ data: berita });
  } catch {
    return NextResponse.json({ error: "Berita tidak ditemukan" }, { status: 404 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    await prisma.berita.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Berita tidak ditemukan" }, { status: 404 });
  }
}
