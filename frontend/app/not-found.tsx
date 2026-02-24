import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-[#2d6a4f] flex items-center justify-center p-4">
      <div className="text-center text-white">
        <div className="mb-8">
          <div className="text-9xl font-bold mb-4">404</div>
          <div className="text-6xl mb-4">🌱</div>
        </div>
        
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-xl mb-8 opacity-90">
          Sorry, we couldn't find the page you're looking for.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-4 bg-gold text-neutral rounded-lg font-bold text-lg hover:bg-[#FFC107] transition-all hover:shadow-2xl"
          >
            Go Home
          </Link>
          <Link
            href="/dashboard"
            className="px-8 py-4 bg-white/20 text-white rounded-lg font-bold text-lg hover:bg-white/30 transition-all"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
