import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { X } from "lucide-react-native";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import type { FlightSearchFiltersResponse } from "../../types/flight/types.flightResults";
import {
  resetFlightTicketFilters,
  toggleAircraft,
  toggleAirline,
  toggleLayoverCity,
  toggleRefundability,
  toggleSchedule,
  toggleStop,
} from "../../redux/features/flightTicketSlice";
import FlightFilterOption from "./FlightFilterOption";

type FlightFilterDrawerProps = {
  visible: boolean;
  filters?: FlightSearchFiltersResponse;
  onClose: () => void;
};

const FlightFilterDrawer = ({
  visible,
  filters,
  onClose,
}: FlightFilterDrawerProps) => {
  const dispatch = useDispatch();
  const selectedFilters = useSelector(
    (state: RootState) => state.flightTicket.filters,
  );

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 flex-row bg-black/40">
        <Pressable className="flex-1" onPress={onClose} />

        <View className="h-full w-[86%] rounded-l-3xl bg-white">
          <View className="flex-row items-center justify-between border-b border-gray-100 px-5 py-4">
            <View className="mt-4">
              <Text className="text-lg font-extrabold text-gray-900">
                All Filters
              </Text>
              
              <Text className="text-xs text-gray-500">
                Filter your flight results
              </Text>
            </View>

            <TouchableOpacity
              onPress={onClose}
              className="h-9 w-9 items-center justify-center rounded-full bg-gray-100"
            >
              <X size={20} color="#111827" />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerClassName="px-5 py-4 pb-32"
          >
            <Text className="mb-3 text-base font-extrabold text-gray-900">
              Refundability
            </Text>

            {(filters?.refundability ?? []).map((item) => (
              <FlightFilterOption
                key={String(item.value)}
                label={item.label}
                count={item.count}
                active={selectedFilters.refundability.includes(String(item.value))}
                onPress={() => dispatch(toggleRefundability(String(item.value)))}
              />
            ))}

            <Text className="mb-3 mt-5 text-base font-extrabold text-gray-900">
              Stops
            </Text>

            {(filters?.stops ?? []).map((item) => (
              <FlightFilterOption
                key={String(item.value)}
                label={item.label}
                count={item.count}
                active={selectedFilters.stops.includes(Number(item.value))}
                onPress={() => dispatch(toggleStop(Number(item.value)))}
              />
            ))}

            <Text className="mb-3 mt-5 text-base font-extrabold text-gray-900">
              Airlines
            </Text>

            {(filters?.airlines ?? []).map((item) => (
              <FlightFilterOption
                key={item.code}
                label={item.name}
                count={item.count}
                active={selectedFilters.airlines.includes(item.code)}
                onPress={() => dispatch(toggleAirline(item.code))}
              />
            ))}

            <Text className="mb-3 mt-5 text-base font-extrabold text-gray-900">
              Layover Cities
            </Text>

            {(filters?.layover_cities ?? []).map((item) => (
              <FlightFilterOption
                key={item.airport}
                label={item.label}
                count={item.count}
                active={selectedFilters.layover_cities.includes(item.airport)}
                onPress={() => dispatch(toggleLayoverCity(item.airport))}
              />
            ))}

            <Text className="mb-3 mt-5 text-base font-extrabold text-gray-900">
              Departure Time
            </Text>

            {(filters?.flight_schedules?.departure ?? []).map((item) => (
              <FlightFilterOption
                key={`departure-${item.value}`}
                label={item.label}
                count={item.count}
                active={selectedFilters.flight_schedules.departure.includes(
                  item.value,
                )}
                onPress={() =>
                  dispatch(
                    toggleSchedule({
                      type: "departure",
                      value: item.value,
                    }),
                  )
                }
              />
            ))}

            <Text className="mb-3 mt-5 text-base font-extrabold text-gray-900">
              Arrival Time
            </Text>

            {(filters?.flight_schedules?.arrival ?? []).map((item) => (
              <FlightFilterOption
                key={`arrival-${item.value}`}
                label={item.label}
                count={item.count}
                active={selectedFilters.flight_schedules.arrival.includes(
                  item.value,
                )}
                onPress={() =>
                  dispatch(
                    toggleSchedule({
                      type: "arrival",
                      value: item.value,
                    }),
                  )
                }
              />
            ))}

            <Text className="mb-3 mt-5 text-base font-extrabold text-gray-900">
              Aircraft
            </Text>

            {(filters?.aircraft ?? []).map((item) => (
              <FlightFilterOption
                key={item.code}
                label={`${item.name} (${item.code})`}
                count={item.count}
                active={selectedFilters.aircraft.includes(item.code)}
                onPress={() => dispatch(toggleAircraft(item.code))}
              />
            ))}
          </ScrollView>

          {/* <View className="absolute bottom-14 left-0 right-0 flex-row gap-3 border-t border-gray-100 bg-white px-5 py-4">
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => dispatch(resetFlightTicketFilters())}
              className="flex-1 rounded-2xl border border-primary py-3"
            >
              <Text className="text-center font-extrabold text-primary">
                Clear
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={onClose}
              className="flex-1 rounded-2xl bg-primary py-3"
            >
              <Text className="text-center font-extrabold text-white">
                Apply
              </Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </View>
    </Modal>
  );
};

export default FlightFilterDrawer;