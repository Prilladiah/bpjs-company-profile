import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const logos = await prisma.kerjasamaLogo.findMany({ orderBy: { urutan: "asc" } });
  return NextResponse.json({ data: logos });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { nama, logo, link, urutan } = body;

  if (!nama || !logo) {
    return NextResponse.json({ error: "Nama dan logo wajib diisi" }, { status: 400 });
  }

  const item = await prisma.kerjasamaLogo.create({
    data: { nama, logo, link: link || null, urutan: urutan ?? 0 },
  });
  return NextResponse.json({ data: item }, { status: 201 });
}