import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") ?? "";
  const berita = await prisma.berita.findMany({
    where: q ? { keterangan: { contains: q, mode: "insensitive" } } : undefined,
    orderBy: { tanggal: "desc" },
  });
  return NextResponse.json({ data: berita });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { keterangan, tanggal, link, foto, isPublished } = body;

  if (!keterangan || !tanggal) {
    return NextResponse.json({ error: "Keterangan dan tanggal wajib diisi" }, { status: 400 });
  }

  const berita = await prisma.berita.create({
    data: {
      keterangan,
      tanggal: new Date(tanggal),
      link: link || null,
      foto: foto || null,
      isPublished: isPublished ?? true,
    },
  });
  return NextResponse.json({ data: berita }, { status: 201 });
}
