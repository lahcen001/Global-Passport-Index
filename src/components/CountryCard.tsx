import Link from 'next/link';
import Image from 'next/image';
import { countryCodeMap, getPassportImage } from '../utils/passportImages';

interface CountryCardProps {
  country: string;
  officialName: string;
  region: string;
  subregion?: string;
  population: number;
  flag: string;
  code: string;
  canTravelTo: number;
  canTravelFrom: number;
}

const getPassportColor = (value: number): string => {
  if (value > 180) return 'from-blue-600 to-indigo-700';
  if (value > 150) return 'from-emerald-600 to-teal-700';
  if (value > 100) return 'from-yellow-500 to-orange-600';
  if (value > 50) return 'from-orange-500 to-red-600';
  return 'from-red-600 to-red-800';
};

const getPassportEmoji = (value: number): string => {
  if (value > 180) return '🏆';
  if (value > 150) return '✨';
  if (value > 100) return '🌟';
  if (value > 50) return '📘';
  return '📕';
};

const formatPopulation = (population: number): string => {
  if (population >= 1000000000) {
    return `${(population / 1000000000).toFixed(1)}B`;
  }
  if (population >= 1000000) {
    return `${(population / 1000000).toFixed(1)}M`;
  }
  if (population >= 1000) {
    return `${(population / 1000).toFixed(1)}K`;
  }
  return population.toString();
};

export default function CountryCard({ 
  country, 
  officialName,
  region,
  subregion,
  population,
  flag,
  code,
  canTravelTo, 
  canTravelFrom 
}: CountryCardProps) {
  const passportColor = getPassportColor(canTravelTo);
  const passportEmoji = getPassportEmoji(canTravelTo);
  const countryCode = countryCodeMap[country] || code.toLowerCase();

  return (
    <Link href={`/country/${encodeURIComponent(country)}`} className="block">
      <div className="card-shine rounded-xl shadow-md hover-lift overflow-hidden">
        <div className={`bg-gradient-to-r ${passportColor} p-6 relative`}>
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full bg-repeat" 
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`
              }}
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">{country}</h2>
              <p className="text-blue-100 text-sm">{code}</p>
            </div>
            <div className="relative w-16 h-16 rounded-lg overflow-hidden shadow-lg border-2 border-white/30">
              <Image
                src={getPassportImage(countryCode)}
                alt={`Flag of ${country}`}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="text-sm text-blue-100 truncate">
            {officialName}
          </div>
        </div>
        
        <div className="bg-white p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-gray-500">Region</div>
              <div className="font-medium">{region}</div>
              {subregion && (
                <div className="text-xs text-gray-400">{subregion}</div>
              )}
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-gray-500">Population</div>
              <div className="font-medium">{formatPopulation(population)}</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-700 font-medium flex items-center">
                <span className="mr-2">🌍</span>
                Can Travel To
              </span>
              <div className="flex items-center">
                <span className="font-bold text-blue-600 text-lg">{canTravelTo}</span>
                <span className="text-gray-500 text-sm ml-1">countries</span>
              </div>
            </div>
            <div className="relative">
              <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  style={{ width: `${(canTravelTo / 195) * 100}%` }}
                  className={`h-full bg-gradient-to-r ${passportColor} rounded-full
                  transition-all duration-500 ease-out`}
                />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-5 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-700 font-medium flex items-center">
                <span className="mr-2">✈️</span>
                Can Travel From
              </span>
              <div className="flex items-center">
                <span className="font-bold text-indigo-600 text-lg">{canTravelFrom}</span>
                <span className="text-gray-500 text-sm ml-1">countries</span>
              </div>
            </div>
            <div className="relative">
              <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  style={{ width: `${(canTravelFrom / 195) * 100}%` }}
                  className={`h-full bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full
                  transition-all duration-500 ease-out`}
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Passport Strength</span>
              <span className={`font-medium ${
                canTravelTo > 180 ? 'text-blue-600' :
                canTravelTo > 150 ? 'text-emerald-600' :
                canTravelTo > 100 ? 'text-yellow-600' :
                canTravelTo > 50 ? 'text-orange-600' :
                'text-red-600'
              }`}>
                {canTravelTo > 180 ? 'Premium' :
                 canTravelTo > 150 ? 'High' :
                 canTravelTo > 100 ? 'Medium' :
                 canTravelTo > 50 ? 'Low' :
                 'Basic'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
} 