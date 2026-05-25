import { motion } from 'framer-motion';

export default function Loader() {
  return (
    <div className="grid min-h-screen place-items-center bg-mist">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.1, ease: 'linear' }}
        className="h-16 w-16 rounded-full border-4 border-lavender border-t-transparent"
      />
    </div>
  );
}
