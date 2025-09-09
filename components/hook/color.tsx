import { useColorScheme } from "react-native";

export const useColor = (): "black" | "white" => {
  const colorScheme = useColorScheme();

  return colorScheme === "dark" ? "black" : "white";
};
