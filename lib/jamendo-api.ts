// Jamendo API client ID for demo purposes
const CLIENT_ID = process.env.NEXT_PUBLIC_JAMEMEDO_CLIENT_ID;
const BASE_URL = "https://api.jamendo.com/v3.0";

export interface JamendoTrack {
  id: string;
  name: string;
  artist_name: string;
  album_name: string;
  duration: number;
  image: string;
  audio: string;
  license_ccurl: string;
  category: string;
  tags: string[];
  releasedate: string;
  audiodownload: string;
  audiodownload_allowed: boolean;
}

export interface JamendoResponse {
  headers: {
    status: string;
    code: number;
    error_message: string;
    results: {
      tracks: number;
    };
  };
  results: JamendoTrack[];
}

export async function fetchTracks(
  limit: number = 50,
  category: string = "all",
): Promise<JamendoTrack[]> {
  try {
    const categoryParam =
      category !== "all" ? `&tags=${category}` : "&tags=pop";

    const response = await fetch(
      `${BASE_URL}/tracks/?client_id=${CLIENT_ID}&limit=${limit}&include=musicinfo&imagesize=500&audioformat=mp32${categoryParam}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: JamendoResponse = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching tracks from Jamendo:", error);
    throw error;
  }
}

export async function searchTracks(
  query: string,
  limit: number = 50,
): Promise<JamendoTrack[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/tracks/?client_id=${CLIENT_ID}&limit=${limit}&include=musicinfo&imagesize=500&audioformat=mp32&search=${encodeURIComponent(query)}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: JamendoResponse = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error searching tracks on Jamendo:", error);
    throw error;
  }
}

export function mapJamendoTrackToTrack(jamendoTrack: JamendoTrack) {
  // Extract mood from tags or use a default
  const moodMap: { [key: string]: string } = {
    electronic: "energetic",
    pop: "happy",
    rock: "energetic",
    jazz: "calm",
    classical: "calm",
    acoustic: "calm",
    cinematic: "dramatic",
    folk: "romantic",
    ambient: "calm",
    blues: "sad",
    reggae: "happy",
    hiphop: "energetic",
    soul: "romantic",
    metal: "energetic",
    dance: "energetic",
    "chill-out": "calm",
  };

  // Find the first tag that matches our mood map
  const mood =
    jamendoTrack.tags
      ?.find((tag) => moodMap[tag.toLowerCase()])
      ?.toLowerCase() ||
    moodMap[jamendoTrack.category?.toLowerCase()] ||
    "happy";

  return {
    id: jamendoTrack.id,
    title: jamendoTrack.name,
    category: jamendoTrack.category || "pop",
    duration: formatDuration(jamendoTrack.duration),
    mood: mood,
    imageUrl: jamendoTrack.image,
    audioUrl: jamendoTrack.audio,
    artist: jamendoTrack.artist_name,
    album: jamendoTrack.album_name,
    licenseUrl: jamendoTrack.license_ccurl,
  };
}

function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}
