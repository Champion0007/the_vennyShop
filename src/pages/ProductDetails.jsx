import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiMinus, FiPlus, FiShoppingBag, FiUploadCloud, FiZap } from 'react-icons/fi';
import Button from '../components/Button.jsx';
import { products } from '../data/products.js';
import { useCart } from '../hooks/useCart.jsx';
import { money } from '../utils/format.js';

export default function ProductDetails() {
  const { slug } = useParams();
  const product = products.find((item) => item.slug === slug) || products[0];
  const [activeImage, setActiveImage] = useState(product.gallery[0]);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState('Details');
  const { addToCart } = useCart();
  const related = useMemo(() => products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4), [product]);

  useEffect(() => {
    setActiveImage(product.gallery[0]);
    setQty(1);
    setTab('Details');
  }, [product]);

  return (
    <div className="min-h-screen px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl text-sm font-bold text-zinc-500">
        <Link to="/products" className="text-orchid hover:text-ink">Products</Link>
        <span className="px-2">/</span>
        <span>{product.name}</span>
      </div>

      <section className="mx-auto mt-6 grid max-w-7xl gap-10 lg:grid-cols-2">
        <div>
          <div className="group overflow-hidden rounded-[2.2rem] shadow-card">
            <img src={activeImage} alt={product.name} className="h-[560px] w-full object-cover transition duration-700 group-hover:scale-110" />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {product.gallery.map((image) => (
              <button key={image} onClick={() => setActiveImage(image)} className={`overflow-hidden rounded-3xl border-2 ${activeImage === image ? 'border-orchid' : 'border-transparent'}`}>
                <img src={image} alt={product.name} className="h-28 w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="glass rounded-[2.2rem] p-6 md:p-8">
          <p className="text-sm font-extrabold uppercase tracking-[0.25em] text-orchid">{product.category}</p>
          <h1 className="mt-3 font-display text-5xl font-black leading-tight text-ink md:text-6xl">{product.name}</h1>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-pink-100 px-4 py-2 text-sm font-black text-pink-600">{product.rating} stars - {product.reviews} reviews</span>
            <span className="rounded-full bg-lavender/20 px-4 py-2 text-sm font-black uppercase text-orchid">{product.badge}</span>
          </div>
          <p className="mt-6 text-lg leading-relaxed text-zinc-600">{product.description}</p>
          <div className="mt-6 flex items-end gap-3">
            <span className="text-4xl font-black">{money(product.price)}</span>
            <span className="text-xl font-bold text-zinc-400 line-through">{money(product.compareAt)}</span>
          </div>

          <div className="mt-7 rounded-[2rem] bg-white p-5 shadow-card">
            <p className="mb-3 font-black">Customization upload</p>
            <label className="flex cursor-pointer items-center gap-4 rounded-3xl border-2 border-dashed border-lavender/70 bg-mist p-5">
              <FiUploadCloud className="text-3xl text-orchid" />
              <span><strong>Upload photo or logo</strong><br /><span className="text-sm text-zinc-500">JPG, PNG, PDF artwork accepted</span></span>
              <input type="file" className="hidden" />
            </label>
            <textarea className="mt-4 min-h-24 w-full rounded-3xl bg-mist p-4 outline-none" placeholder="Names, dates, message, color preferences..." />
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-full bg-white p-2 shadow-card">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="grid h-10 w-10 place-items-center rounded-full bg-mist"><FiMinus /></button>
              <span className="w-12 text-center font-black">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="grid h-10 w-10 place-items-center rounded-full bg-mist"><FiPlus /></button>
            </div>
            <Button onClick={() => addToCart(product, qty)}><FiShoppingBag /> Add to cart</Button>
            <Button onClick={() => addToCart(product, qty)} to="/cart" variant="dark"><FiZap /> Buy now</Button>
          </div>

          <div className="mt-8 grid gap-3 rounded-[2rem] bg-mist p-5 text-sm font-bold text-zinc-600 sm:grid-cols-3">
            <span>Free shipping over Rs. 2,500</span>
            <span>Artwork preview included</span>
            <span>Secure checkout</span>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-7xl rounded-[2rem] bg-white p-4 shadow-card">
        <div className="flex flex-wrap gap-2">
          {['Details', 'Delivery', 'Reviews'].map((item) => (
            <button onClick={() => setTab(item)} key={item} className={`rounded-full px-5 py-3 font-black ${tab === item ? 'bg-ink text-white' : 'bg-mist'}`}>{item}</button>
          ))}
        </div>
        <div className="p-5 text-zinc-600">
          {tab === 'Details' && <ul className="grid gap-2 sm:grid-cols-2">{product.details.map((detail) => <li key={detail}>- {detail}</li>)}</ul>}
          {tab === 'Delivery' && <p>Made to order in 3-5 business days, packed in premium Venny gift boxes, with express delivery options for urgent celebrations.</p>}
          {tab === 'Reviews' && <p>Customers love the crisp personalization, thoughtful packaging, and responsive artwork approval process.</p>}
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-7xl">
        <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.28em] text-orchid">Related gifts</p>
        <h2 className="font-display text-4xl font-black text-ink md:text-5xl">More from this collection</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((item) => (
            <Link key={item.id} to={`/products/${item.slug}`} className="glass overflow-hidden rounded-[1.7rem] p-3 transition hover:-translate-y-2">
              <img src={item.image} alt={item.name} className="h-56 w-full rounded-[1.25rem] object-cover" />
              <div className="p-4">
                <p className="text-xs font-black text-orchid">{item.category}</p>
                <h3 className="mt-2 text-lg font-black text-ink">{item.name}</h3>
                <p className="mt-2 font-black">{money(item.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
