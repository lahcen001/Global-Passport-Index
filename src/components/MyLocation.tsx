'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { passportData } from '@/data/passportData';

interface LocationData {
  country_name: string;
}

export default function MyLocation() {
  const [userCountry, setUserCountry] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getLocation() {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data: LocationData = await response.json();
        
        // Find matching country in our passport data
        const countryMatch = passportData.find(
          c => c.country.toLowerCase() === data.country_name.toLowerCase()
        );

        if (countryMatch) {
          setUserCountry(countryMatch.country);
        }
      } catch (err) {
        setError('Unable to detect location');
      } finally {
        setLoading(false);
      }
    }

    getLocation();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center px-4 py-2 text-blue-100">
        <span className="animate-pulse">Detecting location...</span>
      </div>
    );
  }

  if (error || !userCountry) {
    return null;
  }

  return (
    <Link 
      href={`/country/${encodeURIComponent(userCountry)}`}
      className="flex items-center px-4 py-2 rounded-md bg-blue-700 text-white hover:bg-blue-600 transition-colors duration-200"
    >
      <span className="mr-2">📍</span>
      <span>My Country: {userCountry}</span>
    </Link>
  );
} 