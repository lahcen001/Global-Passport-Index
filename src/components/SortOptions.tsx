interface SortOptionsProps {
  onSort: (key: 'country' | 'canTravelTo' | 'canTravelFrom') => void;
}

export default function SortOptions({ onSort }: SortOptionsProps) {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-gray-700">Sort by</label>
      <div className="flex gap-2 bg-white p-1 rounded-lg shadow-sm">
        <button
          onClick={() => onSort('country')}
          className="flex-1 px-4 py-2 text-sm font-medium rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
        >
          Country Name
        </button>
        <button
          onClick={() => onSort('canTravelTo')}
          className="flex-1 px-4 py-2 text-sm font-medium rounded-md hover:bg-green-50 hover:text-green-600 transition-colors duration-200"
        >
          Travel To
        </button>
        <button
          onClick={() => onSort('canTravelFrom')}
          className="flex-1 px-4 py-2 text-sm font-medium rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
        >
          Travel From
        </button>
      </div>
    </div>
  );
} 