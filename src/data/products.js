import { slugify } from '../utils/format.js';

export const categories = ['Photo Gifts', 'Hampers', 'Home Decor', 'Jewellery', 'Corporate', 'Occasions'];

const imageBank = [
  'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1607344645866-009c7d737f46?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1607083206968-13611e3d76db?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=1200&q=85',
];

const items = [
  ['Memory Bloom Photo Lamp', 'Photo Gifts', 1899, 2499, 'hot', 4.9],
  ['Velvet Love Hamper', 'Hampers', 3299, 3999, 'sale', 4.8],
  ['Moonlit Name Neon Frame', 'Home Decor', 2799, 3499, 'new', 4.9],
  ['Initial Charm Bracelet', 'Jewellery', 1499, 1999, 'hot', 4.7],
  ['Executive Desk Luxe Box', 'Corporate', 4499, 5299, 'new', 4.8],
  ['Anniversary Story Cube', 'Occasions', 2299, 2999, 'sale', 4.9],
  ['Mini Moments Magnet Set', 'Photo Gifts', 899, 1299, 'hot', 4.6],
  ['Blush Celebration Basket', 'Hampers', 3899, 4599, 'new', 4.8],
  ['Signature Couple Portrait', 'Home Decor', 2599, 3199, 'sale', 4.9],
  ['Pearl Letter Pendant', 'Jewellery', 1799, 2299, 'new', 4.7],
  ['Founder Welcome Kit', 'Corporate', 5999, 6999, 'hot', 4.9],
  ['Birthday Sparkle Box', 'Occasions', 1999, 2599, 'sale', 4.8],
];

export const products = items.map(([name, category, price, compareAt, badge, rating], index) => ({
  id: index + 1,
  name,
  slug: slugify(name),
  category,
  price,
  compareAt,
  badge,
  rating,
  reviews: 80 + index * 17,
  popularity: 100 - index * 4,
  createdAt: Date.now() - index * 86400000,
  image: imageBank[index % imageBank.length],
  gallery: [imageBank[index % imageBank.length], imageBank[(index + 2) % imageBank.length], imageBank[(index + 4) % imageBank.length]],
  description:
    'A handcrafted personalized gift finished with premium materials, elegant packaging, and a heartfelt custom detail made for the person receiving it.',
  details: ['Personalized artwork preview', 'Premium gift-ready packaging', 'Hand-finished by Venny artists', 'Ships in 3-5 business days'],
}));

export const testimonials = [
  ['Aarohi Mehta', 'The packaging felt like opening a designer boutique gift. The photo lamp made my parents emotional.', 5],
  ['Rishabh Anand', 'Fast, polished, and beautifully customized. The hamper looked much more premium than expected.', 5],
  ['Naina Kapoor', 'The Venny team nailed the colors, message, and tiny details. It felt deeply personal.', 5],
  ['Kabir Sethi', 'Ordered corporate kits for clients. Everyone asked where we got them made.', 5],
];

export const faqs = [
  ['Can I preview my customization?', 'Yes. Every customized order includes a digital artwork preview before production.'],
  ['How fast can you deliver?', 'Most products ship in 3-5 business days. Express options are shown during checkout.'],
  ['Do you support bulk orders?', 'Yes, corporate and event orders include special packaging, branding, and pricing.'],
  ['Can I upload photos or names?', 'Product pages include upload and personalization fields for photos, names, dates, and notes.'],
];
