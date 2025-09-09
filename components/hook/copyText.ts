import * as Clipboard from "expo-clipboard";
import { ToastAndroid } from "react-native";

export const onCopyText = async (text: string) => {
  await Clipboard.setStringAsync(text);
  ToastAndroid.showWithGravity(
    "Copied to clipboard",
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM
  );
};
