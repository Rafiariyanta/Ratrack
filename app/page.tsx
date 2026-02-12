"use client";

import { useState, useEffect, useMemo } from "react";
import { categories, Track } from "@/lib/music-data";
import { fetchTracks, searchTracks } from "@/lib/jamendo-api";
import { Header } from "@/components/header";
import { SearchBar } from "@/components/search-bar";
import { CategoryTabs } from "@/components/category-tabs";
import { MusicCard } from "@/components/music-card";
import { MusicPlayer } from "@/components/music-player";
import { motion } from "framer-motion";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const loadTracks = async () => {
      setLoading(true);
      setError(null);

      try {
        let data;
        if (searchQuery.trim()) {
          data = await searchTracks(searchQuery, 50);
        } else {
          data = await fetchTracks(50, activeCategory);
        }

        const { mapJamendoTrackToTrack } = await import("@/lib/jamendo-api");
        const mappedTracks = data.map(mapJamendoTrackToTrack);
        setTracks(mappedTracks);
      } catch (err) {
        setError("Failed to load tracks. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(loadTracks, 500);
    return () => clearTimeout(debounceTimer);
  }, [activeCategory, searchQuery]);

  const filteredTracks = useMemo(() => {
    // When we're fetching from API, we don't need client-side filtering
    // The API handles filtering by category and search
    return tracks;
  }, [tracks]);

  const handlePlayPause = (track: Track) => {
    if (currentTrack?.id === track.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  const handlePrevious = () => {
    if (!currentTrack) return;
    const currentIndex = filteredTracks.findIndex((t) => t.id === currentTrack.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredTracks.length - 1;
    setCurrentTrack(filteredTracks[prevIndex]);
    setIsPlaying(true);
  };

  const handleNext = () => {
    if (!currentTrack) return;
    const currentIndex = filteredTracks.findIndex((t) => t.id === currentTrack.id);
    const nextIndex = currentIndex < filteredTracks.length - 1 ? currentIndex + 1 : 0;
    setCurrentTrack(filteredTracks[nextIndex]);
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900">
      <Header />

      <main className="container mx-auto px-4 py-12 pb-40">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 dark:from-zinc-100 dark:via-zinc-300 dark:to-zinc-100 bg-clip-text text-transparent">
            Discover Royalty-Free Music
          </h2>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8 max-w-2xl mx-auto">
            Browse through our collection of beautiful, copyright-free music for your
            creative projects
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex justify-center"
          >
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </motion.div>
        </motion.section>

        {/* Categories */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <CategoryTabs
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </motion.section>

        {/* Loading State */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="inline-block">
              <motion.div
                className="w-16 h-16 border-4 border-zinc-300 border-t-zinc-900 dark:border-zinc-700 dark:border-t-zinc-100 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 mt-4">Loading tracks...</p>
          </motion.div>
        )}

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-2xl text-red-500 dark:text-red-400 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-full hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
            >
              Retry
            </button>
          </motion.div>
        )}

        {/* Results Count */}
        {!loading && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-6"
          >
            <p className="text-zinc-600 dark:text-zinc-400 text-center">
              {filteredTracks.length} {filteredTracks.length === 1 ? "track" : "tracks"} found
            </p>
          </motion.div>
        )}

        {/* Music Grid */}
        {!loading && !error && (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredTracks.map((track, index) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <MusicCard
                  track={track}
                  isPlaying={currentTrack?.id === track.id && isPlaying}
                  onPlayPause={() => handlePlayPause(track)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* No Results */}
        {!loading && !error && filteredTracks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-2xl text-zinc-400 dark:text-zinc-600">
              No tracks found. Try a different search or category.
            </p>
          </motion.div>
        )}
      </main>

      {/* Music Player */}
      <MusicPlayer
        track={currentTrack}
        isPlaying={isPlaying}
        onPlayPause={() => {
          if (currentTrack) {
            setIsPlaying(!isPlaying);
          }
        }}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </div>
  );
}
