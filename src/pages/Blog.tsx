import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { BlogPost } from '../lib/types';
import { Reveal } from '../components/Reveal';
import { formatDate } from '../lib/utils';

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      let query = supabase.from('blog_posts').select('*').eq('is_published', true).order('published_at', { ascending: false });
      if (category) query = query.eq('category', category);
      const { data } = await query;
      setPosts(data ?? []);
      setLoading(false);
    })();
  }, [category]);

  const categories = ['Guías', 'Seguridad', 'Educación', 'Tecnología', 'Mantenimiento'];
  const [featured, ...rest] = posts;

  return (
    <div className="pt-28 pb-20">
      <section className="container-x mb-12">
        <Reveal>
          <span className="section-eyebrow">Blog</span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 text-asphalt-900 dark:text-white tracking-tightest">
            Noticias y consejos
          </h1>
          <p className="mt-4 text-lg text-asphalt-600 dark:text-asphalt-400 max-w-2xl">
            Guías, consejos de seguridad y las últimas novedades del mundo neumático.
          </p>
        </Reveal>
      </section>

      {/* Category filters */}
      <div className="container-x mb-10">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCategory('')}
            className={`badge !px-4 !py-2 transition-colors ${!category ? 'bg-asphalt-900 text-white dark:bg-white dark:text-asphalt-900' : 'bg-asphalt-100 text-asphalt-600 dark:bg-asphalt-800 dark:text-asphalt-300 hover:bg-asphalt-200 dark:hover:bg-asphalt-700'}`}
          >
            Todos
          </button>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(category === c ? '' : c)}
              className={`badge !px-4 !py-2 transition-colors ${category === c ? 'bg-asphalt-900 text-white dark:bg-white dark:text-asphalt-900' : 'bg-asphalt-100 text-asphalt-600 dark:bg-asphalt-800 dark:text-asphalt-300 hover:bg-asphalt-200 dark:hover:bg-asphalt-700'}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="card overflow-hidden">
              <div className="aspect-[16/10] bg-asphalt-100 dark:bg-asphalt-900 animate-pulse" />
              <div className="p-5 space-y-3">
                <div className="h-3 w-16 bg-asphalt-200 dark:bg-asphalt-800 rounded animate-pulse" />
                <div className="h-5 w-3/4 bg-asphalt-200 dark:bg-asphalt-800 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="container-x space-y-10">
          {/* Featured post */}
          {featured && !category && (
            <Reveal>
              <Link to={`/blog/${featured.slug}`} className="card group grid lg:grid-cols-2 overflow-hidden hover:shadow-xl transition-all">
                <div className="aspect-[16/10] lg:aspect-auto overflow-hidden bg-asphalt-100 dark:bg-asphalt-900">
                  {featured.image_url && <img src={featured.image_url} alt={featured.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />}
                </div>
                <div className="p-8 sm:p-10 flex flex-col justify-center">
                  {featured.category && <span className="badge bg-amber-400/20 text-amber-600 dark:text-amber-400 w-fit">{featured.category}</span>}
                  <h2 className="mt-4 font-display text-2xl sm:text-3xl font-bold text-asphalt-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {featured.title}
                  </h2>
                  <p className="mt-3 text-asphalt-600 dark:text-asphalt-400 leading-relaxed">{featured.excerpt}</p>
                  <div className="mt-6 flex items-center gap-4 text-sm text-asphalt-400">
                    <span>{formatDate(featured.published_at)}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {featured.read_minutes} min</span>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600 dark:text-amber-400">
                    Leer artículo <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </Reveal>
          )}

          {/* Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(category ? posts : rest).map((post, i) => (
              <Reveal key={post.id} delay={i * 80}>
                <Link to={`/blog/${post.slug}`} className="card group overflow-hidden h-full hover:shadow-lg hover:border-amber-400/40 transition-all">
                  <div className="aspect-[16/10] overflow-hidden bg-asphalt-100 dark:bg-asphalt-900">
                    {post.image_url && <img src={post.image_url} alt={post.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />}
                  </div>
                  <div className="p-5">
                    {post.category && <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">{post.category}</span>}
                    <h3 className="mt-2 font-display text-lg font-semibold text-asphalt-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm text-asphalt-500 dark:text-asphalt-400 line-clamp-2">{post.excerpt}</p>
                    <div className="mt-4 flex items-center gap-3 text-xs text-asphalt-400">
                      <span>{formatDate(post.published_at)}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.read_minutes} min</span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
