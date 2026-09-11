import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { comparePassword, verifyAdminToken, SESSION_COOKIE } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { oldPassword, newPassword } = await req.json();

    if (!oldPassword || !newPassword) {
      return NextResponse.json(
        { error: "Password lama dan baru wajib diisi" },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: "Password baru minimal 8 karakter" },
        { status: 400 }
      );
    }

    // 1. Ambil admin yang sedang login dari cookie/token
    const token = req.cookies.get(SESSION_COOKIE)?.value;
    const payload = token ? verifyAdminToken(token) : null;

    if (!payload) {
      return NextResponse.json({ error: "Tidak terautentikasi" }, { status: 401 });
    }

    const admin = await prisma.admin.findUnique({ where: { id: payload.id } });
    if (!admin) {
      return NextResponse.json({ error: "Admin tidak ditemukan" }, { status: 404 });
    }

    // 2. Cek password lama cocok
    const isValid = await comparePassword(oldPassword, admin.password);
    if (!isValid) {
      return NextResponse.json({ error: "Password lama salah" }, { status: 400 });
    }

    // 3. Hash password baru & update ke DB
    const newHash = await bcrypt.hash(newPassword, 10);
    await prisma.admin.update({
      where: { id: admin.id },
      data: { password: newHash },
    });

    return NextResponse.json({ message: "Password berhasil diganti" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}