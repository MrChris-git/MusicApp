import {
  View,
  ToastAndroid,
  Pressable,
  StyleProp,
  ViewStyle,
} from "react-native";
import React from "react";
import { insertVideo } from "../hook/useDB";
import {
  checkPermission,
  fetchAllVideos,
  pickVideo,
} from "../hook/fileManager";
import showToast from "../hook/ToastAndroid";
import { Text } from "./Text";
import Button from "./Button";
import { SimpleLineIcons } from "@expo/vector-icons";

type UploadButtonProps = {
  setVideos: (videos: insertVideo[]) => void;
  setPending: (pending: boolean) => void;
  className?: string;
  style?: StyleProp<ViewStyle>;
};

const UploadButton = ({
  setVideos,
  setPending,
  className,
  style,
}: UploadButtonProps) => {
  const showAllVideos = async () => {
    showToast("Start getting video", ToastAndroid.SHORT, ToastAndroid.BOTTOM);

    fetchAllVideos().then((videos) => {
      setVideos(videos);
      setPending(false);
    });
  };

  return (
    <Pressable onPress={showAllVideos}>
      <View className={className} style={style}>
        <SimpleLineIcons name="cloud-upload" size={30} />
      </View>
    </Pressable>
  );
};

export default UploadButton;
