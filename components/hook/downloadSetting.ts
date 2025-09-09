import * as FileSystem from "expo-file-system";

const fileUri = FileSystem.documentDirectory + "setting.json";

export type settingProps = {
  isFolder: boolean;
  isExist: boolean;
};

const saveSettingData = async (setting: settingProps): Promise<void> => {
  await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(setting));
};

const readSettingData = async (): Promise<settingProps> => {
  const fileInfo = await FileSystem.getInfoAsync(fileUri);
  if (fileInfo.exists) {
    const content = await FileSystem.readAsStringAsync(fileUri);
    return JSON.parse(content);
  } else {
    alert("No data found!");
    throw new Error("No data found!");
  }
};
