import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { GaleriKategori } from "@prisma/client";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") ?? "";
  const kategori = req.nextUrl.searchParams.get("kategori") as GaleriKategori | null;
  const galeri = await prisma.galeri.findMany({
    where: {
      ...(q && { keterangan: { contains: q, mode: "insensitive" } }),
      ...(kategori && { kategori }),
    },
    orderBy: { urutan: "asc" },
  });
  return NextResponse.json({ data: galeri });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { keterangan, kategori, foto, urutan } = body;

  if (!keterangan || !kategori || !foto) {
    return NextResponse.json({ error: "Keterangan, kategori, dan foto wajib diisi" }, { status: 400 });
  }

  const galeri = await prisma.galeri.create({
    data: { keterangan, kategori, foto, urutan: urutan ?? 0 },
  });
  return NextResponse.json({ data: galeri }, { status: 201 });
}
