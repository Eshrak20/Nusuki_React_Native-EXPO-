import type { FlightTicketFilters } from "../redux/features/flightTicketSlice";
import type {
  FlightResultItem,
  FlightSearchApiResponse,
  ScheduleFilterOption,
  SortBy,
  SortOrder,
} from "../types/flight/types.flightResults";

const normalizeText = (value: unknown): string =>
  String(value ?? "").trim().toLowerCase();

const normalizeCode = (value: unknown): string =>
  String(value ?? "").trim().toUpperCase();

const normalizeToken = (value: unknown): string =>
  String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ");

const safeDateMs = (value?: string | null): number | null => {
  if (!value) return null;

  const ms = new Date(value).getTime();

  return Number.isNaN(ms) ? null : ms;
};

export const buildSearchResetKey = (payload: unknown) => {
  return JSON.stringify(payload);
};

export const extractFlights = (
  response?: FlightSearchApiResponse,
): FlightResultItem[] => {
  return response?.data?.flights ?? [];
};

export const getFlightDepartureRaw = (
  flight: FlightResultItem,
): string | null | undefined => {
  return flight.summary?.departure_at || flight.segments?.[0]?.departure_at;
};

const getFlightArrivalRaw = (
  flight: FlightResultItem,
): string | null | undefined => {
  return (
    flight.summary?.arrival_at ||
    flight.segments?.[flight.segments.length - 1]?.arrival_at
  );
};

const getFlightPrice = (flight: FlightResultItem): number => {
  return flight.pricing?.total ?? 0;
};

const getFlightDuration = (flight: FlightResultItem): number => {
  return flight.summary?.duration_minutes ?? 0;
};

const getFlightStopCount = (flight: FlightResultItem): number => {
  return flight.summary?.stops ?? Math.max((flight.segments?.length ?? 1) - 1, 0);
};

const getFlightRefundabilityValues = (flight: FlightResultItem): string[] => {
  const values = new Set<string>();

  if (flight.fare?.refundable === true) {
    values.add("refundable");
    values.add("refund");
    values.add("yes");
    values.add("true");
  } else {
    values.add("non refundable");
    values.add("non_refundable");
    values.add("non-refundable");
    values.add("not refundable");
    values.add("false");
    values.add("no");
  }

  return Array.from(values).map(normalizeToken);
};

const getFlightAirlineCodes = (flight: FlightResultItem): string[] => {
  const codes = new Set<string>();

  if (flight.airline?.code) {
    codes.add(normalizeCode(flight.airline.code));
  }

  flight.segments?.forEach((segment) => {
    if (segment.airline?.code) {
      codes.add(normalizeCode(segment.airline.code));
    }
  });

  return Array.from(codes);
};

const getFlightAircraftValues = (flight: FlightResultItem): string[] => {
  const values = new Set<string>();

  flight.segments?.forEach((segment) => {
    if (segment.aircraft?.code) values.add(normalizeText(segment.aircraft.code));
    if (segment.aircraft?.name) values.add(normalizeText(segment.aircraft.name));
  });

  return Array.from(values);
};

const getFlightLayoverCities = (flight: FlightResultItem): string[] => {
  const values = new Set<string>();

  const segments = flight.segments ?? [];

  for (let index = 0; index < segments.length - 1; index += 1) {
    const stop = segments[index]?.destination;

    if (stop?.airport) values.add(normalizeText(stop.airport));
    if (stop?.airport_name) values.add(normalizeText(stop.airport_name));
    if (stop?.city) values.add(normalizeText(stop.city));
    if (stop?.city_name) values.add(normalizeText(stop.city_name));
  }

  flight.journeys?.forEach((journey, index, journeys) => {
    if (index >= journeys.length - 1) return;

    const stop = journey.summary?.destination;

    if (stop?.airport) values.add(normalizeText(stop.airport));
    if (stop?.airport_name) values.add(normalizeText(stop.airport_name));
    if (stop?.city) values.add(normalizeText(stop.city));
    if (stop?.city_name) values.add(normalizeText(stop.city_name));
  });

  return Array.from(values);
};

const getFlightLayoverDuration = (flight: FlightResultItem): number => {
  const segments = flight.segments ?? [];
  const layovers: number[] = [];

  for (let index = 0; index < segments.length - 1; index += 1) {
    const currentArrival = safeDateMs(segments[index]?.arrival_at);
    const nextDeparture = safeDateMs(segments[index + 1]?.departure_at);

    if (currentArrival !== null && nextDeparture !== null && nextDeparture > currentArrival) {
      layovers.push(Math.round((nextDeparture - currentArrival) / 60000));
    }
  }

  if (layovers.length > 0) return Math.max(...layovers);

  return 0;
};

