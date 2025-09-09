import { VideoProps } from "@/constants/videoProps";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface GlobalContextType {
  videos: VideoProps[];
  selectedVideo: VideoProps | null;
  setVideos: Dispatch<SetStateAction<VideoProps[]>>;
  setSelectedVideo: Dispatch<SetStateAction<VideoProps | null>>;
}

const defaultValue: GlobalContextType = {
  videos: [],
  selectedVideo: null,
  setVideos: () => {},
  setSelectedVideo: () => {},
};

const VideosContext = createContext<GlobalContextType>(defaultValue);

// 4. Provider component
export const VideosProvider = ({ children }: { children: ReactNode }) => {
  const [videos, setVideos] = useState<VideoProps[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<VideoProps | null>(null);

  return (
    <VideosContext.Provider
      value={{
        videos,
        selectedVideo,
        setVideos,
        setSelectedVideo,
      }}
    >
      {children}
    </VideosContext.Provider>
  );
};

// 5. Custom hook for consuming the context
export const useVideosContext = () => useContext(VideosContext);
