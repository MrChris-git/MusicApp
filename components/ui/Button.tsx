import { View, Pressable } from "react-native";
import { Text } from "./Text";
import React, { ReactNode } from "react";

export type ButtonProps = {
  onPress?: () => void;
  disabled?: boolean;
  className?: string;
  children?: string;
  extendButton?: ReactNode;
  isActive?: boolean;
};

const Button = ({
  onPress,
  disabled = false,
  extendButton,
  className,
  children,
  isActive = false,
}: ButtonProps) => {
  const backgroundColor = disabled ? "bg-gray-200" : "bg-indigo-400";
  return (
    <Pressable onPress={onPress} disabled={disabled}>
      {({ pressed }) => {
        const scaleTransform = pressed || isActive ? 0.98 : 1;
        const opacity = pressed || isActive ? 0.7 : 1;
        return (
          <View
            className={`flex-row w-auto h-auto p-5 pl-4 pr-4 ${backgroundColor} ${className}`}
            style={{
              opacity: opacity,
              transform: [{ scale: scaleTransform }],
              borderRadius: 5,
            }}
          >
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              btn={!disabled}
              style={{ maxWidth: "90%" }}
            >
              {children}
            </Text>
            {extendButton}
          </View>
        );
      }}
    </Pressable>
  );
};

export default Button;
