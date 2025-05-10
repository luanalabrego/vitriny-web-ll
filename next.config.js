/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'storage.googleapis.com',
      'firebasestorage.googleapis.com',
      // adicione aqui quaisquer outros hosts usados em seus imageUrl
    ],
  },
};

module.exports = nextConfig;
