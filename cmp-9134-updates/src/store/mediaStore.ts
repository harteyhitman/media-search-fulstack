import { create } from 'zustand';

interface Media {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  provider: string;
}

interface MediaState {
  media: Media[];
  setMedia: (results: Media[]) => void;
  clearMedia: () => void;
}

export const useMediaStore = create<MediaState>((set) => ({
  media: [],
  setMedia: (results) => set({ media: results }),
  clearMedia: () => set({ media: [] }),
}));
