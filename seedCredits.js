// seedCredits.js

// Se você tiver um .env local, descomente a linha abaixo
// require('dotenv').config();

const admin = require('firebase-admin');

const {
  FIREBASE_PROJECT_ID,
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_PRIVATE_KEY,
} = process.env;

if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
  console.error('❌ Faltam variáveis de ambiente do Firebase Admin.');
  process.exit(1);
}

// Inicializa o Admin SDK
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: FIREBASE_PROJECT_ID,
    clientEmail: FIREBASE_CLIENT_EMAIL,
    privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
});

const UID = 'xcD5UgKy4iNbKEAXL1TgvjV6HhN2';

async function run() {
  try {
    await admin
      .firestore()
      .collection('users')
      .doc(UID)
      .set({ credits: 10 }, { merge: true });
    console.log(`✅ users/${UID} agora tem credits = 10`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Erro ao escrever no Firestore:', err);
    process.exit(1);
  }
}

run();
