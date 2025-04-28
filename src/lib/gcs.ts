// src/lib/gcs.ts

import { Storage } from '@google-cloud/storage';
import path from 'path';

const serviceAccountPath = path.join(process.cwd(), 'firebase-service-account.json');

const storage = new Storage({
  keyFilename: serviceAccountPath,
  projectId: 'vitrinyweb11' // seu Project ID real
});

// MUITO IMPORTANTE: Corrigido o nome do bucket
const bucket = storage.bucket('vitrinyweb11.firebasestorage.app');

export { bucket };
