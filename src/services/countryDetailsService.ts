interface RESTCountryDetails {
  name: {
    common: string;
    official: string;
    nativeName: { [key: string]: { official: string; common: string } };
  };
  capital: string[];
  region: string;
  subregion: string;
  languages: { [key: string]: string };
  currencies: { [key: string]: { name: string; symbol: string } };
  population: number;
  area: number;
  timezones: string[];
  continents: string[];
  flags: {
    png: string;
    svg: string;
  };
  coatOfArms: {
    png: string;
    svg: string;
  };
  borders: string[];
  independent: boolean;
  unMember: boolean;
  startOfWeek: string;
  car: {
    signs: string[];
    side: string;
  };
  maps: {
    googleMaps: string;
    openStreetMaps: string;
  };
  idd: {
    root: string;
    suffixes: string[];
  };
  demonyms: {
    eng: { f: string; m: string };
  };
  gini: { [key: string]: number };
  tld: string[];
  cca2: string;
  cca3: string;
  fifa: string;
  capitalInfo: {
    latlng: number[];
  };
}

export async function fetchCountryDetails(countryName: string): Promise<RESTCountryDetails | null> {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}?fullText=true`);
    if (!response.ok) {
      throw new Error('Country not found');
    }
    const data = await response.json();
    return data[0] || null;
  } catch (error) {
    console.error('Error fetching country details:', error);
    return null;
  }
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat().format(num);
}

export function formatArea(area: number): string {
  return `${formatNumber(area)} km²`;
}

export function getLanguages(languages: { [key: string]: string }): string {
  return Object.values(languages).join(', ');
}

export function getCurrencies(currencies: { [key: string]: { name: string; symbol: string } }): string {
  return Object.values(currencies)
    .map(curr => `${curr.name} (${curr.symbol})`)
    .join(', ');
}

export function getDemonyms(demonyms: { eng: { f: string; m: string } }): string {
  return `${demonyms.eng.m} (m), ${demonyms.eng.f} (f)`;
}

export function getGiniIndex(gini: { [key: string]: number }): string {
  if (!gini || Object.keys(gini).length === 0) return 'N/A';
  const latestYear = Math.max(...Object.keys(gini).map(Number));
  return `${gini[latestYear]} (${latestYear})`;
}

export function getPhoneCode(idd: { root: string; suffixes: string[] }): string {
  if (!idd.root || !idd.suffixes?.length) return 'N/A';
  return `${idd.root}${idd.suffixes[0]}`;
}

export function getCapitalCoordinates(capitalInfo: { latlng: number[] }): string {
  if (!capitalInfo?.latlng) return 'N/A';
  const [lat, lng] = capitalInfo.latlng;
  return `${lat.toFixed(2)}°${lat >= 0 ? 'N' : 'S'}, ${lng.toFixed(2)}°${lng >= 0 ? 'E' : 'W'}`;
}

export function getDrivingSide(side: string): string {
  return `${side.charAt(0).toUpperCase() + side.slice(1)} side`;
}

export function getWeekStart(startOfWeek: string): string {
  return startOfWeek.charAt(0).toUpperCase() + startOfWeek.slice(1);
}

export function getCountryStatus(independent: boolean, unMember: boolean): string {
  const status = [];
  if (independent) status.push('Independent State');
  if (unMember) status.push('UN Member');
  return status.length ? status.join(', ') : 'Dependent Territory';
}

export function getCarSigns(signs: string[]): string {
  return signs.join(', ') || 'N/A';
}

export function getTopLevelDomains(tld: string[]): string {
  return tld.join(', ') || 'N/A';
}

export function getCountryCodes(cca2: string, cca3: string, fifa?: string): string {
  const codes = [`ISO 2: ${cca2}`, `ISO 3: ${cca3}`];
  if (fifa) codes.push(`FIFA: ${fifa}`);
  return codes.join(' | ');
}

export function formatTimezones(timezones: string[]): string {
  return timezones.map(tz => {
    // Convert UTC offset format
    if (tz.startsWith('UTC')) {
      const offset = tz.replace('UTC', '');
      if (!offset) return 'GMT';
      return `GMT${offset}`;
    }
    return tz;
  }).join(', ');
}

export function getBorderingCountries(borders: string[]): string[] {
  if (!borders || borders.length === 0) return [];
  return borders;
}

export function getMapLinks(maps: { googleMaps: string; openStreetMaps: string }): {
  google: string;
  openStreet: string;
} {
  return {
    google: maps.googleMaps,
    openStreet: maps.openStreetMaps
  };
} 