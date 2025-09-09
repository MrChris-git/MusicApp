import { ToastAndroid } from "react-native";

const showToast = (message: string, time: number, position: number) => {
  ToastAndroid.showWithGravity(message, time, position);
};

export default showToast;
