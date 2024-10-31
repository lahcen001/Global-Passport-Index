export interface PassportDataEntry {
  country: string;
  canTravelTo: number;
  canTravelFrom: number;
}

export const passportData: PassportDataEntry[] = [
  {
    country: "United States",
    canTravelTo: 172,
    canTravelFrom: 186
  },
  // Add more countries as needed
]; 