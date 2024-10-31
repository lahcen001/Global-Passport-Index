import Link from 'next/link';
import MyLocation from './MyLocation';

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold flex items-center space-x-2">
              <span className="text-3xl">🌎</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                Passport Index
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <MyLocation />
            <a 
              href="#rankings" 
              className="px-4 py-2 rounded-md text-blue-100 hover:text-white hover:bg-blue-700 transition-all duration-200"
            >
              Rankings
            </a>
            <a 
              href="https://github.com/yourusername/passport-index" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-md bg-white text-blue-600 hover:bg-blue-50 transition-all duration-200"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
} 