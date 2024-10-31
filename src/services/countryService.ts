interface RESTCountry {
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
}

export async function fetchAllCountries(): Promise<RESTCountry[]> {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all?fields=name,capital,region,subregion,languages,currencies,population,area,timezones,continents,flags,coatOfArms,borders,independent,unMember,startOfWeek,car,maps,idd');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    return [];
  }
}

export function mergeCountryData(restCountries: RESTCountry[], passportData: any[]) {
  return restCountries.map(restCountry => {
    const passportInfo = passportData.find(
      p => p.country.toLowerCase() === restCountry.name.common.toLowerCase()
    ) || {
      canTravelTo: 50,
      canTravelFrom: 47
    };

    // Get the first native name if available
    const nativeNameKey = Object.keys(restCountry.name.nativeName || {})[0];
    const nativeName = nativeNameKey 
      ? restCountry.name.nativeName[nativeNameKey].official 
      : restCountry.name.official;

    // Format phone code
    const phoneCode = restCountry.idd.root && restCountry.idd.suffixes?.[0]
      ? `${restCountry.idd.root}${restCountry.idd.suffixes[0]}`
      : 'N/A';

    return {
      country: restCountry.name.common,
      officialName: restCountry.name.official,
      nativeName,
      region: restCountry.region,
      subregion: restCountry.subregion,
      capital: restCountry.capital?.[0] || 'N/A',
      languages: Object.values(restCountry.languages || {}).join(', '),
      currencies: Object.values(restCountry.currencies || {})
        .map(curr => `${curr.name} (${curr.symbol})`)
        .join(', '),
      population: restCountry.population,
      area: restCountry.area,
      timezones: restCountry.timezones,
      continents: restCountry.continents,
      flag: restCountry.flags.svg,
      coatOfArms: restCountry.coatOfArms.svg,
      borders: restCountry.borders || [],
      independent: restCountry.independent,
      unMember: restCountry.unMember,
      startOfWeek: restCountry.startOfWeek,
      drivingSide: restCountry.car.side,
      carSigns: restCountry.car.signs,
      maps: {
        google: restCountry.maps.googleMaps,
        openStreet: restCountry.maps.openStreetMaps
      },
      phoneCode,
      canTravelTo: passportInfo.canTravelTo,
      canTravelFrom: passportInfo.canTravelFrom
    };
  });
}

export function formatPopulation(num: number): string {
  if (num >= 1000000000) {
    return `${(num / 1000000000).toFixed(1)}B`;
  }
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}

export function formatArea(area: number): string {
  return `${new Intl.NumberFormat().format(area)} km²`;
}

export function getDrivingSideEmoji(side: string): string {
  return side === 'right' ? '➡️' : '⬅️';
}

export function getIndependenceStatus(independent: boolean): string {
  return independent ? '🏛️ Independent State' : '🔄 Dependent Territory';
}

export function getUNStatus(unMember: boolean): string {
  return unMember ? '🇺🇳 UN Member' : '❌ Not UN Member';
} 