import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Storage } from '@google-cloud/storage';

const bucketName = process.env.GCLOUD_STORAGE_BUCKET;
const credsJson  = process.env.GOOGLE_CREDENTIALS;
if (!bucketName) throw new Error('GCLOUD_STORAGE_BUCKET não definida');
if (!credsJson)  throw new Error('GOOGLE_CREDENTIALS não definida');

const credentials = JSON.parse(credsJson);
const storage     = new Storage({ projectId: credentials.project_id, credentials });
const bucket      = storage.bucket(bucketName);

export async function POST(request: NextRequest) {
  const { fileName } = await request.json();
  if (!fileName) {
    return NextResponse.json({ error: '`fileName` é obrigatório' }, { status: 400 });
  }

  const file = bucket.file(fileName);

  try {
    // Torna o arquivo público
    await file.makePublic();

    // URL de acesso público
    const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
    return NextResponse.json({ publicUrl }, { status: 200 });
  } catch (err: any) {
    console.error('Erro em publish-original:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
