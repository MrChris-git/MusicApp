import { View, Text, TextInput } from "react-native";
import React, { FC } from "react";

export type InputBoxProps = {
  ref?: undefined;
  className?: string;
  onChangeText?: (val: string) => void;
};

const InputBox: FC<InputBoxProps> = ({ ref, className, onChangeText }) => {
  return (
    <TextInput
      className="mt-5 mx-5 p-4 border rounded-xl"
      placeholder="Search"
      onChangeText={onChangeText}
    />
  );
};

export default InputBox;
