'use client';

import { useState, useEffect } from 'react';
import { passportData, PassportDataEntry } from '@/data/passportData';
import Link from 'next/link';

interface LocationData {
  country_name: string;
  country_code: string;
}

interface UserCountryData {
  country: string;
  canTravelTo: number;
  canTravelFrom: number;
  ranking: number;
}

// Add a safe logging utility
const safeLogError = (message: string) => {
  // Only log in development and when window is available
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    // Use a try-catch to prevent any potential errors from breaking the app
    try {
      // Create a custom event instead of using console.error
      const errorEvent = new CustomEvent('app-error', { 
        detail: { message, timestamp: new Date().toISOString() }
      });
      window.dispatchEvent(errorEvent);
    } catch {
      // Silently fail if event creation fails
    }
  }
};

export default function FeaturedCountry(): JSX.Element {
  const [userCountry, setUserCountry] = useState<UserCountryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function getLocation() {
      try {
        const response = await fetch('https://ipapi.co/json/', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          cache: 'no-cache'
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: LocationData = await response.json();
        
        if (!isMounted) return;

        const countryMatch = passportData.find(
          c => c.country.toLowerCase() === data.country_name.toLowerCase()
        );

        if (countryMatch) {
          const ranking = passportData
            .sort((a, b) => b.canTravelTo - a.canTravelTo)
            .findIndex(c => c.country === countryMatch.country) + 1;

          setUserCountry({ ...countryMatch, ranking });
        } else {
          setDefaultCountry();
          setError('Could not detect your location - showing default data');
        }
      } catch (err) {
        if (!isMounted) return;
        
        if (err instanceof Error) {
          const errorMessage = `Location detection failed: ${err.message}`;
          safeLogError(errorMessage);
        }
        
        setDefaultCountry();
        setError('Could not detect your location - showing default data');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    getLocation();

    return () => {
      isMounted = false;
    };
  }, []);

  const setDefaultCountry = () => {
    const defaultCountry = passportData.find(c => c.country === "United States");
    if (defaultCountry) {
      const ranking = passportData
        .sort((a, b) => b.canTravelTo - a.canTravelTo)
        .findIndex(c => c.country === defaultCountry.country) + 1;

      setUserCountry({ ...defaultCountry, ranking });
    }
  };

  const getFlagUrl = (countryName: string): string => {
    const countryCodeMap: Record<string, string> = {
      'United States': 'us',
      'United Kingdom': 'gb',
      'South Korea': 'kr',
      'North Korea': 'kp',
    };

    const code = countryCodeMap[countryName] || 
                countryName.toLowerCase().slice(0, 2);
    return `https://flagcdn.com/w80/${code}.png`;
  };

  if (loading) {
    return (    
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-blue-400/50 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-blue-400/50 rounded w-2/3"></div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/10 rounded-lg p-4">
                <div className="h-4 bg-blue-400/50 rounded w-1/2 mb-2"></div>
                <div className="h-6 bg-blue-400/50 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!userCountry) {
    return (
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-8 text-white">
        <div className="text-center">
          <div className="text-4xl mb-4">🌍</div>
          <p className="text-xl font-semibold mb-2">Unable to load country data</p>
          <p className="text-sm text-blue-200">
            Please check your internet connection and try again
          </p>
        </div>
      </div>
    );
  }

  return (
    <Link href={`/country/${encodeURIComponent(userCountry.country)}`}>
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-8 text-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-blue-200 mb-2">
              {error ? 'Featured Country' : 'Your Location'}
              {error && (
                <span className="text-xs ml-2 text-blue-300">
                  ({error})
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <img 
                src={getFlagUrl(userCountry.country)}
                alt={`${userCountry.country} flag`}
                className="w-8 h-6 object-cover rounded shadow-sm"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://flagcdn.com/w80/un.png';
                }}
              />
              <h2 className="text-3xl font-bold">{userCountry.country}</h2>
            </div>
          </div>
          <div className="text-5xl">
            {error ? '🌎' : '📍'}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-blue-200 text-sm mb-1">Global Rank</div>
            <div className="text-2xl font-bold">#{userCountry.ranking}</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-blue-200 text-sm mb-1">Can Travel To</div>
            <div className="text-2xl font-bold">{userCountry.canTravelTo}</div>
            <div className="text-sm text-blue-200">countries</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-blue-200 text-sm mb-1">Can Travel From</div>
            <div className="text-2xl font-bold">{userCountry.canTravelFrom}</div>
            <div className="text-sm text-blue-200">countries</div>
          </div>
        </div>
        <div className="mt-6 text-sm text-blue-200">
          Click to see detailed information about this passport
        </div>
      </div>
    </Link>
  );
} 