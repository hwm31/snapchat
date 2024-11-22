import Link from 'next/link';
import Navigation from './Navigation';

export default function Header() {
  return (
    <header className="bg-black">
      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-yellow-400">👻 Snapchat</span>
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-3">
            <Link
              href="/login"
              className="text-yellow-400 hover:text-yellow-300 px-3 py-1.5 text-sm font-medium"
            >
              LogIn
            </Link>
            <Link
              href="/register"
              className="bg-yellow-400 text-black hover:bg-yellow-300 px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
            >
              Register
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <Navigation />
    </header>
  );
}