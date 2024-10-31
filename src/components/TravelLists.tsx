'use client';

import { useState } from 'react';
import Link from 'next/link';

interface TravelListsProps {
  countryName: string;
  visaFreeCountries: string[];
  countriesCanVisit: string[];
}

export default function TravelLists({ countryName, visaFreeCountries, countriesCanVisit }: TravelListsProps) {
  const [activeTab, setActiveTab] = useState<'travelTo' | 'travelFrom'>('travelTo');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCountries = (activeTab === 'travelTo' ? visaFreeCountries : countriesCanVisit)
    .filter(country => country.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="border-b border-gray-200">
        <div className="flex">
          <button
            className={`px-6 py-4 text-sm font-medium border-b-2 ${
              activeTab === 'travelTo'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('travelTo')}
          >
            Can Travel To ({visaFreeCountries.length})
          </button>
          <button
            className={`px-6 py-4 text-sm font-medium border-b-2 ${
              activeTab === 'travelFrom'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('travelFrom')}
          >
            Can Travel From ({countriesCanVisit.length})
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search countries..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 
                focus:border-blue-500 focus:ring-2 focus:ring-blue-100 
                transition-all duration-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg 
                className="h-5 w-5 text-gray-400" 
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
          </div>
          <div className="mt-2 text-sm text-gray-500">
            {filteredCountries.length} countries found
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCountries.map((country) => (
            <Link 
              key={country}
              href={`/country/${encodeURIComponent(country)}`}
              className="block p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">
                  {activeTab === 'travelTo' ? '🛫' : '🛬'}
                </span>
                <span className="font-medium text-gray-900">
                  {country}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 px-6 py-4">
        <p className="text-sm text-gray-600">
          {activeTab === 'travelTo' 
            ? `Citizens of ${countryName} can travel visa-free to these ${visaFreeCountries.length} countries.`
            : `Citizens from these ${countriesCanVisit.length} countries can travel visa-free to ${countryName}.`
          }
        </p>
      </div>
    </div>
  );
} 