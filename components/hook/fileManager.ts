import * as MediaLibrary from "expo-media-library";
import { insertVideo } from "./useDB";
import showToast from "./ToastAndroid";
import { ToastAndroid } from "react-native";
import * as ImagePicker from "expo-image-picker";

export { checkPermission, fetchAllVideos };

const checkPermission = async (): Promise<boolean> => {
  const mediaPermission = await MediaLibrary.requestPermissionsAsync();

  if (mediaPermission && !mediaPermission.granted) {
    showToast(
      "Permission to access media library is required.",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
    );
    return false;
  }

  return true;
};

const fetchAllVideos = async (): Promise<insertVideo[]> => {
  try {
    const permissionGranted = await checkPermission();
    if (!permissionGranted) {
      return [];
    }

    const videos: insertVideo[] = [];
    let hasMore = true;
    let after: string | undefined;

    while (hasMore) {
      // Fetch video assets
      const res = await MediaLibrary.getAssetsAsync({
        mediaType: [MediaLibrary.MediaType.video],
        sortBy: [MediaLibrary.SortBy.creationTime],
        first: 200,
        after,
      });

      const detailed = await Promise.all(
        res.assets.map(async (asset) => {
          try {
            const info = await MediaLibrary.getAssetInfoAsync(asset);
            const uri = (info as any)?.localUri ?? asset.uri;
            return {
              title: asset.filename.replace(/\.[^/.]+$/, ""),
              duration: asset.duration,
              file_path: uri,
            } as insertVideo;
          } catch (e) {
            return null;
          }
        })
      );

      for (const v of detailed) {
        if (v) {
          videos.push(v);
        }
      }

      // Check if there are more assets to fetch
      hasMore = res.hasNextPage;
      after = hasMore ? res.endCursor : undefined;
    }

    return videos.reverse();
  } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
};

export const pickVideo = async () => {
  // Ask for permissionc
  console.log("getting videos");
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    alert("Permission to access media library is required!");
    return null;
  }
  console.log(status);

  // Launch the picker
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: "videos", // only videos
    allowsEditing: false, // no trimming/cropping
    quality: 7,
  });

  console.log(result);

  if (!result.canceled) {
    // result.assets is an array, take the first one
    const videoUri = result.assets[0].uri;
    return videoUri;
  }

  return null;
};
