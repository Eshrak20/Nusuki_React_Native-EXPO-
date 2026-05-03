import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { X } from "lucide-react-native";
import {
  formatApiDate,
  getCalendarDays,
  getMonthTitle,
  getNextMonths,
  isBeforeDay,
} from "../../utils/flightDate";

type FlightDatePickerModalProps = {
  visible: boolean;
  title: string;
  subtitle?: string;
  selectedDate: string;
  minDate?: string;
  onSelect: (date: string) => void;
  onClose: () => void;
};

const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const FlightDatePickerModal = ({
  visible,
  title,
  subtitle,
  selectedDate,
  minDate,
  onSelect,
  onClose,
}: FlightDatePickerModalProps) => {
  const today = new Date();
  const minimumDate = minDate ? new Date(`${minDate}T00:00:00`) : today;
  const months = getNextMonths(4);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 bg-white">
        <View className="bg-primary px-4 pb-4 pt-12">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-lg font-extrabold text-white">{title}</Text>
              {subtitle ? (
                <Text className="mt-0.5 text-xs font-medium text-white/80">
                  {subtitle}
                </Text>
              ) : null}
            </View>

            <TouchableOpacity onPress={onClose}>
              <X size={26} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerClassName="px-6 py-5 pb-32"
        >
          {months.map((month) => {
            const days = getCalendarDays(month);

            return (
              <View key={month.toISOString()} className="mb-8">
                <Text className="mb-5 text-center text-base font-extrabold text-gray-900">
                  {getMonthTitle(month)}
                </Text>

                <View className="mb-3 flex-row">
                  {weekDays.map((day) => (
                    <Text
                      key={day}
                      className="flex-1 text-center text-xs font-bold text-gray-400"
                    >
                      {day}
                    </Text>
                  ))}
                </View>

                <View className="flex-row flex-wrap">
                  {days.map((date, index) => {
                    if (!date) {
                      return <View key={`blank-${index}`} className="h-11 w-[14.285%]" />;
                    }

                    const apiDate = formatApiDate(date);
                    const isSelected = selectedDate === apiDate;
                    const isDisabled = isBeforeDay(date, minimumDate);

                    return (
                      <TouchableOpacity
                        key={apiDate}
                        disabled={isDisabled}
                        activeOpacity={0.85}
                        onPress={() => {
                          onSelect(apiDate);
                          onClose();
                        }}
                        className="h-11 w-[14.285%] items-center justify-center"
                      >
                        <View
                          className={`h-10 w-10 items-center justify-center rounded-full ${
                            isSelected ? "bg-primary" : "bg-transparent"
                          }`}
                        >
                          <Text
                            className={`text-sm font-semibold ${
                              isDisabled
                                ? "text-gray-300"
                                : isSelected
                                  ? "text-white"
                                  : "text-gray-800"
                            }`}
                          >
                            {date.getDate()}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default FlightDatePickerModal;