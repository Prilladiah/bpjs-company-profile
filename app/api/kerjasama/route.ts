import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { KerjasamaKategori } from "@prisma/client";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") ?? "";
  const kategori = req.nextUrl.searchParams.get("kategori") as KerjasamaKategori | null;
  const kerjasama = await prisma.kerjasama.findMany({
    where: {
      ...(q && { namaPerusahaan: { contains: q, mode: "insensitive" } }),
      ...(kategori && { kategori }),
    },
    orderBy: { urutan: "asc" },
  });
  return NextResponse.json({ data: kerjasama });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { namaPerusahaan, kategori, deskripsi, foto, urutan } = body;

  if (!namaPerusahaan || !kategori) {
    return NextResponse.json({ error: "Nama perusahaan dan kategori wajib diisi" }, { status: 400 });
  }

  const kerjasama = await prisma.kerjasama.create({
    data: { namaPerusahaan, kategori, deskripsi: deskripsi || null, foto: foto || null, urutan: urutan ?? 0 },
  });
  return NextResponse.json({ data: kerjasama }, { status: 201 });
}
