import { View } from "react-native";
import React, { FC } from "react";
import { useColor } from "../hook/color";

export type BackgroundProps = {
  children?: React.ReactNode;
  className?: string;
};

const Background: FC<BackgroundProps> = ({ children, className }) => {
  return (
    <View className={`flex flex-1 bg-white dark:bg-black ${className}`}>
      {children}
    </View>
  );
};

export default Background;
