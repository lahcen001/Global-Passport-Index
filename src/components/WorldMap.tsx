'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import { passportData } from '../data/passportData';
import 'leaflet/dist/leaflet.css';

interface WorldMapProps {
  metric: 'canTravelTo' | 'canTravelFrom';
}

function MapContent({ geoJsonData, metric }: { geoJsonData: any; metric: 'canTravelTo' | 'canTravelFrom' }) {
  const map = useMap();

  const getColor = (value: number) => {
    const values = passportData.map(country => country[metric]);
    const max = Math.max(...values);
    const normalized = value / max;

    if (normalized > 0.8) return '#1a9850';
    if (normalized > 0.6) return '#91cf60';
    if (normalized > 0.4) return '#d9ef8b';
    if (normalized > 0.2) return '#fee08b';
    return '#fc8d59';
  };

  useEffect(() => {
    map.setView([20, 0], 2);
  }, [map]);

  if (!geoJsonData) return null;

  return (
    <>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <GeoJSON
        key={metric} // Force re-render when metric changes
        data={geoJsonData}
        style={(feature) => {
          const countryData = passportData.find(
            country => country.country === feature?.properties.ADMIN
          );

          return {
            fillColor: countryData ? getColor(countryData[metric]) : '#d3d3d3',
            weight: 1,
            opacity: 1,
            color: 'white',
            fillOpacity: 0.7
          };
        }}
        onEachFeature={(feature, layer) => {
          const countryData = passportData.find(
            country => country.country === feature.properties.ADMIN
          );

          if (countryData) {
            layer.bindTooltip(
              `${feature.properties.ADMIN}<br/>
              ${metric === 'canTravelTo' ? 'Can travel to' : 'Can be visited by'}: 
              ${countryData[metric]} countries`,
              { sticky: true }
            );
          } else {
            layer.bindTooltip(feature.properties.ADMIN, { sticky: true });
          }
        }}
      />
    </>
  );
}

export default function WorldMap({ metric }: WorldMapProps) {
  const [geoJsonData, setGeoJsonData] = useState<any>(null);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
      .then(response => response.json())
      .then(data => {
        setGeoJsonData(data);
      });
  }, []);

  if (!geoJsonData) {
    return (
      <div className="w-full h-[600px] rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
        <div className="text-gray-500">Loading map...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-[600px] rounded-lg overflow-hidden">
      <MapContainer
        key="map-container"
        center={[20, 0]}
        zoom={2}
        style={{ height: '100%', width: '100%' }}
        minZoom={2}
        maxBounds={[[-90, -180], [90, 180]]}
        maxBoundsViscosity={1.0}
      >
        <MapContent geoJsonData={geoJsonData} metric={metric} />
      </MapContainer>
    </div>
  );
} 