import { AirportItem, FlightSearchState } from "@/types/flight/types.flight";
import { pad2 } from "@/utils/flightDate";

export const travelerConfig = [
  { key: "adults", label: "Adults", sub: "12 years & above", min: 1, max: 9 },
  { key: "children", label: "Children", sub: "2 to under 12", min: 0, max: 8 },
  { key: "infants", label: "Infants", sub: "Under 2 years", min: 0, max: 4 },
] as const;

export const flightClasses = [
  { label: "Economy", value: "Y" },
  { label: "Premium Economy", value: "S" },
  { label: "Business Class", value: "C" },
  { label: "First Class", value: "F" },
] as const;

export const fares = [
  { label: "Regular Fare", value: "regular" },
  { label: "Student Fare", value: "student" },
  { label: "Umrah Fare", value: "umrah" },
] as const;

export const tripTypes = [
  { label: "One Way", value: "one_way" },
  { label: "Round Trip", value: "round_way" },
  { label: "Multi City", value: "multi_way" },
] as const;

export const childAgeOptions = Array.from({ length: 10 }, (_, index) => index + 2);
const formatApiDate = (date: Date) => {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
};

const getDateAfterDays = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);

  return formatApiDate(date);
};


const defaultDhakaAirport: AirportItem = {
  id: 1,
  country_id: "18",
  country: "BANGLADESH",
  iso: "BD",
  name: "Hazrat Shahjalal International Airport",
  iata_code: "DAC",
  city_id: "58",
  city_name: "Dhaka",
  created_at: "",
  updated_at: "",
};

const defaultCoxBazarAirport: AirportItem = {
  id: 3,
  country_id: "18",
  country: "BANGLADESH",
  iso: "BD",
  name: "Cox's Bazar Airport",
  iata_code: "CXB",
  city_id: "60",
  city_name: "Cox's Bazar",
  created_at: "",
  updated_at: "",
};



export const initialFlightSearchState: FlightSearchState = {
  tripType: "one_way",
  fromDest: defaultDhakaAirport,
  toDest: defaultCoxBazarAirport,
  departureDate: getDateAfterDays(1),
  returnDate: getDateAfterDays(2),
  fareType: "regular",
  cabin: "Y",
  travelers: {
    adults: 1,
    children: 0,
    child_ages: [],
    infants: 0,
  },
  segments: [
    {
      fromDest: defaultDhakaAirport,
      toDest: defaultCoxBazarAirport,
      departureDate: getDateAfterDays(1),
    },
    {
      fromDest: defaultCoxBazarAirport,
      toDest: defaultDhakaAirport,
      departureDate: getDateAfterDays(2),
    },
  ],
};