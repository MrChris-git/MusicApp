import * as FileSystem from "expo-file-system";

export const fileExists = async (filePath: string): Promise<boolean> => {
  try {
    const fileInfo = await FileSystem.getInfoAsync(filePath);
    if (!fileInfo) {
      return false;
    }
    return fileInfo.exists; // returns true if the file exists, false otherwise
  } catch (error) {
    console.error("Error checking file existence:", error);
    return false; // Return false in case of an error
  }
};
