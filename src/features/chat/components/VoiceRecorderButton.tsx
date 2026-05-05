import { useRef, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { Audio } from "expo-av";
import { Mic, Square } from "lucide-react-native";

type VoiceRecorderButtonProps = {
  onVoiceReady: (uri: string) => Promise<void>;
};

const PRIMARY_COLOR = "#13275F";

const VoiceRecorderButton = ({ onVoiceReady }: VoiceRecorderButtonProps) => {
  const recordingRef = useRef<Audio.Recording | null>(null);
  const [recording, setRecording] = useState(false);

  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();

      if (!permission.granted) {
        Alert.alert("Permission needed", "Microphone permission is required.");
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const result = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      recordingRef.current = result.recording;
      setRecording(true);
    } catch (error) {
      console.log("Start recording error:", error);
      Alert.alert("Error", "Could not start recording.");
    }
  };

  const stopRecording = async () => {
    try {
      const currentRecording = recordingRef.current;
      if (!currentRecording) return;

      setRecording(false);
      recordingRef.current = null;

      await currentRecording.stopAndUnloadAsync();

      const uri = currentRecording.getURI();

      if (!uri) {
        Alert.alert("Error", "Recording file not found.");
        return;
      }

      await onVoiceReady(uri);
    } catch (error) {
      console.log("Stop recording error:", error);
      Alert.alert("Error", "Could not send voice message.");
    }
  };

  return (
    <TouchableOpacity
      onPress={recording ? stopRecording : startRecording}
      activeOpacity={0.85}
      className="h-14 w-14 items-center justify-center rounded-full"
      style={{ backgroundColor: recording ? "#DC2626" : PRIMARY_COLOR }}
    >
      {recording ? (
        <Square size={22} color="#FFFFFF" />
      ) : (
        <Mic size={25} color="#FFFFFF" />
      )}
    </TouchableOpacity>
  );
};

export default VoiceRecorderButton;