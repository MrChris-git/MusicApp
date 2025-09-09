import { Text, Modal, View, Switch } from "react-native";
import Checkbox from "expo-checkbox";
import React, { useState } from "react";

export type DropDownMenuProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

const DropDownMenu = ({ visible, setVisible }: DropDownMenuProps) => {
  const [isChecked, setChecked] = useState(false);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <View id="background" className="flex-1 opacity-70 bg-black " />
      <View
        id="form"
        className="absolute w-full h-full justify-center items-center"
      >
        <View className=" w-2/3 h-auto bg-white rounded-xl">
          <View className="m-5">
            <Text id="title" className="text-2xl">
              Setting
            </Text>
            <View id="container" className="mt-2">
              <View className="flex-row justify-between">
                <Text>test</Text>
                <Checkbox
                  value={isChecked}
                  onValueChange={setChecked}
                  color={isChecked ? "#4630EB" : undefined}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DropDownMenu;
