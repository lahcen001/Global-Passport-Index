interface RegionFilterProps {
  onRegionChange: (region: string) => void;
  selectedRegion: string;
}

const regions = [
  'All Regions',
  'Top Tier',
  'Strong European',
  'Eastern European',
  'Asian',
  'Middle Eastern',
  'African',
  'American',
  'Caribbean',
  'Pacific',
  'Other'
];

export default function RegionFilter({ onRegionChange, selectedRegion }: RegionFilterProps) {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-gray-700">Filter by Region</label>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {regions.map((region) => (
          <button
            key={region}
            onClick={() => onRegionChange(region)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${selectedRegion === region
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600'
              }`}
          >
            {region}
          </button>
        ))}
      </div>
    </div>
  );
} 