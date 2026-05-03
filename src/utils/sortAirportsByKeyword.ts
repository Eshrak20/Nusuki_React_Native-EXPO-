import type { AirportItem } from "../types/flight/types.flight";

const normalize = (value: string) => value.trim().toLowerCase();

export const sortAirportsByKeyword = (airports: AirportItem[], keyword: string) => {
  const search = normalize(keyword);

  if (!search) return airports;

  return [...airports].sort((a, b) => {
    const score = (airport: AirportItem) => {
      const code = normalize(airport.iata_code);
      const city = normalize(airport.city_name);
      const name = normalize(airport.name);
      const country = normalize(airport.country);

      if (code === search) return 100;
      if (city === search) return 90;
      if (code.startsWith(search)) return 80;
      if (city.startsWith(search)) return 70;
      if (name.startsWith(search)) return 60;
      if (country.startsWith(search)) return 50;
      if (city.includes(search)) return 40;
      if (name.includes(search)) return 30;
      if (country.includes(search)) return 20;

      return 0;
    };

    return score(b) - score(a);
  });
};