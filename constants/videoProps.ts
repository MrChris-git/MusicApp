export interface VideoProps {
  id: number;
  title: string;
  album?: string;
  genre?: string;
  duration: number;
  file_path: string;
  cover_image?: string;
  createdAt: string;
  updatedAt: string;
}
