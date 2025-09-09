import { VideoProps } from "@/constants/videoProps";
import { useVideoPlayer, VideoPlayer } from "expo-video";
import { createContext, useContext, useEffect } from "react";
import { AppState, AppStateStatus } from "react-native";
import { useVideosContext } from "./VideosProvider";

type GlobalType = {
  player?: VideoPlayer | undefined;
  setVideo: (video: VideoProps) => void;
};

const defaultContextValue: GlobalType = {
  player: undefined,
  setVideo: () => {},
};

const PlayerContext = createContext<GlobalType>(defaultContextValue);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const player = useVideoPlayer({}, (player) => {
    player.staysActiveInBackground = true;
    player.showNowPlayingNotification = true;
    player.timeUpdateEventInterval = 1;
    player.volume = 0.7;
  });

  const setVideo = (video: VideoProps) => {
    const { setSelectedVideo } = useVideosContext();
    console.log("Setting video", video);
    // player.replace({
    //   metadata: {
    //     title: video.title,
    //     artist: "SoundWave",
    //   },
    //   uri: video.filePath,
    // });
    setSelectedVideo(video);
  };

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      (state: AppStateStatus) => {
        if (state === "background") {
          player.timeUpdateEventInterval = 0;
        } else {
          player.timeUpdateEventInterval = 1;
        }
      }
    );

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        player,
        setVideo,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const useGlobalPlayer = () => useContext(PlayerContext);
