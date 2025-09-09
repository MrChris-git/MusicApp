import { insertVideo, postVideo } from "@/components/hook/useDB";
import Background from "@/components/ui/Background";
import UploadButton from "@/components/ui/UploadButton";
import { useEffect, useState } from "react";
import { FlatList, Pressable, TouchableOpacity } from "react-native";
import { Text } from "@/components/ui/Text";
import { groupVideosByFolder } from "@/components/unit/FolderClassification";
import Button from "@/components/ui/Button";
import InputBox from "@/components/ui/InputBox";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import DropDownMenu from "@/components/ui/DropDownMenu";

type SectionItem = {
  title: string;
  data: insertVideo[];
};

export default function TabTwoScreen() {
  const navigation = useNavigation();
  const [videos, setVideos] = useState<insertVideo[]>([]);
  const [pending, setPending] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [DDMenuVisible, setDDMenuVisible] = useState(false);
  const grouped = groupVideosByFolder(videos);

  const sections: SectionItem[] = Object.entries(grouped).map(
    ([folderName, data]) => ({
      title: folderName,
      data,
    })
  );

  const searchVideo = (title: string) => {
    setSearchTerm(title);
  };

  const filteredVideos =
    videos.filter((video) =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  useEffect(() => {
    setPending(false);
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity className="m-5" onPress={() => setDDMenuVisible(true)}>
          <Ionicons name="settings" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, []);

  const folderButton = () => {};

  return (
    <Background>
      <UploadButton
        style={{
          padding: "10%",
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: 20,
          marginTop: 20,
          borderWidth: 2,
          borderRadius: 10,
          borderStyle: "dashed",
          borderColor: "#2f95dc",
        }}
        {...{ setVideos, setPending }}
      />
      <InputBox onChangeText={searchVideo} />
      <FlatList
        data={videos}
        contentContainerClassName={`grow m-5`}
        refreshing={pending}
        renderItem={({ item }) => (
          <Button className="mb-5" onPress={() => {}}>
            {item.title}
          </Button>
        )}
        keyExtractor={(item, index) => `video-${index}`}
        windowSize={5}
      />
      <Button className="m-5 mt-10">Save</Button>
      <DropDownMenu visible={DDMenuVisible} setVisible={setDDMenuVisible} />
    </Background>
  );
}
