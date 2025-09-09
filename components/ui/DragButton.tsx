import { Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { DragListRenderItemInfo } from "react-native-draglist";

export type DragButtonProps = DragListRenderItemInfo<any> & {
  current: boolean;
};

const DragButton = (props: DragButtonProps) => {
  const { onDragStart, onDragEnd } = props;

  const color = props.current ? "#000" : "#fff";

  return (
    <Pressable onLongPress={onDragStart} onPressOut={onDragEnd}>
      <MaterialIcons name="drag-handle" size={32} color={color} />
    </Pressable>
  );
};

export default DragButton;
