import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import AdmZip from "adm-zip";

export const dynamic = "force-dynamic";

const SKIP_DIRS = new Set(["node_modules", ".next", ".git"]);
const SKIP_ROOT_FILES = new Set([".env", ".env.example", "vercel.json"]);

export async function GET(request: Request) {
  const url = new URL(request.url);
  if (url.searchParams.get("code") !== "olivera") {
    return NextResponse.json(
      { error: "Ajoutez ?code=olivera à la fin de l’adresse." },
      { status: 400 },
    );
  }

  const root = process.cwd();
  const zip = new AdmZip();

  function walk(dir: string, base: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      const rel = base ? `${base}/${entry.name}` : entry.name;
      if (entry.isDirectory()) {
        if (!SKIP_DIRS.has(entry.name)) walk(full, rel);
      } else if (entry.isFile()) {
        if (base === "" && SKIP_ROOT_FILES.has(entry.name)) continue;
        zip.addFile(rel, fs.readFileSync(full));
      }
    }
  }

  walk(root, "");

  const buffer = zip.toBuffer();
  const body = new Uint8Array(buffer);
  return new NextResponse(body, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": 'attachment; filename="les-delices-olivera.zip"',
      "Content-Length": String(buffer.length),
    },
  });
}
