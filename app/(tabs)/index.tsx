import Background from "@/components/ui/Background";
import VideoList from "@/components/ui/videoList.tsx/VideoList";
import Player from "@/components/ui/VideoPlayer/Player";
import { useRef } from "react";
import { Text } from "@/components/ui/Text";

export default function TabOneScreen() {
  const videoRef = useRef(null);
  const dragListRef = useRef(null);

  return (
    <Background>
      <Player videoRef={videoRef} />
      <VideoList ref={dragListRef} />
      <Text>Tab One</Text>
    </Background>
  );
}
