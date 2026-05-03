import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Minus, Plus, User, X } from "lucide-react-native";
import { useDispatch, useSelector } from "react-redux";

import {
  childAgeOptions,
  flightClasses,
  travelerConfig,
} from "../../data/flightConfig";
import type { RootState } from "../../redux/store";
import {
  setCabin,
  updateChildAge,
  updateTravelerCount,
} from "../../redux/features/flightSearchSlice";

type TravelerCabinModalProps = {
  visible: boolean;
  onClose: () => void;
};

const TravelerCabinModal = ({ visible, onClose }: TravelerCabinModalProps) => {
  const dispatch = useDispatch();

  const travelers = useSelector(
    (state: RootState) => state.flightSearch.travelers,
  );
  const cabin = useSelector((state: RootState) => state.flightSearch.cabin);
  const fareType = useSelector(
    (state: RootState) => state.flightSearch.fareType,
  );

  const totalTravelers =
    travelers.adults + travelers.children + travelers.infants;

  const isStudentFare = fareType === "student";

  const handleUpdateCount = (
    key: "adults" | "children" | "infants",
    nextValue: number,
  ) => {
    dispatch(
      updateTravelerCount({
        key,
        value: nextValue,
      }),
    );
  };

  const handleUpdateChildAge = (index: number, age: number) => {
    dispatch(
      updateChildAge({
        index,
        age,
      }),
    );
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 bg-white">
        <View className="bg-primary px-4 pb-4 pt-12">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-lg font-extrabold text-white">
                {totalTravelers} Travellers
              </Text>

              <Text className="text-xs text-white/80">
                Choose traveller and cabin
              </Text>
            </View>

            <TouchableOpacity onPress={onClose}>
              <X size={26} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView contentContainerClassName="px-4 py-5 pb-32">
          <Text className="text-base font-extrabold text-gray-900">
            Traveller&apos;s
          </Text>

          <Text className="mb-5 text-xs text-gray-500">
            Choose person to join you on your journey
          </Text>

          {travelerConfig.map((config) => {
            const value = travelers[config.key];

            const isDisabledByFare =
              isStudentFare &&
              (config.key === "children" || config.key === "infants");

            const isDecreaseDisabled = isDisabledByFare || value <= config.min;

            const isIncreaseDisabled =
              isDisabledByFare || totalTravelers >= 9 || value >= config.max;

            return (
              <View key={config.key} className="mb-5 flex-row items-center">
                <View className="h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                  <User size={18} color="#6B7280" />
                </View>

                <View className="ml-3 flex-1">
                  <Text className="text-base font-bold text-gray-800">
                    {config.label}
                  </Text>

                  <Text className="text-xs text-gray-500">{config.sub}</Text>
                </View>

                <TouchableOpacity
                  disabled={isDecreaseDisabled}
                  onPress={() => handleUpdateCount(config.key, value - 1)}
                  className={`h-9 w-9 items-center justify-center rounded-full border ${
                    isDecreaseDisabled ? "border-gray-200" : "border-primary"
                  }`}
                >
                  <Minus
                    size={18}
                    color={isDecreaseDisabled ? "#CBD5E1" : "#13275F"}
                  />
                </TouchableOpacity>

                <Text className="mx-4 text-lg font-extrabold text-gray-900">
                  {value}
                </Text>

                <TouchableOpacity
                  disabled={isIncreaseDisabled}
                  onPress={() => handleUpdateCount(config.key, value + 1)}
                  className={`h-9 w-9 items-center justify-center rounded-full ${
                    isIncreaseDisabled ? "bg-gray-100" : "bg-primary"
                  }`}
                >
                  <Plus
                    size={18}
                    color={isIncreaseDisabled ? "#CBD5E1" : "#FFFFFF"}
                  />
                </TouchableOpacity>
              </View>
            );
          })}

          {isStudentFare ? (
            <View className="mb-5 rounded-2xl bg-amber-50 p-3">
              <Text className="text-xs font-bold text-amber-700">
                Student fare allows adults only. Children and infants are
                disabled.
              </Text>
            </View>
          ) : null}

          {!isStudentFare && travelers.children > 0 ? (
            <View className="mb-6 rounded-3xl bg-gray-50 p-4">
              <Text className="mb-3 text-sm font-extrabold text-gray-900">
                Child Ages
              </Text>

              <View className="flex-row flex-wrap gap-3">
                {travelers.child_ages.map((age, index) => (
                  <View key={index} className="w-[47%]">
                    <Text className="mb-2 text-xs font-semibold text-gray-500">
                      Child {index + 1} Age
                    </Text>

                    <View className="flex-row flex-wrap gap-2">
                      {childAgeOptions.map((option) => {
                        const isActive = age === option;

                        return (
                          <TouchableOpacity
                            key={option}
                            onPress={() => handleUpdateChildAge(index, option)}
                            className={`h-9 w-9 items-center justify-center rounded-full ${
                              isActive ? "bg-primary" : "bg-white"
                            }`}
                          >
                            <Text
                              className={`text-xs font-bold ${
                                isActive ? "text-white" : "text-gray-700"
                              }`}
                            >
                              {option}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>
                ))}
              </View>
            </View>
          ) : null}

          <View className="border-t border-gray-100 pt-5">
            <Text className="text-base font-extrabold text-gray-900">
              Cabin Class
            </Text>

            <Text className="mb-4 text-xs text-gray-500">
              Choose your cabin category
            </Text>

            {flightClasses.map((flightClass) => {
              const isActive = cabin === flightClass.value;

              return (
                <TouchableOpacity
                  key={flightClass.value}
                  onPress={() => dispatch(setCabin(flightClass.value))}
                  className="mb-4 flex-row items-center"
                >
                  <View
                    className={`mr-3 h-5 w-5 items-center justify-center rounded-full border ${
                      isActive ? "border-primary" : "border-gray-300"
                    }`}
                  >
                    {isActive ? (
                      <View className="h-3 w-3 rounded-full bg-primary" />
                    ) : null}
                  </View>

                  <Text className="font-semibold text-gray-700">
                    {flightClass.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        <View className="absolute bottom-0 left-0 right-0 bg-white px-4 py-4">
          <TouchableOpacity
            onPress={onClose}
            className="rounded-2xl bg-primary py-4"
          >
            <Text className="text-center font-extrabold text-white">Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default TravelerCabinModal;
