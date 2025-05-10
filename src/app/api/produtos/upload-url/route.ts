// src/app/api/produtos/upload-url/route.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Storage } from '@google-cloud/storage';

const bucketName = process.env.GCLOUD_STORAGE_BUCKET;
const credsJson  = process.env.GOOGLE_CREDENTIALS;
if (!bucketName) {
  throw new Error('Env var GCLOUD_STORAGE_BUCKET não definida');
}
if (!credsJson) {
  throw new Error('Env var GOOGLE_CREDENTIALS não definida');
}

const credentials = JSON.parse(credsJson);
const storage = new Storage({
  projectId: credentials.project_id,
  credentials
});
const bucket = storage.bucket(bucketName);

export async function GET(request: NextRequest) {
  const ean = request.nextUrl.searchParams.get('ean');
  if (!ean) {
    return NextResponse.json({ error: 'EAN é obrigatório' }, { status: 400 });
  }

  const fileName = `produtos/original/${ean}-${Date.now()}.png`;
  const file = bucket.file(fileName);

  const [uploadUrl] = await file.getSignedUrl({
    version: 'v4',
    action: 'write',
    expires: Date.now() + 15 * 60 * 1000, // 15 minutos
    contentType: 'application/octet-stream',
  });

  return NextResponse.json({ uploadUrl, fileName });
}
