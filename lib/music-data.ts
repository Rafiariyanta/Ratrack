export interface Track {
  id: string;
  title: string;
  category: string;
  duration: string;
  mood: string;
  imageUrl: string;
  audioUrl: string;
  artist?: string;
  album?: string;
  licenseUrl?: string;
}

export const categories = [
  { id: "all", name: "All", icon: "🎵" },
  { id: "pop", name: "Pop", icon: "🎤" },
  { id: "rock", name: "Rock", icon: "🎸" },
  { id: "electronic", name: "Electronic", icon: "🎹" },
  { id: "hiphop", name: "Hip-Hop", icon: "🎧" },
  { id: "jazz", name: "Jazz", icon: "🎷" },
  { id: "blues", name: "Blues", icon: "🎺" },
  { id: "classical", name: "Classical", icon: "🎻" },
  { id: "ambient", name: "Ambient", icon: "🌊" },
  { id: "drum-and-bass", name: "Drum & Bass", icon: "🥁" },
  { id: "dubstep", name: "Dubstep", icon: "🎛️" },
  { id: "folk", name: "Folk", icon: "🪕" },
  { id: "metal", name: "Metal", icon: "⚡" },
  { id: "dance", name: "Dance", icon: "💃" },
  { id: "experimental", name: "Experimental", icon: "🔬" },
  { id: "country", name: "Country", icon: "🤠" },
  { id: "world", name: "World", icon: "🌍" },
  { id: "reggae", name: "Reggae", icon: "🇯🇲" },
  { id: "soul", name: "Soul", icon: "✨" },
  { id: "rnb", name: "R&B", icon: "🎤" },
  { id: "soundtrack", name: "Soundtrack", icon: "🎬" },
  { id: "trance", name: "Trance", icon: "🌀" },
];
