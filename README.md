# Vitriny Web

Vitriny Web é uma aplicação para gerenciamento de produtos e processamento de imagens para e-commerce. A aplicação permite o upload de imagens de produtos, geração de descrições detalhadas usando IA, e processamento de imagens para criar visualizações profissionais de frente e costas.

## Funcionalidades

- **Sistema de autenticação**
  - Login com email e senha
  - Vinculação de usuários a empresas
  - Acesso restrito aos dados da própria empresa

- **Gerenciamento de produtos**
  - Cadastro individual de produtos com todos os campos solicitados (EAN, descrição, marca, cor, tamanho)
  - Upload de imagens unitário e em massa
  - Geração de descrições detalhadas usando IA

- **Processamento de imagens**
  - Opções de geração de imagens (frente e costas)
  - Integração com API OpenAI para processamento de imagens
  - Prompts específicos para cada tipo de visualização

- **Sistema de busca e download**
  - Busca por qualquer campo (EAN, descrição, marca, cor, tamanho)
  - Seleção múltipla de produtos
  - Download de imagens processadas

## Instruções para Implantação no Vercel

### Pré-requisitos

1. Conta no [Vercel](https://vercel.com)
2. Conta na [OpenAI](https://openai.com) para obter uma chave de API (necessária para o processamento de imagens e geração de descrições)

### Passos para Implantação

1. **Faça login no Vercel**
   - Acesse [vercel.com](https://vercel.com) e faça login com sua conta (você pode usar GitHub, GitLab ou Bitbucket)

2. **Crie um novo projeto**
   - Clique em "Add New" > "Project"
   - Importe o repositório do GitHub ou faça upload do código diretamente

3. **Configure o projeto**
   - Nome do projeto: `vitriny-web` (ou outro nome de sua preferência)
   - Framework Preset: `Next.js`
   - Root Directory: `./` (diretório raiz)

4. **Configure as variáveis de ambiente**
   - Adicione as seguintes variáveis de ambiente:
     - `OPENAI_API_KEY`: Sua chave de API da OpenAI
     - `DATABASE_URL`: URL de conexão com o banco de dados (se estiver usando um banco de dados externo)
     - `JWT_SECRET`: Uma string aleatória para assinar tokens JWT

5. **Implante o projeto**
   - Clique em "Deploy"
   - Aguarde a conclusão da implantação

6. **Acesse sua aplicação**
   - Após a implantação, você receberá um URL (geralmente `seu-projeto.vercel.app`)
   - Acesse o URL para verificar se a aplicação está funcionando corretamente

### Configuração do Banco de Dados (Opcional)

Para um ambiente de produção completo, recomendamos configurar um banco de dados externo:

1. **Crie um banco de dados**
   - Recomendamos [PlanetScale](https://planetscale.com) (MySQL), [Supabase](https://supabase.com) (PostgreSQL) ou [MongoDB Atlas](https://www.mongodb.com/atlas/database)

2. **Atualize a variável de ambiente `DATABASE_URL`**
   - Obtenha a string de conexão do seu banco de dados
   - Atualize a variável de ambiente no Vercel

3. **Execute as migrações**
   - Você pode executar as migrações manualmente ou configurar um script de build para executá-las automaticamente

## Usuário de Demonstração

Para fins de teste, você pode usar as seguintes credenciais:

- **Email**: admin@vitriny.com
- **Senha**: admin123

## Personalização

Você pode personalizar a aplicação editando os seguintes arquivos:

- **Cores e tema**: `/src/app/globals.css`
- **Layout**: `/src/app/(dashboard)/layout.tsx`
- **Prompts de IA**: `/src/app/api/produtos/processar/route.ts` e `/src/app/api/produtos/processar-massa/route.ts`

## Suporte

Para suporte ou dúvidas, entre em contato com a equipe de desenvolvimento.

---

Desenvolvido com ❤️ pela equipe Vitriny Web
