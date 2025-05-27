-- Esquema para o banco de dados Supabase

-- Tabela de produtos
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  image TEXT NOT NULL,
  original_price DECIMAL(10, 2) NOT NULL,
  discount_price DECIMAL(10, 2) NOT NULL,
  discount INTEGER NOT NULL,
  rating DECIMAL(3, 1) NOT NULL,
  category TEXT NOT NULL,
  affiliate_link TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de promoções diárias
CREATE TABLE daily_deals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  image TEXT NOT NULL,
  original_price DECIMAL(10, 2) NOT NULL,
  discount_price DECIMAL(10, 2) NOT NULL,
  discount INTEGER NOT NULL,
  affiliate_link TEXT NOT NULL,
  description TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE
);

-- Tabela de usuários favoritos
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Tabela de categorias
CREATE TABLE categories (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  icon TEXT NOT NULL
);

-- Função para atualizar o timestamp de updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para atualizar o timestamp de updated_at
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_daily_deals_updated_at
BEFORE UPDATE ON daily_deals
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- Políticas de segurança RLS (Row Level Security)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Políticas para produtos (todos podem ler, apenas admin pode modificar)
CREATE POLICY "Produtos visíveis para todos" ON products
  FOR SELECT USING (true);

-- Políticas para promoções diárias (todos podem ler, apenas admin pode modificar)
CREATE POLICY "Promoções visíveis para todos" ON daily_deals
  FOR SELECT USING (true);

-- Políticas para favoritos (usuários só podem ver e modificar seus próprios favoritos)
CREATE POLICY "Usuários gerenciam seus favoritos" ON favorites
  USING (auth.uid() = user_id);

-- Políticas para categorias (todos podem ler, apenas admin pode modificar)
CREATE POLICY "Categorias visíveis para todos" ON categories
  FOR SELECT USING (true);

-- Inserir categorias iniciais
INSERT INTO categories (id, label, icon) VALUES
  ('all', 'Todos', 'Star'),
  ('electronics', 'Eletrônicos', 'Smartphone'),
  ('home', 'Casa', 'Home'),
  ('beauty', 'Beleza', 'Heart'),
  ('kids', 'Infantil', 'Baby'),
  ('coupons', 'Cupons', 'Gift');