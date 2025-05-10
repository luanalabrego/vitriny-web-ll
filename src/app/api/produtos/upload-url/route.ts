import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Storage } from '@google-cloud/storage';

const bucketName = process.env.GCLOUD_STORAGE_BUCKET;
if (!bucketName) {
  throw new Error('Env var GCLOUD_STORAGE_BUCKET não definida');
}

const storage = new Storage();
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
    expires: Date.now() + 15 * 60 * 1000, // 15 min
    contentType: 'application/octet-stream',
  });

  return NextResponse.json({ uploadUrl, fileName });
}
