import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { KerjasamaKategori } from "@prisma/client";

export async function GET(req: NextRequest) {
  const kategori = req.nextUrl.searchParams.get("kategori") as KerjasamaKategori | null;
  const kerjasama = await prisma.kerjasama.findMany({
    where: kategori ? { kategori } : undefined,
    orderBy: { urutan: "asc" },
  });
  return NextResponse.json({ data: kerjasama });
}

// kategori bersifat unik (1 baris per kategori) -- pakai upsert supaya
// admin bisa langsung "simpan" kategori yang sama tanpa error duplikat
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { kategori, judul, foto, poinAwal, poinAkhir, urutan } = body;

  if (!kategori || !judul) {
    return NextResponse.json({ error: "Kategori dan judul wajib diisi" }, { status: 400 });
  }

  const kerjasama = await prisma.kerjasama.upsert({
    where: { kategori },
    update: {
      judul,
      foto: foto ?? null,
      poinAwal: poinAwal ?? [],
      poinAkhir: poinAkhir ?? [],
      ...(urutan !== undefined && { urutan }),
    },
    create: {
      kategori,
      judul,
      foto: foto ?? null,
      poinAwal: poinAwal ?? [],
      poinAkhir: poinAkhir ?? [],
      urutan: urutan ?? 0,
    },
  });
  return NextResponse.json({ data: kerjasama }, { status: 201 });
}