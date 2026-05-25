import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import Section from '../components/Section.jsx';
import Button from '../components/Button.jsx';

export default function Contact() {
  return (
    <div className="pt-28">
      <Section eyebrow="Contact" title="Start a custom gifting conversation">
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
          <div className="space-y-4">
            {[
              [FiPhone, '+91 98765 43210'],
              [FiMail, 'hello@thevennygifts.com'],
              [FiMapPin, 'Mumbai studio, shipping across India'],
            ].map(([Icon, text]) => <div key={text} className="glass flex items-center gap-4 rounded-3xl p-5"><Icon className="text-2xl text-orchid" /><p className="font-bold">{text}</p></div>)}
          </div>
          <form className="glass grid gap-4 rounded-[2rem] p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <input className="rounded-2xl bg-white px-5 py-4 outline-none" placeholder="Name" />
              <input className="rounded-2xl bg-white px-5 py-4 outline-none" placeholder="Email" type="email" />
            </div>
            <input className="rounded-2xl bg-white px-5 py-4 outline-none" placeholder="Occasion or order type" />
            <textarea className="min-h-40 rounded-2xl bg-white px-5 py-4 outline-none" placeholder="Tell us about the gift, quantity, timeline, and customization details." />
            <Button type="submit">Send enquiry</Button>
          </form>
        </div>
      </Section>
    </div>
  );
}
