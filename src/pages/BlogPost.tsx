import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { BlogPost } from '../lib/types';
import { formatDate } from '../lib/utils';

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [related, setRelated] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await supabase.from('blog_posts').select('*').eq('slug', slug).maybeSingle();
      setPost(data);
      if (data?.category) {
        const { data: rel } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('is_published', true)
          .eq('category', data.category)
          .neq('id', data.id)
          .order('published_at', { ascending: false })
          .limit(3);
        setRelated(rel ?? []);
      }
      setLoading(false);
    })();
  }, [slug]);

  if (loading) {
    return <div className="pt-28 pb-20 container-x"><div className="h-8 w-64 bg-asphalt-200 dark:bg-asphalt-800 rounded animate-pulse" /></div>;
  }

  if (!post) {
    return (
      <div className="pt-28 pb-20 container-x text-center">
        <h1 className="font-display text-3xl font-bold text-asphalt-900 dark:text-white">Artículo no encontrado</h1>
        <Link to="/blog" className="btn-primary mt-6">Volver al blog</Link>
      </div>
    );
  }

  return (
    <article className="pt-28 pb-20">
      <div className="container-x max-w-3xl">
        <Link to="/blog" className="btn-ghost !px-0 mb-6 text-sm">
          <ArrowLeft className="h-4 w-4" /> Volver al blog
        </Link>

        {post.category && <span className="badge bg-amber-400/20 text-amber-600 dark:text-amber-400">{post.category}</span>}
        <h1 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-asphalt-900 dark:text-white tracking-tightest">
          {post.title}
        </h1>
        <div className="mt-4 flex items-center gap-4 text-sm text-asphalt-500 dark:text-asphalt-400">
          <span>{formatDate(post.published_at)}</span>
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {post.read_minutes} min de lectura</span>
          {post.author && <span>· {post.author}</span>}
        </div>

        {post.image_url && (
          <div className="mt-8 overflow-hidden rounded-2xl aspect-[16/9]">
            <img src={post.image_url} alt={post.title} className="h-full w-full object-cover" />
          </div>
        )}

        <div className="mt-8 prose prose-lg max-w-none dark:prose-invert">
          <p className="text-lg text-asphalt-700 dark:text-asphalt-300 leading-relaxed font-medium">{post.excerpt}</p>
          <p className="mt-6 text-asphalt-700 dark:text-asphalt-300 leading-relaxed whitespace-pre-line">{post.content}</p>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="container-x max-w-5xl mt-20">
          <h2 className="font-display text-2xl font-bold text-asphalt-900 dark:text-white mb-6">Artículos relacionados</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {related.map((r) => (
              <Link key={r.id} to={`/blog/${r.slug}`} className="card group overflow-hidden hover:shadow-lg transition-all">
                <div className="aspect-[16/10] overflow-hidden bg-asphalt-100 dark:bg-asphalt-900">
                  {r.image_url && <img src={r.image_url} alt={r.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform" />}
                </div>
                <div className="p-4">
                  <h3 className="font-display font-semibold text-asphalt-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">{r.title}</h3>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
                    Leer <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
