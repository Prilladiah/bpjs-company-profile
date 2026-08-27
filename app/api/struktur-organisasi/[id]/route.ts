import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
  params: { id: string };
}

export async function GET(_req: NextRequest, { params }: Params) {
  const item = await prisma.strukturOrganisasi.findUnique({
    where: { id: params.id },
    include: { children: true },
  });
  if (!item) return NextResponse.json({ error: "Data tidak ditemukan" }, { status: 404 });
  return NextResponse.json({ data: item });
}

export async function PUT(req: NextRequest, { params }: Params) {
  const body = await req.json();
  const { nama, jabatan, foto, urutan, parentId } = body;

  try {
    const item = await prisma.strukturOrganisasi.update({
      where: { id: params.id },
      data: {
        ...(nama !== undefined && { nama }),
        ...(jabatan !== undefined && { jabatan }),
        ...(foto !== undefined && { foto }),
        ...(urutan !== undefined && { urutan }),
        ...(parentId !== undefined && { parentId: parentId || null }),
      },
    });
    return NextResponse.json({ data: item });
  } catch {
    return NextResponse.json({ error: "Data tidak ditemukan" }, { status: 404 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    await prisma.strukturOrganisasi.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Data tidak ditemukan" }, { status: 404 });
  }
}
