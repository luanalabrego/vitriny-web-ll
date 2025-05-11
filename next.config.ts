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
  // Middleware para proteger rotas e liberar estáticos/_next/image
  middleware: {
    matcher: [
      /*
        Aplica middleware a TODAS as rotas, exceto:
        - API (qualquer rota começando com /api)
        - arquivos estáticos do Next (_next/static)
        - otimizador de imagens do Next (_next/image)
        - favicon.ico
      */
      '/((?!api|_next/static|_next/image|favicon.ico).*)'
    ]
  }
}

export default nextConfig
