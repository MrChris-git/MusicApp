import * as SQLite from "expo-sqlite";
import { ToastAndroid } from "react-native";
import { fileExists } from "./fileExists";
import showToast from "./ToastAndroid";
import { VideoProps } from "@/constants/videoProps";

const db = SQLite.openDatabaseSync("Video.db");

const initTable = () => {
  db.execSync(Table);
  migrateVideoTable();
};

const deleteTable = () => {
  db.execSync(`DROP TABLE IF EXISTS Video;`);
  showToast("All data has cleared", ToastAndroid.LONG, ToastAndroid.CENTER);
  initTable();
};

const retrieveVideos = (): VideoProps[] => {
  const videos: VideoProps[] = [];

  const results = db.getAllSync<VideoProps>("SELECT * FROM Video;");

  for (const video of results) {
    videos.push(video);
  }

  return videos;
};

const retrieveVideosByFilePath = (Video: insertVideo) => {
  const results = db.getFirstSync<VideoProps>(
    "SELECT * FROM Video WHERE file_path = ?;",
    Video.file_path
  );

  return results;
};

const postVideo = (video: insertVideo) => {
  if (retrieveVideosByFilePath(video)) {
    showToast("Video already exists", ToastAndroid.LONG, ToastAndroid.BOTTOM);
    return;
  }

  const result = db.runSync(
    `INSERT INTO Video (title, duration, file_path) 
    VALUES (?, ?, ?);`,
    video.title,
    video.duration,
    video.file_path
  );

  if (result.changes > 0) {
    showToast("Video added", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
  }
};

const putVideoName = (id: number, title: string) => {
  db.runSync(`UPDATE Video SET title = ? WHERE id = ?;`, title, id);

  showToast("Video name updated", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
};

const deleteVideo = (id: number) => {
  db.runSync(`DELETE FROM Video WHERE id = ?;`, id);
};

const checkInformationComplete = async () => {
  const videos = retrieveVideos();
  for (const video of videos) {
    fileExists(video.file_path).then((exists) => {
      if (!exists) {
        console.log(video.id, video.title, video.file_path);
        deleteVideo(video.id);
      }
    });
  }
};

export const migrateVideoTable = async () => {
  try {
    const rows = await db.getAllAsync<{ name: string }>(
      `PRAGMA table_info(Video);`
    );
    const existingColumns = rows.map((row) => row.name);
    if (!existingColumns.includes("album")) {
      db.runSync(`ALTER TABLE Video ADD COLUMN album VARCHAR(255);`);
    }
    if (!existingColumns.includes("genre")) {
      db.runSync(`ALTER TABLE Video ADD COLUMN genre VARCHAR(100);`);
    }
    if (!existingColumns.includes("cover_image")) {
      db.runSync(`ALTER TABLE Video ADD COLUMN cover_image TEXT;`);
    }
  } catch (error) {
    console.error("Error during video table migration:", error);
    showToast(
      "Error during video table migration",
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM
    );
  }
};

const DeleteAllVideos = () => {
  db.execSync(`DELETE FROM Video;`);
};

export {
  insertVideo,
  initTable,
  deleteTable,
  DeleteAllVideos,
  retrieveVideos,
  retrieveVideosByFilePath,
  postVideo,
  putVideoName,
  deleteVideo,
  checkInformationComplete,
};

interface insertVideo {
  title: string;
  duration: number;
  file_path: string;
}

// SQL statements for creating tables
const Table = `
CREATE TABLE IF NOT EXISTS Video (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  title VARCHAR(255) NOT NULL,
  duration TIME NOT NULL,
  file_path VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;
