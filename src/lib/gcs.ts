// src/lib/gcs.ts

import { Storage } from '@google-cloud/storage';
import path from 'path';

const serviceAccount = JSON.parse(
  // garante que o JSON foi carregado da env var FIREBASE_SERVICE_ACCOUNT
  process.env.FIREBASE_SERVICE_ACCOUNT as string
);
const storage = new Storage({
  keyFilename: serviceAccountPath,
  projectId: 'vitriny-web' // seu Project ID real
});

// MUITO IMPORTANTE: Corrigido o nome do bucket
const bucket = storage.bucket('vitriny-web.firebasestorage.app');

export { bucket };
