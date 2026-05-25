import Button from '../components/Button.jsx';

export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center px-4 pt-24 text-center">
      <div className="glass max-w-2xl rounded-[2rem] p-10">
        <p className="gradient-text text-8xl font-black">404</p>
        <h1 className="mt-4 font-display text-5xl font-black">This gift trail went missing.</h1>
        <p className="mt-4 text-zinc-600">The page you are looking for is not available, but the shop is glowing and ready.</p>
        <Button to="/" className="mt-8">Back to home</Button>
      </div>
    </div>
  );
}
