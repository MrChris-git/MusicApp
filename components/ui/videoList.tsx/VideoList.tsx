import React, { useEffect, useState } from "react";
import DragList from "react-native-draglist";
import { DragListRenderItemInfo } from "react-native-draglist";
import { VideoProps } from "@/constants/videoProps";
import { FlatList, Pressable, View } from "react-native";
import { useVideosContext } from "@/components/VideosProvider";
import { Text } from "@/components/ui/Text";
import { useGlobalPlayer } from "@/components/PlayerProvider";
import { onCopyText } from "@/components/hook/copyText";
import Button from "../Button";
import DragButton from "../DragButton";
import { fetchAllVideos } from "@/components/hook/fileManager";
import { retrieveVideos } from "@/components/hook/useDB";

export type VideoListProps = {
  ref: React.RefObject<FlatList<VideoProps> | null>;
};

const VideoList = ({ ref }: VideoListProps) => {
  const [pending, setPending] = useState(false);
  const [videos, setVideos] = useState<VideoProps[]>([]);

  const { selectedVideo, setSelectedVideo } = useVideosContext();
  const { player } = useGlobalPlayer();

  const setVideo = (video: VideoProps) => {
    if (!player) return;
    player.replaceAsync({
      metadata: {
        title: video.title,
        artist: "SoundWave",
      },
      uri: video.file_path,
    });
    setSelectedVideo(video);
  };

  const onRefresh = async () => {
    setPending(true);
    try {
      const fetchedVideos = await retrieveVideos();
      setVideos(fetchedVideos);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setPending(false);
    }
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollToOffset({ offset: 0, animated: true });
    }
  }, [videos]);

  useEffect(() => {
    const fetchVideos = async () => {
      setPending(true);
      try {
        const fetchedVideos = await retrieveVideos();
        setVideos(fetchedVideos);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setPending(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <DragList
      className="m-5"
      containerStyle={{ flexGrow: 1 }}
      ref={ref}
      data={videos}
      renderItem={(info) => {
        const { item, isActive } = info;
        const currentVideo = selectedVideo?.id === item.id;

        return (
          <Pressable onLongPress={async () => await onCopyText(item.title)}>
            <Button
              className="justify-between items-center mb-5"
              onPress={() => setVideo(item)}
              disabled={currentVideo}
              extendButton={<DragButton current={currentVideo} {...info} />}
              isActive={isActive}
            >
              {item.title}
            </Button>
          </Pressable>
        );
      }}
      refreshing={pending}
      onRefresh={onRefresh}
      keyExtractor={(item) => `${item.id}`}
    />
  );
};

export default VideoList;
