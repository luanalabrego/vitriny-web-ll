// next.config.ts

import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Ignora erros de ESLint durante a build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Ignora erros de TypeScript durante a build
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
