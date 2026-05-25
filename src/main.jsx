import React, { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import AppRoutes from './routes/AppRoutes.jsx';
import { CartProvider } from './hooks/useCart.jsx';
import Loader from './components/Loader.jsx';
import './styles/index.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

function App() {
  const location = useLocation();
  return (
    <CartProvider>
      <Suspense fallback={<Loader />}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            <AppRoutes />
          </motion.div>
        </AnimatePresence>
      </Suspense>
    </CartProvider>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
