import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Button({ children, to, variant = 'primary', className = '', ...props }) {
  const classes =
    variant === 'ghost'
      ? 'border border-white/70 bg-white/50 text-ink hover:bg-white'
      : variant === 'dark'
        ? 'bg-ink text-white hover:bg-black'
        : 'bg-gradient-to-r from-orchid to-pink-400 text-white shadow-glow hover:shadow-card';
  const Comp = to ? motion(Link) : motion.button;
  return (
    <Comp
      to={to}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition ${classes} ${className}`}
      {...props}
    >
      {children}
    </Comp>
  );
}
