import { Text, View } from "react-native";
import VisaDetailSection from "./VisaDetailSection";
import type { VisaProcess } from "../../types/visa/types.visaDetails";

type VisaProcessTimelineProps = {
  processes: VisaProcess[];
};

const VisaProcessTimeline = ({ processes }: VisaProcessTimelineProps) => {
  if (!processes.length) return null;

  return (
    <VisaDetailSection title="Application Process">
      {processes.map((process, index) => (
        <View key={process.id} className="flex-row">
          <View className="items-center">
            <View className="h-9 w-9 items-center justify-center rounded-full bg-primary">
              <Text className="text-xs font-extrabold text-white">
                {index + 1}
              </Text>
            </View>

            {index !== processes.length - 1 ? (
              <View className="h-16 w-px bg-primary/20" />
            ) : null}
          </View>

          <View className="ml-4 flex-1 pb-5">
            <Text className="text-base font-extrabold text-gray-900">
              {process.step_title}
            </Text>

            <Text className="mt-1 text-sm leading-5 text-gray-500">
              {process.description}
            </Text>
          </View>
        </View>
      ))}
    </VisaDetailSection>
  );
};

export default VisaProcessTimeline;