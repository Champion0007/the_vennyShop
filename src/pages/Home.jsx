import { useState } from 'react';
import { motion } from 'framer-motion';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FiArrowRight, FiGift, FiShield, FiTruck, FiUploadCloud } from 'react-icons/fi';
import Section from '../components/Section.jsx';
import Button from '../components/Button.jsx';
import ProductCard from '../components/ProductCard.jsx';
import ProductPreviewModal from '../components/ProductPreviewModal.jsx';
import { categories, faqs, products, testimonials } from '../data/products.js';
import { fadeUp, stagger } from '../animations/motion.js';

const heroSlides = [
  ['Personalized gifts with boutique-level drama', 'Turn names, photos, memories, and tiny inside jokes into cinematic keepsakes.', products[0].image],
  ['Curated hampers for people who notice details', 'Velvet finishes, custom notes, premium treats, and packaging that feels collectible.', products[1].image],
  ['Corporate gifting that feels personal', 'Elegant branded kits and client gifts designed to be remembered after the unboxing.', products[10].image],
];

export default function Home() {
  const [preview, setPreview] = useState(null);
  const featured = products.slice(0, 8);

  return (
    <div className="overflow-hidden pt-20">
      <section className="relative min-h-[calc(100vh-5rem)] px-4 pb-12 pt-6 sm:px-6 lg:px-8">
        <div className="blob left-10 top-24 h-72 w-72 bg-pink-300" />
        <div className="blob right-0 top-44 h-80 w-80 bg-lavender" />
        <Swiper modules={[Autoplay, EffectFade, Pagination]} effect="fade" loop autoplay={{ delay: 4300 }} pagination className="mx-auto h-[76vh] min-h-[590px] max-w-7xl rounded-[2.5rem] shadow-glow">
          {heroSlides.map(([title, text, image]) => (
            <SwiperSlide key={title}>
              <div className="relative h-full overflow-hidden rounded-[2.5rem]">
                <img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/68 to-transparent" />
                <div className="relative z-10 flex h-full max-w-3xl flex-col justify-center px-6 sm:px-12 lg:px-16">
                  <motion.p variants={fadeUp} initial="hidden" animate="show" className="mb-5 text-xs font-extrabold uppercase tracking-[0.3em] text-orchid">The Venny Customized Gifts</motion.p>
                  <motion.h1 variants={fadeUp} initial="hidden" animate="show" className="font-display text-5xl font-black leading-[1.02] text-ink sm:text-7xl lg:text-8xl">{title}</motion.h1>
                  <motion.p variants={fadeUp} initial="hidden" animate="show" className="mt-6 max-w-xl text-lg font-medium text-zinc-700">{text}</motion.p>
                  <motion.div variants={fadeUp} initial="hidden" animate="show" className="mt-8 flex flex-wrap gap-3">
                    <Button to="/products">Shop gifts <FiArrowRight /></Button>
                    <Button to="/contact" variant="ghost">Start custom order</Button>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <Section eyebrow="Trending now" title="Gifts that make the room pause">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} onPreview={setPreview} />)}
        </motion.div>
      </Section>

      <Section className="bg-white/55" eyebrow="Personalized studio" title="Designed around their name, story, date, and favorite photo">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              [FiUploadCloud, 'Upload photos, notes, names, dates, and brand files.'],
              [FiGift, 'Preview artwork before our artists craft the final gift.'],
              [FiShield, 'Premium packaging keeps every order gift-ready.'],
              [FiTruck, 'Express shipping options for last-minute celebrations.'],
            ].map(([Icon, text]) => (
              <motion.div whileHover={{ y: -6 }} key={text} className="glass rounded-3xl p-6">
                <Icon className="mb-5 text-3xl text-orchid" />
                <p className="text-lg font-bold leading-snug">{text}</p>
              </motion.div>
            ))}
          </div>
          <div className="relative">
            <img src={products[2].image} alt="Personalized gift display" className="h-[520px] w-full rounded-[2rem] object-cover shadow-card" />
            <motion.div animate={{ y: [0, -14, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="glass absolute -bottom-7 left-8 max-w-xs rounded-3xl p-5">
              <p className="text-sm font-bold text-zinc-500">Live customization</p>
              <p className="mt-1 text-2xl font-black">Names, photos, messages, colors.</p>
            </motion.div>
          </div>
        </div>
      </Section>

      <Section eyebrow="Categories" title="Every celebration has a signature look" center>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <motion.a href={`/products?category=${encodeURIComponent(category)}`} whileHover={{ y: -8, scale: 1.01 }} key={category} className="glass group relative min-h-56 overflow-hidden rounded-[2rem] p-7">
              <img src={products[index].image} alt={category} className="absolute inset-0 h-full w-full object-cover opacity-45 transition duration-700 group-hover:scale-110 group-hover:opacity-60" />
              <div className="relative z-10">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-orchid">Collection</p>
                <h3 className="mt-16 font-display text-4xl font-black">{category}</h3>
              </div>
            </motion.a>
          ))}
        </div>
      </Section>

      <Section className="bg-venny-radial" eyebrow="Best sellers" title="Loved, reviewed, reordered">
        <Swiper modules={[Navigation, Pagination, Autoplay]} navigation pagination autoplay={{ delay: 2800 }} spaceBetween={24} breakpoints={{ 0: { slidesPerView: 1.05 }, 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 }, 1280: { slidesPerView: 4 } }}>
          {products.map((product) => <SwiperSlide key={product.id} className="pb-14"><ProductCard product={product} onPreview={setPreview} /></SwiperSlide>)}
        </Swiper>
      </Section>

      <Section eyebrow="Proof" title="A premium little operation with big feeling" center>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['32K+', 'gifts delivered'],
            ['4.9/5', 'average rating'],
            ['240+', 'corporate clients'],
            ['18', 'craft categories'],
          ].map(([value, label]) => <div key={label} className="glass rounded-3xl p-8 text-center"><p className="gradient-text text-5xl font-black">{value}</p><p className="mt-2 font-bold text-zinc-600">{label}</p></div>)}
        </div>
      </Section>

      <Section className="bg-white" eyebrow="Why choose us" title="Luxury feeling, human warmth, precise customization">
        <div className="grid gap-6 lg:grid-cols-3">
          {['Artist-led personalization', 'Premium packaging system', 'Fast support on WhatsApp'].map((title, index) => (
            <motion.div whileHover={{ y: -8 }} key={title} className="rounded-[2rem] bg-mist p-8 shadow-card">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-orchid to-pink-400 text-xl font-black text-white">0{index + 1}</span>
              <h3 className="mt-8 text-2xl font-black">{title}</h3>
              <p className="mt-3 text-zinc-600">Every order is checked for composition, print quality, packaging finish, and a polished unboxing experience.</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Reviews" title="Customers call it emotional luxury" center>
        <Swiper modules={[Pagination, Autoplay]} pagination autoplay={{ delay: 3500 }} spaceBetween={24} breakpoints={{ 0: { slidesPerView: 1 }, 900: { slidesPerView: 2 } }}>
          {testimonials.map(([name, text, stars]) => (
            <SwiperSlide key={name} className="pb-12">
              <div className="glass rounded-[2rem] p-8">
                <p className="text-2xl font-black text-pink-500">{'★'.repeat(stars)}</p>
                <p className="mt-5 text-xl font-semibold leading-relaxed">"{text}"</p>
                <p className="mt-6 font-black text-orchid">{name}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Section>

      <Section className="bg-mist" eyebrow="Instagram" title="A feed full of soft color, shine, and happy unboxings">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {products.slice(0, 8).map((product, i) => <img key={product.id} src={product.image} alt={product.name} className={`h-48 w-full rounded-3xl object-cover shadow-card md:h-64 ${i === 1 || i === 6 ? 'md:translate-y-8' : ''}`} />)}
        </div>
      </Section>

      <Section eyebrow="FAQ" title="Answers before you order">
        <div className="grid gap-4 lg:grid-cols-2">
          {faqs.map(([q, a]) => <details key={q} className="glass group rounded-3xl p-6"><summary className="cursor-pointer text-lg font-black">{q}</summary><p className="mt-4 text-zinc-600">{a}</p></details>)}
        </div>
      </Section>

      <Section className="pb-24" center>
        <div className="glass mx-auto max-w-5xl rounded-[2.2rem] p-8 text-center md:p-12">
          <h2 className="font-display text-4xl font-black md:text-6xl">Get early access to new drops</h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-600">Monthly gifting edits, festive launches, and private coupon codes from The Venny studio.</p>
          <form className="mx-auto mt-8 flex max-w-xl flex-col gap-3 rounded-full bg-white p-2 shadow-card sm:flex-row">
            <input className="min-h-12 flex-1 rounded-full px-5 outline-none" placeholder="Email address" type="email" />
            <Button type="submit">Join list</Button>
          </form>
        </div>
      </Section>
      <ProductPreviewModal product={preview} onClose={() => setPreview(null)} />
    </div>
  );
}
