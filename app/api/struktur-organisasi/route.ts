import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") ?? "";
  const data = await prisma.strukturOrganisasi.findMany({
    where: q ? { nama: { contains: q, mode: "insensitive" } } : undefined,
    include: { children: { orderBy: { urutan: "asc" } } },
    orderBy: { urutan: "asc" },
  });
  return NextResponse.json({ data });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { nama, jabatan, foto, urutan, parentId } = body;

  if (!nama || !jabatan) {
    return NextResponse.json({ error: "Nama dan jabatan wajib diisi" }, { status: 400 });
  }

  const item = await prisma.strukturOrganisasi.create({
    data: { nama, jabatan, foto: foto || null, urutan: urutan ?? 0, parentId: parentId || null },
  });
  return NextResponse.json({ data: item }, { status: 201 });
}
