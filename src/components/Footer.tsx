export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-blue-400">Passport Index</h3>
            <p className="text-gray-300 leading-relaxed">
              Your comprehensive guide to global mobility and visa-free travel opportunities worldwide.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-blue-400">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#rankings" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="mr-2">📊</span> Rankings
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="mr-2">📱</span> Mobile App
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-blue-400">Data Sources</h3>
            <p className="text-gray-300 leading-relaxed">
              Our data is regularly updated based on official government sources and international travel regulations.
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Passport Index. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 