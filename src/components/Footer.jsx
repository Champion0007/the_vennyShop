import { FiInstagram, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink px-4 py-14 text-white sm:px-6 lg:px-8">
      <div className="blob left-8 top-4 h-44 w-44 bg-pink-400/50" />
      <div className="blob bottom-0 right-16 h-52 w-52 bg-orchid/50" />
      <div className="relative mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.3fr_.7fr_.7fr_1fr]">
        <div>
          <h3 className="font-display text-4xl font-black">The Venny</h3>
          <p className="mt-4 max-w-sm text-white/70">Premium customized gifts crafted for anniversaries, birthdays, weddings, corporate moments, and everyday love.</p>
        </div>
        <div>
          <h4 className="mb-4 font-black">Shop</h4>
          {['Photo Gifts', 'Hampers', 'Home Decor', 'Corporate'].map((item) => <p key={item} className="mb-2 text-white/70">{item}</p>)}
        </div>
        <div>
          <h4 className="mb-4 font-black">Pages</h4>
          {[
            ['Home', '/'],
            ['Products', '/products'],
            ['About', '/about'],
            ['Contact', '/contact'],
          ].map(([label, to]) => <Link key={to} to={to} className="mb-2 block text-white/70 hover:text-white">{label}</Link>)}
        </div>
        <div className="space-y-3 text-white/75">
          <p className="flex items-center gap-3"><FiMapPin /> Mumbai, India</p>
          <p className="flex items-center gap-3"><FiPhone /> +91 98765 43210</p>
          <p className="flex items-center gap-3"><FiMail /> hello@thevennygifts.com</p>
          <p className="flex items-center gap-3"><FiInstagram /> @thevennygifts</p>
        </div>
      </div>
      <div className="relative mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-sm text-white/55">
        Copyright 2026 The Venny Customized Gifts. Crafted with personalization at heart.
      </div>
    </footer>
  );
}
