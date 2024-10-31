'use client';

import { useState, useEffect } from 'react';
import { fetchAllCountries, mergeCountryData } from '../services/countryService';
import { passportData } from '../data/passportData';
import CountryCard from '../components/CountryCard';
import SearchBar from '../components/SearchBar';
import SortOptions from '../components/SortOptions';
import RegionFilter from '../components/RegionFilter';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FeaturedCountry from '../components/FeaturedCountry';

const getRegion = (country: { region: string; subregion?: string }) => {
  if (!country.region) return 'Other';

  // Special handling for subregions
  if (country.subregion) {
    if (country.subregion.includes('Eastern Europe')) return 'Eastern European';
    if (country.subregion.includes('Caribbean')) return 'Caribbean';
    if (country.subregion.includes('Pacific')) return 'Pacific';
  }

  // Main region mapping
  switch (country.region) {
    case 'Europe':
      return 'Strong European';
    case 'Asia':
      return country.subregion?.includes('Western Asia') ? 'Middle Eastern' : 'Asian';
    case 'Americas':
      return country.subregion?.includes('Caribbean') ? 'Caribbean' : 'American';
    case 'Africa':
      return 'African';
    case 'Oceania':
      return 'Pacific';
    default:
      return 'Other';
  }
};

export default function Home() {
  const [countries, setCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<'country' | 'canTravelTo' | 'canTravelFrom'>('country');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedRegion, setSelectedRegion] = useState('All Regions');

  useEffect(() => {
    async function loadCountries() {
      try {
        const restCountries = await fetchAllCountries();
        const mergedData = mergeCountryData(restCountries, passportData);
        setCountries(mergedData);
      } catch (error) {
        console.error('Error loading countries:', error);
      } finally {
        setLoading(false);
      }
    }

    loadCountries();
  }, []);

  const handleSort = (key: 'country' | 'canTravelTo' | 'canTravelFrom') => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const filteredData = countries
    .filter((country) => {
      const matchesSearch = country.country.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRegion = selectedRegion === 'All Regions' || getRegion(country) === selectedRegion;
      return matchesSearch && matchesRegion;
    })
    .sort((a, b) => {
      const multiplier = sortDirection === 'asc' ? 1 : -1;
      if (sortKey === 'country') {
        return multiplier * a.country.localeCompare(b.country);
      }
      return multiplier * (a[sortKey] - b[sortKey]);
    });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading countries...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <section className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Global Passport Index
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore visa-free travel opportunities and discover the power of passports worldwide
            </p>
          </section>

          <section className="mb-16">
            <FeaturedCountry />
          </section>

          <section id="rankings" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Passport Rankings
            </h2>
            <div className="space-y-8">
              <div className="space-y-6">
                <SearchBar onSearch={setSearchTerm} />
                <RegionFilter 
                  onRegionChange={setSelectedRegion}
                  selectedRegion={selectedRegion}
                />
                <SortOptions onSort={handleSort} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredData.map((country) => (
                  <CountryCard
                    key={country.country}
                    country={country.country}
                    officialName={country.officialName || country.country}
                    region={country.region || 'Unknown'}
                    subregion={country.subregion}
                    population={country.population || 0}
                    flag={country.flag || ''}
                    code={country.code || ''}
                    canTravelTo={country.canTravelTo}
                    canTravelFrom={country.canTravelFrom}
                  />
                ))}
              </div>
              {filteredData.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">
                    No countries found matching your criteria
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
} 