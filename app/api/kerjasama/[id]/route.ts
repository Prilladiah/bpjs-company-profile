import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
  params: { id: string };
}

export async function PUT(req: NextRequest, { params }: Params) {
  const body = await req.json();
  const { nama, logo, link, urutan } = body;

  try {
    const item = await prisma.kerjasamaLogo.update({
      where: { id: params.id },
      data: {
        ...(nama !== undefined && { nama }),
        ...(logo !== undefined && { logo }),
        ...(link !== undefined && { link }),
        ...(urutan !== undefined && { urutan }),
      },
    });
    return NextResponse.json({ data: item });
  } catch {
    return NextResponse.json({ error: "Logo tidak ditemukan" }, { status: 404 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    await prisma.kerjasamaLogo.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Logo tidak ditemukan" }, { status: 404 });
  }
}