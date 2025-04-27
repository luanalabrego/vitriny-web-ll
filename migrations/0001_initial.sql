-- Inicialização do banco de dados para o Vitriny Web

-- Tabela de empresas
CREATE TABLE IF NOT EXISTS empresas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  senha TEXT NOT NULL,
  empresa_id INTEGER NOT NULL,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (empresa_id) REFERENCES empresas(id)
);

-- Tabela de produtos
CREATE TABLE IF NOT EXISTS produtos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ean TEXT NOT NULL,
  descricao TEXT NOT NULL,
  marca TEXT NOT NULL,
  cor TEXT NOT NULL,
  tamanho TEXT NOT NULL,
  empresa_id INTEGER NOT NULL,
  usuario_id INTEGER NOT NULL,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (empresa_id) REFERENCES empresas(id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  UNIQUE(ean, empresa_id)
);

-- Tabela de imagens
CREATE TABLE IF NOT EXISTS imagens (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  produto_id INTEGER NOT NULL,
  tipo_geracao TEXT NOT NULL, -- 'frente' ou 'costas'
  caminho_original TEXT NOT NULL,
  caminho_processado TEXT,
  status TEXT DEFAULT 'pendente', -- 'pendente', 'processando', 'concluido', 'erro'
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (produto_id) REFERENCES produtos(id)
);

-- Inserir empresa padrão para testes
INSERT INTO empresas (nome) VALUES ('Empresa Demonstração');

-- Inserir usuário administrador padrão para testes
INSERT INTO usuarios (nome, email, senha, empresa_id) 
VALUES ('Admin', 'admin@vitriny.com', '$2a$10$JGLPVTAFUMQHHQUQm0QXpOvhvGiD.jS3hQRrIaQMaRLhFzS/X0oMu', 1);
-- Senha: admin123 (hash bcrypt)
