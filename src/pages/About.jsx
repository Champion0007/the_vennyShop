import { motion } from 'framer-motion';
import Section from '../components/Section.jsx';
import Button from '../components/Button.jsx';
import { products } from '../data/products.js';

export default function About() {
  return (
    <div className="pt-28">
      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-sm font-extrabold uppercase tracking-[0.28em] text-orchid">About The Venny</p>
            <h1 className="font-display text-5xl font-black leading-tight md:text-7xl">We make gifting feel intimate, polished, and unforgettable.</h1>
            <p className="mt-6 text-lg leading-relaxed text-zinc-600">The Venny Customized Gifts is a design-led gifting studio for people who care about presentation as much as emotion. Each piece is personalized, reviewed, packed, and finished with a boutique unboxing standard.</p>
            <Button to="/products" className="mt-8">Shop the studio</Button>
          </div>
          <div className="relative">
            <img src={products[7].image} alt="Venny gift studio" className="h-[560px] w-full rounded-[2.2rem] object-cover shadow-card" />
            <motion.div animate={{ y: [0, -16, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="glass absolute -bottom-8 right-8 max-w-xs rounded-3xl p-6">
              <p className="text-4xl font-black gradient-text">32K+</p>
              <p className="font-bold text-zinc-600">custom gifts crafted with care</p>
            </motion.div>
          </div>
        </div>
      </Section>
      <Section className="bg-white" eyebrow="Process" title="From your idea to a premium unboxing">
        <div className="grid gap-5 md:grid-cols-4">
          {['Share the story', 'Approve artwork', 'Craft and pack', 'Deliver delight'].map((step, index) => (
            <div key={step} className="rounded-[2rem] bg-mist p-7 shadow-card">
              <p className="text-4xl font-black text-orchid">0{index + 1}</p>
              <h3 className="mt-8 text-2xl font-black">{step}</h3>
              <p className="mt-3 text-zinc-600">A focused studio workflow keeps every order detailed, beautiful, and on schedule.</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
