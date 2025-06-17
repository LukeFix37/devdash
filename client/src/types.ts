// src/types.ts
export type Task = {
  id: number;
  title: string;
  completed?: boolean;
  date?: string;
  start?: string;
}

interface SpotifyArtist {
  name: string;
}

export interface SpotifyTrack {
  id: string;
  name: string;
  uri: string;
  artists: SpotifyArtist[];
}