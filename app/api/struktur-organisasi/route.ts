import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const SINGLETON_ID = "struktur";

export async function GET() {
  const data = await prisma.strukturOrganisasiFile.findUnique({ where: { id: SINGLETON_ID } });
  return NextResponse.json({ data });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { fileUrl, fileType } = body;

  if (!fileUrl) {
    return NextResponse.json({ error: "File wajib diunggah" }, { status: 400 });
  }

  const data = await prisma.strukturOrganisasiFile.upsert({
    where: { id: SINGLETON_ID },
    update: { fileUrl, fileType: fileType ?? "image" },
    create: { id: SINGLETON_ID, fileUrl, fileType: fileType ?? "image" },
  });

  return NextResponse.json({ data });
}