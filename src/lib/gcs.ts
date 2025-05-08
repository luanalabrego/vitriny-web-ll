// src/lib/gcs.ts
import { Storage } from '@google-cloud/storage';

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT as string
);

export const storage = new Storage({
  credentials: serviceAccount,
  projectId: serviceAccount.project_id,
});

export const bucket = storage.bucket('vitriny-web.firebasestorage.app');