export const isTimeInSlotByHours = (
  dateTime: string,
  start: number,
  end: number,
): boolean => {
  const date = new Date(dateTime);

  if (!Number.isNaN(date.getTime())) {
    const hour = date.getHours();
    return hour >= start && hour < end;
  }

  const timeMatch = String(dateTime).match(/(\d{1,2}):(\d{2})/);
  if (!timeMatch) return false;

  const hour = Number(timeMatch[1]);

  return hour >= start && hour < end;
};

const matchesScheduleSlots = (
  flight: FlightResultItem,
  slots: string[],
  type: "departure" | "arrival",
): boolean => {
  if (!slots.length) return true;

  const dateTime =
    type === "departure" ? getFlightDepartureRaw(flight) : getFlightArrivalRaw(flight);

  if (!dateTime) return false;

  return slots.some((slot) => {
    const [startText, endText] = slot.split("-");
    const start = Number(startText);
    const end = Number(endText);

    if (Number.isNaN(start) || Number.isNaN(end)) return false;

    return isTimeInSlotByHours(dateTime, start, end);
  });
};

export const getClientFilteredFlights = ({
  flights,
  filters,
  selectedAirlineCode,
}: {
  flights: FlightResultItem[];
  filters: FlightTicketFilters;
  selectedAirlineCode?: string | null;
}): FlightResultItem[] => {
  return flights.filter((flight) => {
    const airlineCodes = getFlightAirlineCodes(flight);
    const aircraftValues = getFlightAircraftValues(flight);
    const layoverCities = getFlightLayoverCities(flight);
    const refundabilityValues = getFlightRefundabilityValues(flight);

    const price = getFlightPrice(flight);
    const stopCount = getFlightStopCount(flight);
    const layoverDuration = getFlightLayoverDuration(flight);

    const matchSelectedAirline =
      !selectedAirlineCode ||
      airlineCodes.includes(normalizeCode(selectedAirlineCode));

    const matchAirlines =
      filters.airlines.length === 0 ||
      filters.airlines.some((code) =>
        airlineCodes.includes(normalizeCode(code)),
      );

    const matchStops =
      filters.stops.length === 0 || filters.stops.includes(stopCount);

    const matchRefundability =
      filters.refundability.length === 0 ||
      filters.refundability.some((item) =>
        refundabilityValues.includes(normalizeToken(item)),
      );

    const matchAircraft =
      filters.aircraft.length === 0 ||
      filters.aircraft.some((item) =>
        aircraftValues.includes(normalizeText(item)),
      );

    const matchLayoverCities =
      filters.layover_cities.length === 0 ||
      filters.layover_cities.some((item) =>
        layoverCities.includes(normalizeText(item)),
      );

    const matchPriceMin =
      filters.price_min === null || price >= filters.price_min;

    const matchPriceMax =
      filters.price_max === null || price <= filters.price_max;

    const matchLayoverMin =
      filters.layover_duration_min === null ||
      layoverDuration >= filters.layover_duration_min;

    const matchLayoverMax =
      filters.layover_duration_max === null ||
      layoverDuration <= filters.layover_duration_max;

    const matchDepartureSchedule = matchesScheduleSlots(
      flight,
      filters.flight_schedules.departure,
      "departure",
    );

    const matchArrivalSchedule = matchesScheduleSlots(
      flight,
      filters.flight_schedules.arrival,
      "arrival",
    );

    return (
      matchSelectedAirline &&
      matchAirlines &&
      matchStops &&
      matchRefundability &&
      matchAircraft &&
      matchLayoverCities &&
      matchPriceMin &&
      matchPriceMax &&
      matchLayoverMin &&
      matchLayoverMax &&
      matchDepartureSchedule &&
      matchArrivalSchedule
    );
  });
};

export const sortFlightsClientSide = ({
  flights,
  sortBy,
  sortOrder,
}: {
  flights: FlightResultItem[];
  sortBy: SortBy;
  sortOrder: SortOrder;
}): FlightResultItem[] => {
  const sorted = [...flights];

  sorted.sort((a, b) => {
    let aValue = 0;
    let bValue = 0;

    if (sortBy === "price") {
      aValue = getFlightPrice(a);
      bValue = getFlightPrice(b);
    } else if (sortBy === "duration") {
      aValue = getFlightDuration(a);
      bValue = getFlightDuration(b);
    } else {
      const aTime = getFlightDepartureRaw(a);
      const bTime = getFlightDepartureRaw(b);

      aValue = aTime ? new Date(aTime).getTime() : 0;
      bValue = bTime ? new Date(bTime).getTime() : 0;
    }

    return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
  });

  return sorted;
};

export const getScheduleSlots = (
  response?: FlightSearchApiResponse,
): ScheduleFilterOption[] => {
  const filters = response?.data?.filters;
  const departure = filters?.flight_schedules?.departure ?? [];
  const arrival = filters?.flight_schedules?.arrival ?? [];

  return departure.length ? departure : arrival;
};