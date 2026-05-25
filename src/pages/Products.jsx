import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FiFilter, FiHeart, FiSearch, FiShoppingBag, FiSliders, FiX } from 'react-icons/fi';
import { categories, products } from '../data/products.js';
import { useCart } from '../hooks/useCart.jsx';
import { money } from '../utils/format.js';

export default function Products() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [price, setPrice] = useState(7000);
  const [sort, setSort] = useState('popular');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [preview, setPreview] = useState(null);
  const { addToCart } = useCart();

  const filtered = useMemo(() => {
    return [...products]
      .filter((product) => category === 'All' || product.category === category)
      .filter((product) => product.price <= price)
      .filter((product) => {
        const text = `${product.name} ${product.category}`.toLowerCase();
        return text.includes(query.toLowerCase());
      })
      .sort((a, b) => {
        if (sort === 'latest') return b.createdAt - a.createdAt;
        if (sort === 'low') return a.price - b.price;
        if (sort === 'high') return b.price - a.price;
        return b.popularity - a.popularity;
      });
  }, [category, price, query, sort]);

  return (
    <div className="min-h-screen px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <div className="blob left-6 top-32 h-72 w-72 bg-pink-300" />
      <div className="blob right-12 top-52 h-80 w-80 bg-lavender" />

      <section className="glass relative z-10 mx-auto max-w-7xl overflow-hidden rounded-[2.2rem] p-6 md:p-10">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_420px]">
          <div>
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.28em] text-orchid">Shop customized gifts</p>
            <h1 className="font-display text-5xl font-black leading-tight text-ink md:text-7xl">Premium gifts ready to personalize.</h1>
            <p className="mt-5 max-w-2xl text-lg text-zinc-600">
              Browse handcrafted photo lamps, luxury hampers, name frames, jewellery, corporate kits, and celebration gifts from The Venny studio.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              {categories.slice(0, 4).map((item) => (
                <button key={item} onClick={() => setCategory(item)} className="rounded-full bg-white px-5 py-3 text-sm font-black text-ink shadow hover:text-orchid">
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {products.slice(0, 4).map((product) => (
              <img key={product.id} src={product.image} alt={product.name} className="h-36 w-full rounded-3xl object-cover shadow-card md:h-44" />
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto mt-10 max-w-7xl">
        <div className="mb-6 flex flex-col gap-3 md:flex-row">
          <div className="glass flex flex-1 items-center gap-3 rounded-full px-5 py-3">
            <FiSearch className="text-zinc-500" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search lamps, hampers, jewellery..."
              className="w-full bg-transparent outline-none"
            />
          </div>
          <button onClick={() => setFiltersOpen(!filtersOpen)} className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 font-bold text-white lg:hidden">
            <FiFilter /> Filters
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
          <aside className={`${filtersOpen ? 'block' : 'hidden'} glass h-max rounded-[2rem] p-6 lg:block`}>
            <p className="mb-5 flex items-center gap-2 text-xl font-black"><FiSliders /> Refine gifts</p>
            <div className="space-y-7">
              <div>
                <label className="mb-3 block text-sm font-black">Categories</label>
                <div className="grid gap-2">
                  {['All', ...categories].map((item) => (
                    <button key={item} onClick={() => setCategory(item)} className={`rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${category === item ? 'bg-ink text-white' : 'bg-white/70 hover:bg-white'}`}>
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="mb-3 flex items-center justify-between text-sm font-black">Price up to <span>{money(price)}</span></label>
                <input value={price} onChange={(event) => setPrice(Number(event.target.value))} type="range" min="800" max="7000" step="100" className="w-full accent-orchid" />
              </div>
              <div>
                <label className="mb-3 block text-sm font-black">Sort by</label>
                <select value={sort} onChange={(event) => setSort(event.target.value)} className="w-full rounded-2xl border-0 bg-white px-4 py-3 font-bold outline-none">
                  <option value="popular">Popular</option>
                  <option value="latest">Latest</option>
                  <option value="low">Price: low to high</option>
                  <option value="high">Price: high to low</option>
                </select>
              </div>
            </div>
          </aside>

          <div>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <p className="font-bold text-zinc-600">{filtered.length} curated products</p>
              <button onClick={() => { setQuery(''); setCategory('All'); setPrice(7000); setSort('popular'); }} className="rounded-full bg-white px-4 py-2 text-sm font-black text-orchid shadow">
                Reset filters
              </button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((product) => (
                <article key={product.id} className="glow-border group rounded-[1.7rem]">
                  <div className="glass overflow-hidden rounded-[1.7rem] p-3 transition duration-300 hover:-translate-y-2">
                    <Link to={`/products/${product.slug}`} className="relative block overflow-hidden rounded-[1.25rem]">
                      <img src={product.image} alt={product.name} className="h-72 w-full object-cover transition duration-700 group-hover:scale-110" />
                      <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-extrabold uppercase text-orchid shadow">{product.badge}</span>
                    </Link>
                    <div className="p-4">
                      <div className="mb-2 flex items-center justify-between text-xs font-bold text-zinc-500">
                        <span>{product.category}</span>
                        <span>{product.rating} stars</span>
                      </div>
                      <Link to={`/products/${product.slug}`} className="line-clamp-2 text-lg font-black text-ink hover:text-orchid">{product.name}</Link>
                      <p className="mt-3 text-sm text-zinc-600">{product.description}</p>
                      <div className="mt-3 flex items-center gap-2">
                        <span className="text-xl font-black text-ink">{money(product.price)}</span>
                        <span className="text-sm font-semibold text-zinc-400 line-through">{money(product.compareAt)}</span>
                      </div>
                      <div className="mt-5 flex gap-2">
                        <button onClick={() => addToCart(product)} className="flex flex-1 items-center justify-center gap-2 rounded-full bg-ink px-4 py-3 text-sm font-bold text-white transition hover:bg-orchid">
                          <FiShoppingBag /> Add
                        </button>
                        <button onClick={() => setPreview(product)} className="rounded-full bg-white px-4 py-3 text-sm font-black text-ink shadow">Preview</button>
                        <button className="grid h-12 w-12 place-items-center rounded-full bg-white text-ink shadow hover:text-pink-500" aria-label="Wishlist">
                          <FiHeart />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="glass rounded-[2rem] p-10 text-center">
                <h2 className="text-2xl font-black">No gifts match these filters.</h2>
                <p className="mt-2 text-zinc-600">Try a wider price range or clear the category selection.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {preview && (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-ink/50 p-4 backdrop-blur-sm">
          <div className="glass relative grid max-w-4xl overflow-hidden rounded-[2rem] md:grid-cols-2">
            <button onClick={() => setPreview(null)} className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white shadow" aria-label="Close">
              <FiX />
            </button>
            <img src={preview.image} alt={preview.name} className="h-full min-h-80 w-full object-cover" />
            <div className="p-8">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-orchid">{preview.category}</p>
              <h3 className="mt-3 font-display text-4xl font-black">{preview.name}</h3>
              <p className="mt-4 text-zinc-600">{preview.description}</p>
              <p className="mt-5 text-3xl font-black">{money(preview.price)}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button onClick={() => addToCart(preview)} className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-bold text-white">
                  <FiShoppingBag /> Add to cart
                </button>
                <Link to={`/products/${preview.slug}`} className="rounded-full bg-white px-6 py-3 font-bold text-ink shadow">
                  View details
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
