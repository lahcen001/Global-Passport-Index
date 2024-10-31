interface SearchBarProps {
  onSearch: (value: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <svg 
          className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
          />
        </svg>
      </div>
      <input
        type="text"
        placeholder="Search for a country..."
        className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 
        focus:border-blue-500 focus:ring-4 focus:ring-blue-100 
        transition-all duration-200 bg-white/70 backdrop-blur-sm
        hover:bg-white hover:shadow-md"
        onChange={(e) => onSearch(e.target.value)}
      />
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 
        scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
    </div>
  );
} 