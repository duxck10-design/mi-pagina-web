export interface Brand {
  id: string;
  name: string;
  slug: string;
  country: string | null;
  description: string | null;
  tagline: string | null;
  color: string | null;
  is_active: boolean;
  sort_order: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand_id: string | null;
  model: string | null;
  size: string;
  width: number | null;
  profile: number | null;
  rim: number | null;
  load_index: string | null;
  speed_rating: string | null;
  terrain_type: string | null;
  vehicle_type: string | null;
  season: string | null;
  tread_pattern: string | null;
  image_url: string | null;
  gallery: string[] | null;
  benefits: string[] | null;
  description: string | null;
  price: number | null;
  currency: string;
  in_stock: boolean;
  stock_note: string | null;
  is_featured: boolean;
  sort_order: number;
  brand?: Brand | null;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  image_url: string | null;
  category: string | null;
  author: string | null;
  read_minutes: number;
  published_at: string;
  is_published: boolean;
}

export interface Testimonial {
  id: string;
  author_name: string;
  author_role: string | null;
  company: string | null;
  content: string;
  rating: number;
  image_url: string | null;
  is_published: boolean;
  sort_order: number;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string | null;
  description: string | null;
  image_url: string | null;
  sort_order: number;
}

export interface QuoteRequest {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  product_id: string | null;
  product_name: string | null;
  quantity: number;
  message: string | null;
  status: string;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  subject: string | null;
  message: string;
  status: string;
  created_at: string;
}
