import { insertVideo } from "../hook/useDB";

type GroupedVideos = {
  [folderName: string]: insertVideo[];
};

export const groupVideosByFolder = (
  videoList: insertVideo[]
): GroupedVideos => {
  const groups: GroupedVideos = {};

  videoList.forEach((video) => {
    const parts = video.file_path.split("/");
    const folderName = parts[parts.length - 2] || "Unknown";

    if (!groups[folderName]) {
      groups[folderName] = [];
    }

    groups[folderName].push(video);
  });

  return groups;
};
