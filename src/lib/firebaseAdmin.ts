// src/lib/firebaseAdmin.ts

import admin from 'firebase-admin';

const {
  FIREBASE_PROJECT_ID,
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_PRIVATE_KEY,
  FIREBASE_STORAGE_BUCKET,    // ← adicionamos esta env
} = process.env;

// DEBUG: log para verificar se as ENV estão chegando corretamente
console.log('Firebase Admin ENV:', {
  PROJECT_ID: FIREBASE_PROJECT_ID,
  CLIENT_EMAIL: FIREBASE_CLIENT_EMAIL,
  PRIVATE_KEY_SET: Boolean(FIREBASE_PRIVATE_KEY),
  STORAGE_BUCKET: FIREBASE_STORAGE_BUCKET,
});

if (
  !FIREBASE_PROJECT_ID ||
  !FIREBASE_CLIENT_EMAIL ||
  !FIREBASE_PRIVATE_KEY ||
  !FIREBASE_STORAGE_BUCKET
) {
  throw new Error(
    '❌ Variáveis de ambiente do Firebase Admin não definidas: ' +
    'FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY, ' +
    'e FIREBASE_STORAGE_BUCKET'
  );
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: FIREBASE_PROJECT_ID,
      clientEmail: FIREBASE_CLIENT_EMAIL,
      privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
    storageBucket: FIREBASE_STORAGE_BUCKET,  // ← bucket padrão
  });
  console.log('✅ Firebase Admin inicializado com sucesso');
}

export default admin;
