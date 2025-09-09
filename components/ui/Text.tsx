import { Text as DefaultText } from "react-native";
import React from "react";
import { useColor } from "../hook/color";

export type TextProps = DefaultText["props"] & {
  className?: string;
  btn?: boolean;
};

export function Text(props: TextProps) {
  const theme = useColor();
  const textColor = theme === "black" ? "white" : "black";
  const color = props.btn ? theme : textColor;

  return (
    <DefaultText
      className={`text-${color} text-base ${props.className}`}
      {...props}
    />
  );
}
