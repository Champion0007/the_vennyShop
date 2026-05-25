import { AnimatePresence, motion } from 'framer-motion';
import { FiMinus, FiPlus, FiShoppingBag, FiTrash2 } from 'react-icons/fi';
import Button from '../components/Button.jsx';
import Section from '../components/Section.jsx';
import { useCart } from '../hooks/useCart.jsx';
import { money } from '../utils/format.js';

export default function Cart() {
  const { items, subtotal, discount, shipping, total, updateQty, removeFromCart, applyCoupon } = useCart();
  return (
    <div className="pt-28">
      <Section eyebrow="Cart" title="Your personalized gift box">
        {items.length === 0 ? (
          <div className="glass mx-auto max-w-2xl rounded-[2rem] p-10 text-center">
            <FiShoppingBag className="mx-auto text-5xl text-orchid" />
            <h2 className="mt-5 text-3xl font-black">Your cart is ready for something beautiful.</h2>
            <p className="mt-3 text-zinc-600">Browse customized gifts and build a celebration-worthy order.</p>
            <Button to="/products" className="mt-7">Explore products</Button>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            <div className="space-y-4">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div layout exit={{ opacity: 0, x: -40 }} key={item.id} className="glass grid gap-4 rounded-[2rem] p-4 sm:grid-cols-[130px_1fr_auto]">
                    <img src={item.image} alt={item.name} className="h-32 w-full rounded-3xl object-cover" />
                    <div>
                      <p className="text-sm font-bold text-orchid">{item.category}</p>
                      <h3 className="text-xl font-black">{item.name}</h3>
                      <p className="mt-2 text-zinc-600">{money(item.price)}</p>
                      <button onClick={() => removeFromCart(item.id)} className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-pink-600"><FiTrash2 /> Remove</button>
                    </div>
                    <div className="flex items-center justify-start sm:justify-end">
                      <div className="flex items-center rounded-full bg-white p-2 shadow">
                        <button onClick={() => updateQty(item.id, item.qty - 1)} className="grid h-9 w-9 place-items-center rounded-full bg-mist"><FiMinus /></button>
                        <span className="w-10 text-center font-black">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.qty + 1)} className="grid h-9 w-9 place-items-center rounded-full bg-mist"><FiPlus /></button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <aside className="glass h-max rounded-[2rem] p-6">
              <h2 className="text-2xl font-black">Order summary</h2>
              <div className="mt-6 rounded-3xl bg-white p-3 shadow">
                <input onBlur={(e) => applyCoupon(e.target.value)} placeholder="Coupon code: VENNY10" className="w-full rounded-2xl bg-mist px-4 py-3 outline-none" />
              </div>
              <div className="mt-6 space-y-3 text-zinc-600">
                <p className="flex justify-between"><span>Subtotal</span><strong>{money(subtotal)}</strong></p>
                <p className="flex justify-between"><span>Discount</span><strong>-{money(discount)}</strong></p>
                <p className="flex justify-between"><span>Shipping</span><strong>{shipping ? money(shipping) : 'Free'}</strong></p>
              </div>
              <div className="mt-6 border-t border-white/70 pt-6">
                <p className="flex justify-between text-2xl font-black"><span>Total</span><span>{money(total)}</span></p>
                <Button className="mt-6 w-full">Checkout securely</Button>
              </div>
            </aside>
          </div>
        )}
      </Section>
    </div>
  );
}
