"use client";

import { Track } from "@/lib/music-data";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";

interface MusicPlayerProps {
  track: Track | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export function MusicPlayer({
  track,
  isPlaying,
  onPlayPause,
  onPrevious,
  onNext,
}: MusicPlayerProps) {
  const [progress, setProgress] = useState([0]);
  const [volume, setVolume] = useState([75]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!track) return;

    // Create audio element if it doesn't exist
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    const audio = audioRef.current;

    // Update audio source when track changes
    if (audio.src !== track.audioUrl) {
      audio.src = track.audioUrl;
      audio.volume = volume[0] / 100;

      if (isPlaying) {
        audio.play().catch(console.error);
      }
    }

    // Set up event listeners
    const handleTimeUpdate = () => {
      if (audio.duration) {
        setProgress([(audio.currentTime / audio.duration) * 100]);
      }
    };

    const handleEnded = () => {
      onNext();
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [track, isPlaying, onNext, volume]);

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    if (isPlaying) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume[0] / 100;
  }, [volume]);

  const handleSeek = (value: number[]) => {
    if (!audioRef.current || !track) return;

    const audio = audioRef.current;
    const seekTime = (value[0] / 100) * audio.duration;
    audio.currentTime = seekTime;
    setProgress(value);
  };

  const containerVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      y: 100,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  if (!track) return null;

  return (
    <AnimatePresence>
      {track && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed bottom-0 left-0 right-0 z-50 p-4"
        >
          <Card className="mx-auto max-w-3xl bg-gradient-to-r from-zinc-100 to-zinc-50 dark:from-zinc-900 dark:to-zinc-800 border-t-2 border-zinc-200 dark:border-zinc-700 shadow-2xl">
            <div className="flex items-center gap-4 p-4">
              {/* Album Art */}
              <motion.div
                className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0"
                animate={isPlaying ? { scale: [1, 1.05, 1] } : { scale: 1 }}
                transition={{
                  duration: 2,
                  repeat: isPlaying ? Infinity : 0,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src={track.imageUrl}
                  alt={track.title}
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* Track Info & Controls */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                  {track.title}
                </h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 capitalize">
                  {track.artist && `${track.artist} • `}{track.category} • {track.mood}
                </p>

                {/* Progress Bar */}
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs text-zinc-500 w-10">
                    {(() => {
                      const totalSeconds = parseInt(track.duration.split(":")[0]) * 60 + parseInt(track.duration.split(":")[1]);
                      const currentSeconds = Math.floor((progress[0] / 100) * totalSeconds);
                      const minutes = Math.floor(currentSeconds / 60);
                      const seconds = currentSeconds % 60;
                      return `${minutes}:${seconds.toString().padStart(2, "0")}`;
                    })()}
                  </span>
                  <Slider
                    value={progress}
                    onValueChange={handleSeek}
                    max={100}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-xs text-zinc-500 w-10 text-right">
                    {track.duration}
                  </span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onPrevious}
                  className="hover:bg-zinc-200 dark:hover:bg-zinc-700"
                >
                  <SkipBack className="w-5 h-5" />
                </Button>
                <Button
                  size="icon"
                  onClick={onPlayPause}
                  className="bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 h-12 w-12 rounded-full"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 fill-current" />
                  ) : (
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onNext}
                  className="hover:bg-zinc-200 dark:hover:bg-zinc-700"
                >
                  <SkipForward className="w-5 h-5" />
                </Button>

                <div className="flex items-center gap-2 ml-2 w-24">
                  <Volume2 className="w-4 h-4 text-zinc-500 shrink-0" />
                  <Slider
                    value={volume}
                    onValueChange={setVolume}
                    max={100}
                    step={1}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
