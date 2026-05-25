import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMenu, FiX, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../hooks/useCart.jsx';

const links = [
  ['Home', '/'],
  ['Shop', '/products'],
  ['About', '/about'],
  ['Contact', '/contact'],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count } = useCart();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header initial={{ y: -80 }} animate={{ y: 0 }} className="fixed inset-x-0 top-0 z-50 px-4 py-4">
      <nav className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-5 py-3 transition ${scrolled ? 'glass shadow-card' : 'bg-white/25 backdrop-blur-md'}`}>
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-orchid to-pink-400 font-display text-xl font-black text-white shadow-glow">V</span>
          <span className="max-w-[12rem] text-sm font-black leading-tight text-ink sm:max-w-none">The Venny Customized Gifts</span>
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          {links.map(([label, to]) => (
            <NavLink key={to} to={to} className={({ isActive }) => `rounded-full px-4 py-2 text-sm font-bold transition ${isActive ? 'bg-ink text-white' : 'text-ink hover:bg-white/80'}`}>
              {label}
            </NavLink>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Link to="/cart" className="relative grid h-11 w-11 place-items-center rounded-full bg-white text-ink shadow">
            <FiShoppingBag />
            {count > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-pink-500 px-1 text-[10px] font-black text-white">{count}</span>}
          </Link>
          <button onClick={() => setOpen(!open)} className="grid h-11 w-11 place-items-center rounded-full bg-ink text-white md:hidden" aria-label="Toggle menu">
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>
      {open && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass mx-auto mt-3 grid max-w-7xl gap-2 rounded-3xl p-4 md:hidden">
          {links.map(([label, to]) => (
            <NavLink key={to} onClick={() => setOpen(false)} to={to} className="rounded-2xl px-4 py-3 font-bold text-ink hover:bg-white">
              {label}
            </NavLink>
          ))}
        </motion.div>
      )}
    </motion.header>
  );
}
