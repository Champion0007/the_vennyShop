import { AnimatePresence, motion } from 'framer-motion';
import { FiX, FiShoppingBag } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { money } from '../utils/format.js';
import { useCart } from '../hooks/useCart.jsx';

export default function ProductPreviewModal({ product, onClose }) {
  const { addToCart } = useCart();
  return (
    <AnimatePresence>
      {product && (
        <motion.div className="fixed inset-0 z-[80] grid place-items-center bg-ink/50 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div initial={{ scale: 0.92, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 30 }} className="glass relative grid max-w-4xl overflow-hidden rounded-[2rem] md:grid-cols-2">
            <button onClick={onClose} className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white shadow" aria-label="Close">
              <FiX />
            </button>
            <img src={product.image} alt={product.name} className="h-full min-h-80 w-full object-cover" />
            <div className="p-8">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-orchid">{product.category}</p>
              <h3 className="mt-3 font-display text-4xl font-black">{product.name}</h3>
              <p className="mt-4 text-zinc-600">{product.description}</p>
              <p className="mt-5 text-3xl font-black">{money(product.price)}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button onClick={() => addToCart(product)} className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-bold text-white">
                  <FiShoppingBag /> Add to cart
                </button>
                <Link to={`/products/${product.slug}`} onClick={onClose} className="rounded-full bg-white px-6 py-3 font-bold text-ink shadow">
                  View details
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
