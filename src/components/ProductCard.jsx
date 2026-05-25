import { motion } from 'framer-motion';
import { FiHeart, FiShoppingBag, FiEye } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { money } from '../utils/format.js';
import { useCart } from '../hooks/useCart.jsx';

export default function ProductCard({ product, onPreview }) {
  const { addToCart } = useCart();
  return (
    <motion.article
      whileHover={{ y: -10, rotateX: 4, rotateY: -4 }}
      transition={{ type: 'spring', stiffness: 240, damping: 18 }}
      className="glow-border group rounded-[1.7rem]"
    >
      <div className="glass overflow-hidden rounded-[1.7rem] p-3">
        <Link to={`/products/${product.slug}`} className="relative block overflow-hidden rounded-[1.25rem]">
          <img src={product.image} alt={product.name} loading="lazy" className="h-72 w-full object-cover transition duration-700 group-hover:scale-110" />
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-extrabold uppercase text-orchid shadow">
            {product.badge}
          </span>
        </Link>
        <div className="p-4">
          <div className="mb-2 flex items-center justify-between text-xs font-bold text-zinc-500">
            <span>{product.category}</span>
            <span>{product.rating} stars</span>
          </div>
          <Link to={`/products/${product.slug}`} className="line-clamp-2 text-lg font-black text-ink hover:text-orchid">
            {product.name}
          </Link>
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xl font-black text-ink">{money(product.price)}</span>
            <span className="text-sm font-semibold text-zinc-400 line-through">{money(product.compareAt)}</span>
          </div>
          <div className="mt-5 flex gap-2">
            <button onClick={() => addToCart(product)} className="flex flex-1 items-center justify-center gap-2 rounded-full bg-ink px-4 py-3 text-sm font-bold text-white transition hover:bg-orchid">
              <FiShoppingBag /> Add
            </button>
            <button onClick={() => onPreview?.(product)} className="grid h-12 w-12 place-items-center rounded-full bg-white text-ink shadow transition hover:text-orchid" aria-label="Quick preview">
              <FiEye />
            </button>
            <button className="grid h-12 w-12 place-items-center rounded-full bg-white text-ink shadow transition hover:text-pink-500" aria-label="Wishlist">
              <FiHeart />
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
