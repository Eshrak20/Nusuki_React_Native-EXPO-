import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { Search } from "lucide-react-native";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "../../redux/store";
import {
  setFromDest,
  setToDest,
  setDepartureDate,
  setReturnDate,
  updateSegmentAirport,
  updateSegmentDate,
} from "../../redux/features/flightSearchSlice";

import TripTypeSelector from "./TripTypeSelector";
import FlightRouteFields from "./FlightRouteFields";
import MultiCityFields from "./MultiCityFields";
import AirportPickerModal from "./AirportPickerModal";
import FlightDatePickerModal from "./FlightDatePickerModal";
import TravelerCabinModal from "./TravelerCabinModal";

import {
  useGetAirportsQuery,
  useSearchFlightsMutation,
} from "../../redux/api/flightApi";
import { buildFlightSearchPayload } from "../../utils/buildFlightSearchPayload";
import { formatApiDate } from "../../utils/flightDate";
import { sortAirportsByKeyword } from "../../utils/sortAirportsByKeyword";
import type { AirportItem } from "../../types/flight/types.flight";
import TravelerSummaryButton from "./TravelerSummaryButton";
import FareTypeSelector from "./FareTypeSelector";

type AirportField =
  | "from"
  | "to"
  | {
      segmentIndex: number;
      field: "fromDest" | "toDest";
    };

type DateField =
  | "departure"
  | "return"
  | {
      segmentIndex: number;
    };

const todayApi = formatApiDate(new Date());

const FlightSearchForm = () => {
  const dispatch = useDispatch();
  const searchData = useSelector((state: RootState) => state.flightSearch);

  const [airportKeyword, setAirportKeyword] = useState("");
  const [activeAirportField, setActiveAirportField] =
    useState<AirportField | null>(null);
  const [activeDateField, setActiveDateField] = useState<DateField | null>(
    null,
  );
  const [isTravelerModalOpen, setIsTravelerModalOpen] = useState(false);

  const { data: airportResponse, isFetching: airportsFetching } =
    useGetAirportsQuery({
      page: 1,
      size: 20,
      keyword: airportKeyword,
    });

  const airports = useMemo(
    () =>
      sortAirportsByKeyword(airportResponse?.data?.data ?? [], airportKeyword),
    [airportResponse, airportKeyword],
  );

  const [searchFlights, searchFlightsState] = useSearchFlightsMutation();

  const openAirportPicker = (field: AirportField) => {
    setAirportKeyword("");
    setActiveAirportField(field);
  };

  const handleSelectAirport = (airport: AirportItem) => {
    if (!activeAirportField) return;

    if (activeAirportField === "from") {
      dispatch(setFromDest(airport));
    } else if (activeAirportField === "to") {
      dispatch(setToDest(airport));
    } else {
      dispatch(
        updateSegmentAirport({
          index: activeAirportField.segmentIndex,
          field: activeAirportField.field,
          airport,
        }),
      );
    }

    setActiveAirportField(null);
  };

  const handleSelectDate = (date: string) => {
    if (!activeDateField) return;

    if (activeDateField === "departure") {
      dispatch(setDepartureDate(date));
    } else if (activeDateField === "return") {
      dispatch(setReturnDate(date));
    } else {
      dispatch(
        updateSegmentDate({
          index: activeDateField.segmentIndex,
          departureDate: date,
        }),
      );
    }

    setActiveDateField(null);
  };

  const getSelectedDateForPicker = () => {
    if (activeDateField === "departure") return searchData.departureDate;
    if (activeDateField === "return") return searchData.returnDate;

    if (activeDateField && typeof activeDateField === "object") {
      return (
        searchData.segments[activeDateField.segmentIndex]?.departureDate ?? ""
      );
    }

    return "";
  };

  const getMinDateForPicker = () => {
    if (activeDateField === "return")
      return searchData.departureDate || todayApi;

    if (activeDateField && typeof activeDateField === "object") {
      const previousSegment =
        searchData.segments[activeDateField.segmentIndex - 1];

      return previousSegment?.departureDate || todayApi;
    }

    return todayApi;
  };

  const validateSearch = () => {
    if (searchData.tripType === "multi_way") {
      const incompleteIndex = searchData.segments.findIndex(
        (segment) =>
          !segment.fromDest || !segment.toDest || !segment.departureDate,
      );

      if (incompleteIndex !== -1) {
        Alert.alert(
          "Incomplete Flight Information",
          `Flight #${incompleteIndex + 1} is missing route or date.`,
        );
        return false;
      }

      return true;
    }

    if (!searchData.fromDest || !searchData.toDest) {
      Alert.alert("Where are you flying?", "Please select both airports.");
      return false;
    }

    if (!searchData.departureDate) {
      Alert.alert("Departure date missing", "Please select departure date.");
      return false;
    }

    if (searchData.tripType === "round_way" && !searchData.returnDate) {
      Alert.alert("Return date missing", "Please select return date.");
      return false;
    }

    return true;
  };

  const handleSearch = async () => {
    if (!validateSearch()) return;

    const payload = buildFlightSearchPayload({
      searchData,
      page: 1,
      size: 20,
    });

    console.log("FLIGHT_SEARCH_PAYLOAD", payload);

    try {
      const response = await searchFlights(payload).unwrap();
      console.log("FLIGHT_SEARCH_RESPONSE", response);

      router.push({
        pathname: "/flight/tickets",
        params: {
          tripType: searchData.tripType,
        },
      });
    } catch (error) {
      console.log("FLIGHT_SEARCH_ERROR", error);
      Alert.alert("Search failed", "Please try again.");
    }
  };

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="px-4 py-5 pb-32"
      >
        <TripTypeSelector />

        <TravelerSummaryButton onPress={() => setIsTravelerModalOpen(true)} />

        <FareTypeSelector />

        {searchData.tripType === "multi_way" ? (
          <MultiCityFields
            onOpenAirport={openAirportPicker}
            onOpenDate={(index) => setActiveDateField({ segmentIndex: index })}
          />
        ) : (
          <FlightRouteFields
            onOpenAirport={openAirportPicker}
            onOpenDepartureDate={() => setActiveDateField("departure")}
            onOpenReturnDate={() => setActiveDateField("return")}
          />
        )}

        <TouchableOpacity
          disabled={searchFlightsState.isLoading}
          activeOpacity={0.85}
          onPress={handleSearch}
          className="mt-2 flex-row items-center justify-center rounded-3xl bg-primary py-4 shadow-sm"
        >
          {searchFlightsState.isLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Search size={21} color="#FFFFFF" />
          )}

          <Text className="ml-2 text-base font-extrabold text-white">
            Search Flights
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <AirportPickerModal
        visible={Boolean(activeAirportField)}
        title="Select Airport"
        keyword={airportKeyword}
        airports={airports}
        isLoading={airportsFetching}
        onChangeKeyword={setAirportKeyword}
        onSelect={handleSelectAirport}
        onClose={() => setActiveAirportField(null)}
      />

      <FlightDatePickerModal
        visible={Boolean(activeDateField)}
        title="Select Date"
        subtitle={
          searchData.tripType === "round_way"
            ? "Return date cannot be before departure"
            : undefined
        }
        selectedDate={getSelectedDateForPicker()}
        minDate={getMinDateForPicker()}
        onSelect={handleSelectDate}
        onClose={() => setActiveDateField(null)}
      />

      <TravelerCabinModal
        visible={isTravelerModalOpen}
        onClose={() => setIsTravelerModalOpen(false)}
      />
    </>
  );
};

export default FlightSearchForm;
