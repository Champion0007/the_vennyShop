import { FiArrowUp } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useScrollTop } from '../hooks/useScrollTop.js';

export default function FloatingActions() {
  const visible = useScrollTop();
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
      <motion.a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" whileHover={{ scale: 1.08 }} className="grid h-14 w-14 place-items-center rounded-full bg-[#25d366] text-2xl text-white shadow-glow">
        <FaWhatsapp />
      </motion.a>
      {visible && (
        <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="grid h-12 w-12 place-items-center rounded-full bg-ink text-white shadow-card">
          <FiArrowUp />
        </motion.button>
      )}
    </div>
  );
}
