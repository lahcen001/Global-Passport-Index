interface MapToggleProps {
  metric: 'canTravelTo' | 'canTravelFrom';
  onToggle: (metric: 'canTravelTo' | 'canTravelFrom') => void;
}

export default function MapToggle({ metric, onToggle }: MapToggleProps) {
  return (
    <div className="max-w-md mx-auto mb-8">
      <label className="block text-sm font-medium text-gray-700 mb-2">Map View:</label>
      <div className="flex gap-2">
        <button
          onClick={() => onToggle('canTravelTo')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            metric === 'canTravelTo'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          Travel To
        </button>
        <button
          onClick={() => onToggle('canTravelFrom')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            metric === 'canTravelFrom'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          Travel From
        </button>
      </div>
    </div>
  );
} 