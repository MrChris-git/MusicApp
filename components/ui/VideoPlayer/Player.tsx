import { View, Text, Dimensions } from "react-native";
import { VideoView } from "expo-video";
import React, { use } from "react";
import { useGlobalPlayer } from "@/components/PlayerProvider";

export type PlayerProps = {
  videoRef: React.RefObject<null | VideoView>;
};

const Player = ({ videoRef }: PlayerProps) => {
  const aspectRatio = 9 / 16; // Aspect ratio
  const { width } = Dimensions.get("window");
  const height = width * aspectRatio;

  const { player } = useGlobalPlayer();
  // const player = undefined;

  if (!player) {
    return (
      <View
        className="bg-black justify-center items-center"
        style={{
          width,
          height,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text className="text-white">Loading player...</Text>
      </View>
    );
  }

  return (
    <View>
      <VideoView
        ref={videoRef}
        startsPictureInPictureAutomatically
        style={{
          width: width,
          height: height,
          backgroundColor: "black",
        }}
        player={player}
      />
    </View>
  );
};

export default Player;
