import { motion } from 'framer-motion';
import { fadeUp } from '../animations/motion.js';

export default function Section({ eyebrow, title, children, className = '', center = false }) {
  return (
    <section className={`relative px-4 py-16 sm:px-6 lg:px-8 ${className}`}>
      <motion.div
        variants={fadeUp}
        initial="show"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="mx-auto max-w-7xl"
      >
        {(eyebrow || title) && (
          <div className={`mb-9 ${center ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}`}>
            {eyebrow && <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.28em] text-orchid">{eyebrow}</p>}
            {title && <h2 className="font-display text-4xl font-black leading-tight text-ink md:text-5xl">{title}</h2>}
          </div>
        )}
        {children}
      </motion.div>
    </section>
  );
}
