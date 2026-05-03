import { FlightSearchState } from "@/types/flight/types.flight";

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

export const initialFlightSearchState: FlightSearchState = {
  tripType: "round_way",
  fromDest: null,
  toDest: null,
  departureDate: "",
  returnDate: "",
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
      fromDest: null,
      toDest: null,
      departureDate: "",
    },
    {
      fromDest: null,
      toDest: null,
      departureDate: "",
    },
  ],
};