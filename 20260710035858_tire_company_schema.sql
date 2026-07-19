/*
# Vulcano Neumáticos — Schema inicial

Crea el modelo de datos completo para un sitio de importación, distribución y
venta de llantas: catálogo de productos, marcas, blog, testimonios,
certificaciones, solicitudes de cotización y mensajes de contacto.

1. Tablas nuevas
- `brands`: marcas distribuidas (Michelin, Bridgestone, etc.).
- `products`: llantas del catálogo con especificaciones técnicas completas.
- `blog_posts`: artículos del blog de noticias y consejos.
- `testimonials`: testimonios de clientes.
- `certifications`: certificaciones y normas de calidad.
- `quote_requests`: solicitudes de cotización enviadas desde el sitio.
- `contact_messages`: mensajes del formulario de contacto.

2. Seguridad (RLS)
- `brands`, `products`, `blog_posts`, `testimonials`, `certifications`:
  lectura pública (anon + authenticated) y CRUD completo para authenticated
  (panel administrativo).
- `quote_requests`, `contact_messages`: inserción pública (anon envía desde el
  sitio), lectura/actualización solo para authenticated (gestión admin).

3. Notas
- La app tiene un panel administrativo con inicio de sesión, por lo que las
  políticas de escritura admin se limitan a `authenticated`.
- Los envíos de cotización/contacto pueden ser creados por visitantes anónimos.
*/

CREATE TABLE IF NOT EXISTS brands (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  country text,
  description text,
  tagline text,
  color text,
  is_active boolean NOT NULL DEFAULT true,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  brand_id uuid REFERENCES brands(id) ON DELETE SET NULL,
  model text,
  size text NOT NULL,
  width int,
  profile int,
  rim int,
  load_index text,
  speed_rating text,
  terrain_type text,
  vehicle_type text,
  season text,
  tread_pattern text,
  image_url text,
  gallery text[] DEFAULT '{}',
  specs jsonb DEFAULT '{}'::jsonb,
  benefits text[] DEFAULT '{}',
  description text,
  price numeric(12,2),
  currency text DEFAULT 'USD',
  in_stock boolean NOT NULL DEFAULT true,
  stock_note text,
  is_featured boolean NOT NULL DEFAULT false,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text,
  content text,
  image_url text,
  category text,
  author text,
  read_minutes int DEFAULT 5,
  published_at timestamptz DEFAULT now(),
  is_published boolean NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name text NOT NULL,
  author_role text,
  company text,
  content text NOT NULL,
  rating int NOT NULL DEFAULT 5,
  image_url text,
  is_published boolean NOT NULL DEFAULT true,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS certifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  issuer text,
  description text,
  image_url text,
  sort_order int NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS quote_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  phone text,
  product_id uuid REFERENCES products(id) ON DELETE SET NULL,
  product_name text,
  quantity int DEFAULT 1,
  message text,
  status text NOT NULL DEFAULT 'nueva',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  phone text,
  subject text,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'nuevo',
  created_at timestamptz DEFAULT now()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand_id);
CREATE INDEX IF NOT EXISTS idx_products_vehicle ON products(vehicle_type);
CREATE INDEX IF NOT EXISTS idx_products_terrain ON products(terrain_type);
CREATE INDEX IF NOT EXISTS idx_products_season ON products(season);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_rim ON products(rim);
CREATE INDEX IF NOT EXISTS idx_blog_published ON blog_posts(is_published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_quote_status ON quote_requests(status);

-- RLS
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- brands: lectura pública, CRUD admin
DROP POLICY IF EXISTS "anon_read_brands" ON brands;
CREATE POLICY "anon_read_brands" ON brands FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "auth_insert_brands" ON brands;
CREATE POLICY "auth_insert_brands" ON brands FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_brands" ON brands;
CREATE POLICY "auth_update_brands" ON brands FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_brands" ON brands;
CREATE POLICY "auth_delete_brands" ON brands FOR DELETE TO authenticated USING (true);

-- products: lectura pública, CRUD admin
DROP POLICY IF EXISTS "anon_read_products" ON products;
CREATE POLICY "anon_read_products" ON products FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "auth_insert_products" ON products;
CREATE POLICY "auth_insert_products" ON products FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_products" ON products;
CREATE POLICY "auth_update_products" ON products FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_products" ON products;
CREATE POLICY "auth_delete_products" ON products FOR DELETE TO authenticated USING (true);

-- blog_posts: lectura pública, CRUD admin
DROP POLICY IF EXISTS "anon_read_blog" ON blog_posts;
CREATE POLICY "anon_read_blog" ON blog_posts FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "auth_insert_blog" ON blog_posts;
CREATE POLICY "auth_insert_blog" ON blog_posts FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_blog" ON blog_posts;
CREATE POLICY "auth_update_blog" ON blog_posts FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_blog" ON blog_posts;
CREATE POLICY "auth_delete_blog" ON blog_posts FOR DELETE TO authenticated USING (true);

-- testimonials: lectura pública, CRUD admin
DROP POLICY IF EXISTS "anon_read_testimonials" ON testimonials;
CREATE POLICY "anon_read_testimonials" ON testimonials FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "auth_insert_testimonials" ON testimonials;
CREATE POLICY "auth_insert_testimonials" ON testimonials FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_testimonials" ON testimonials;
CREATE POLICY "auth_update_testimonials" ON testimonials FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_testimonials" ON testimonials;
CREATE POLICY "auth_delete_testimonials" ON testimonials FOR DELETE TO authenticated USING (true);

-- certifications: lectura pública, CRUD admin
DROP POLICY IF EXISTS "anon_read_certifications" ON certifications;
CREATE POLICY "anon_read_certifications" ON certifications FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "auth_insert_certifications" ON certifications;
CREATE POLICY "auth_insert_certifications" ON certifications FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_certifications" ON certifications;
CREATE POLICY "auth_update_certifications" ON certifications FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_certifications" ON certifications;
CREATE POLICY "auth_delete_certifications" ON certifications FOR DELETE TO authenticated USING (true);

-- quote_requests: inserción pública, gestión admin
DROP POLICY IF EXISTS "anon_insert_quotes" ON quote_requests;
CREATE POLICY "anon_insert_quotes" ON quote_requests FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_read_quotes" ON quote_requests;
CREATE POLICY "auth_read_quotes" ON quote_requests FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "auth_update_quotes" ON quote_requests;
CREATE POLICY "auth_update_quotes" ON quote_requests FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_quotes" ON quote_requests;
CREATE POLICY "auth_delete_quotes" ON quote_requests FOR DELETE TO authenticated USING (true);

-- contact_messages: inserción pública, gestión admin
DROP POLICY IF EXISTS "anon_insert_messages" ON contact_messages;
CREATE POLICY "anon_insert_messages" ON contact_messages FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_read_messages" ON contact_messages;
CREATE POLICY "auth_read_messages" ON contact_messages FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "auth_update_messages" ON contact_messages;
CREATE POLICY "auth_update_messages" ON contact_messages FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_messages" ON contact_messages;
CREATE POLICY "auth_delete_messages" ON contact_messages FOR DELETE TO authenticated USING (true);
