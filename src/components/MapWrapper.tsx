'use client';

import dynamic from 'next/dynamic';

const WorldMapClient = dynamic(() => import('./WorldMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
      <div className="text-gray-500">Loading map...</div>
    </div>
  ),
});

interface MapWrapperProps {
  metric: 'canTravelTo' | 'canTravelFrom';
}

export default function MapWrapper({ metric }: MapWrapperProps) {
  return <WorldMapClient metric={metric} />;
} 