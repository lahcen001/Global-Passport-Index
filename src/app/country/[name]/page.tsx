'use client';

import { useParams } from 'next/navigation';
import { passportData } from '@/data/passportData';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import YouTubeEmbed from '@/components/YouTubeEmbed';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { countryCodeMap, getPassportImage } from '@/utils/passportImages';
import { fetchCountryDetails, formatNumber, formatArea, getLanguages, getCurrencies } from '@/services/countryDetailsService';
import TravelLists from '@/components/TravelLists';

const countryVideos: { [key: string]: string } = {
  "United Kingdom": "HbgVxZBUIC4",
  "France": "5B5lzV8_UlU",
  "Germany": "uF9Y9HF_-vA",
  "Italy": "HYuIoF3GN8E",
  "Spain": "B_GQbJrLVH0",
  "Switzerland": "2fh9qm6XsXk",
  "Netherlands": "u0oqPQ5yhd8",
  "Sweden": "g_2FkfZmWXM",
  "Norway": "HQkUMJwjE7U",
  "Finland": "DxxZgB9P_LY",
  "Denmark": "Hp0-YP3lADk",
  "Greece": "MxXuqhPvGZk",
  "Portugal": "4F_ygB5zyZA",
  "Japan": "j82MZHXw9Tw",
  "South Korea": "P8qFi74k2UE",
  "Singapore": "P3jS-iRoGn4",
  "China": "s_7-tEiyLJY",
  "Thailand": "gW6XF_yEgPI",
  "Vietnam": "r-ixJgNv6Yc",
  "Malaysia": "YJKQe9JHMTk",
  "Indonesia": "GLfp92UqJPY",
  "India": "j8DZjF2vXxM",
  "United States": "e0wkzzuRdKo",
  "Canada": "1P4ZWtRZsyc",
  "Mexico": "GZx_JSk4_iE",
  "Brazil": "8KGXSjtS5pk",
  "Argentina": "YZVlSqjVkwI",
  "Chile": "DYg9UkXd3dg",
  "Peru": "qcQg1P-yXHA",
  "Colombia": "YH1TUx3GKGY",
  "UAE": "QI9GSqBxHYM",
  "Saudi Arabia": "JW1IqieVL_U",
  "Qatar": "9I-M6P09f0M",
  "Israel": "AWKmazrRIwA",
  "South Africa": "MH0vswpD_-w",
  "Egypt": "vNfiDlhHbek",
  "Morocco": "LqB9lhHqXuM",
  "Kenya": "qSh5ULxE-go",
  "Tanzania": "Xw1LJr_v9Vk",
  "Australia": "f0PvMmTAUAQ",
  "New Zealand": "cqlLqmV2Gxs",
  "Fiji": "u1r7mwEPEm8",
  "Jamaica": "carG8tP6Tps",
  "Bahamas": "ldHXhWYzrq4",
  "Dominican Republic": "u1r7mwEPEm8",
  "Russia": "GKLO4lXYayk",
  "Turkey": "z9ZzqpqNbK4",
  "Iceland": "WxIJJnFQQmM",
  "Ireland": "zJ2zlt9v9EA"
};

const getCountryDetails = (countryName: string) => {
  const country = passportData.find(c => c.country.toLowerCase() === countryName.toLowerCase());
  if (!country) return null;

  const visaFreeCountries = passportData
    .filter(c => c.canTravelFrom >= country.canTravelTo)
    .map(c => c.country)
    .sort();

  const countriesCanVisit = passportData
    .filter(c => c.canTravelTo >= country.canTravelFrom)
    .map(c => c.country)
    .sort();

  const ranking = passportData
    .sort((a, b) => b.canTravelTo - a.canTravelTo)
    .findIndex(c => c.country === country.country) + 1;

  const strength = 
    country.canTravelTo > 180 ? 'Premium' :
    country.canTravelTo > 150 ? 'High' :
    country.canTravelTo > 100 ? 'Medium' :
    country.canTravelTo > 50 ? 'Low' : 'Basic';

  const strengthColor =
    country.canTravelTo > 180 ? 'text-blue-600' :
    country.canTravelTo > 150 ? 'text-emerald-600' :
    country.canTravelTo > 100 ? 'text-yellow-600' :
    country.canTravelTo > 50 ? 'text-orange-600' : 'text-red-600';

  const videoId = countryVideos[country.country];

  return { 
    ...country, 
    ranking, 
    strength, 
    strengthColor, 
    videoId,
    visaFreeCountries,
    countriesCanVisit
  };
};

