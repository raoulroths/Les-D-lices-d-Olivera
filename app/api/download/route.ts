import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

export const dynamic = "force-dynamic";

const ZIP_PATH = path.join(process.cwd(), "public", "les-delices-olivera.zip");

export async function GET(request: Request) {
  const url = new URL(request.url);
  if (url.searchParams.get("code") !== "olivera") {
    return NextResponse.json(
      { error: "Ajoutez ?code=olivera à la fin de l’adresse." },
      { status: 400 },
    );
  }

  if (!fs.existsSync(ZIP_PATH)) {
    return NextResponse.json(
      { error: "Le zip n’est pas prêt. Lancez d’abord le build." },
      { status: 500 },
    );
  }

  const fileBuffer = fs.readFileSync(ZIP_PATH);
  const body = new Uint8Array(fileBuffer);
  return new NextResponse(body, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": 'attachment; filename="les-delices-olivera.zip"',
      "Content-Length": String(fileBuffer.length),
    },
  });
}
