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
  {
    country: "United Kingdom",
    canTravelTo: 187,
    canTravelFrom: 189
  },
  {
    country: "Germany",
    canTravelTo: 190,
    canTravelFrom: 192
  },
  {
    country: "France",
    canTravelTo: 188,
    canTravelFrom: 190
  },
  {
    country: "Spain",
    canTravelTo: 189,
    canTravelFrom: 191
  },
  {
    country: "Italy",
    canTravelTo: 188,
    canTravelFrom: 190
  },
  {
    country: "Japan",
    canTravelTo: 191,
    canTravelFrom: 193
  },
  {
    country: "South Korea",
    canTravelTo: 189,
    canTravelFrom: 191
  },
  {
    country: "Singapore",
    canTravelTo: 192,
    canTravelFrom: 194
  },
  // Add more countries as needed
]; 