export default function CountryPage() {
  const [countryDetails, setCountryDetails] = useState<any>(null);
  const [apiDetails, setApiDetails] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'travelTo' | 'travelFrom'>('travelTo');
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const countryName = decodeURIComponent(params.name as string);

  useEffect(() => {
    async function loadCountryDetails() {
      const details = getCountryDetails(countryName);
      const apiData = await fetchCountryDetails(countryName);
      setCountryDetails(details);
      setApiDetails(apiData);
      setLoading(false);
    }

    loadCountryDetails();
  }, [countryName]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading country information...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!countryDetails || !apiDetails) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Country not found</h1>
            <Link href="/" className="text-blue-600 hover:underline">
              Return to home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link href="/" className="text-blue-600 hover:underline flex items-center">
              <span className="mr-2">←</span> Back to all countries
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className={`bg-gradient-to-r ${
              countryDetails.canTravelTo > 180 ? 'from-blue-600 to-indigo-700' :
              countryDetails.canTravelTo > 150 ? 'from-emerald-600 to-teal-700' :
              countryDetails.canTravelTo > 100 ? 'from-yellow-500 to-orange-600' :
              countryDetails.canTravelTo > 50 ? 'from-orange-500 to-red-600' :
              'from-red-600 to-red-800'
            } p-8 text-white relative overflow-hidden`}>
              <div className="absolute inset-0 opacity-10">
                <div className="w-full h-full bg-repeat" 
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`
                  }}
                />
              </div>

              <div className="relative flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold mb-4">{countryDetails.country}</h1>
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">
                      {countryDetails.canTravelTo > 180 ? '🏆' :
                       countryDetails.canTravelTo > 150 ? '✨' :
                       countryDetails.canTravelTo > 100 ? '🌟' :
                       countryDetails.canTravelTo > 50 ? '📘' : '📕'}
                    </span>
                    <span className="text-xl">Global Rank: #{countryDetails.ranking}</span>
                  </div>
                </div>
                <div className="relative w-32 h-32 rounded-lg overflow-hidden shadow-lg border-2 border-white/30">
                  <Image
                    src={getPassportImage(countryCodeMap[countryDetails.country] || '')}
                    alt={`Flag of ${countryDetails.country}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Passport Strength</h2>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span>Power Level</span>
                        <span className={`font-bold ${countryDetails.strengthColor}`}>
                          {countryDetails.strength}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${
                            countryDetails.canTravelTo > 180 ? 'from-blue-500 to-indigo-600' :
                            countryDetails.canTravelTo > 150 ? 'from-emerald-500 to-teal-600' :
                            countryDetails.canTravelTo > 100 ? 'from-yellow-400 to-orange-500' :
                            countryDetails.canTravelTo > 50 ? 'from-orange-400 to-red-500' :
                            'from-red-500 to-red-700'
                          }`}
                          style={{ width: `${(countryDetails.canTravelTo / 195) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-4">Travel Freedom</h2>
                    <div className="space-y-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span>Visa-Free Access</span>
                          <span className="font-bold text-blue-600">
                            {countryDetails.canTravelTo} countries
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Citizens can travel to {countryDetails.canTravelTo} countries without a visa
                        </p>
                      </div>
                      <div className="bg-indigo-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span>Visitors Access</span>
                          <span className="font-bold text-indigo-600">
                            {countryDetails.canTravelFrom} countries
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Citizens from {countryDetails.canTravelFrom} countries can visit without a visa
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Global Standing</h2>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <span>Global Rank</span>
                        <span className="text-2xl font-bold">#{countryDetails.ranking}</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Out of {passportData.length} countries worldwide
                      </p>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-4">Travel Statistics</h2>
                    <div className="space-y-4">
                      <div className="bg-gray-100 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span>Continental Coverage</span>
                          <span className="font-bold">
                            {Math.round((countryDetails.canTravelTo / 195) * 100)}%
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-green-500 to-blue-500"
                            style={{ width: `${(countryDetails.canTravelTo / 195) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Country Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-3">General Information</h3>
                      <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Official Name</span>
                          <span className="font-medium">{apiDetails.name.official}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Capital</span>
                          <span className="font-medium">{apiDetails.capital?.join(', ') || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Region</span>
                          <span className="font-medium">{apiDetails.region}</span>
                        </div>
                        {apiDetails.subregion && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Subregion</span>
                            <span className="font-medium">{apiDetails.subregion}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-3">Demographics</h3>
                      <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Population</span>
                          <span className="font-medium">{formatNumber(apiDetails.population)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Area</span>
                          <span className="font-medium">{formatArea(apiDetails.area)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Languages</span>
                          <span className="font-medium text-right">{getLanguages(apiDetails.languages)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-3">Additional Details</h3>
                      <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Currencies</span>
                          <span className="font-medium text-right">{getCurrencies(apiDetails.currencies)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Timezones</span>
                          <span className="font-medium text-right">{apiDetails.timezones.join(', ')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Continents</span>
                          <span className="font-medium">{apiDetails.continents.join(', ')}</span>
                        </div>
                      </div>
                    </div>

                    {apiDetails.borders && apiDetails.borders.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-3">Bordering Countries</h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex flex-wrap gap-2">
                            {apiDetails.borders.map((border: string) => (
                              <span
                                key={border}
                                className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-600 shadow-sm"
                              >
                                {border}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    <div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-3">Coat of Arms</h3>
                      {apiDetails.coatOfArms.svg ? (
                        <div className="bg-gray-50 rounded-lg p-4 flex justify-center">
                          <div className="relative w-32 h-32">
                            <Image
                              src={apiDetails.coatOfArms.svg}
                              alt={`Coat of arms of ${countryDetails.country}`}
                              fill
                              className="object-contain"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="bg-gray-50 rounded-lg p-4 text-center text-gray-500">
                          No coat of arms available
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Visa-Free Travel
            </h2>
            <TravelLists
              countryName={countryDetails.country}
              visaFreeCountries={countryDetails.visaFreeCountries}
              countriesCanVisit={countryDetails.countriesCanVisit}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 