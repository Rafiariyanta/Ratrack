"use client";

import { Track } from "@/lib/music-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Pause } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface MusicCardProps {
  track: Track;
  isPlaying: boolean;
  onPlayPause: () => void;
}

export function MusicCard({ track, isPlaying, onPlayPause }: MusicCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      className="cursor-pointer"
      onClick={onPlayPause}
    >
      <Card className="overflow-hidden border-none shadow-lg bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800">
        <div className="relative aspect-square overflow-hidden">
          <motion.div
            animate={isPlaying ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            <Image
              src={track.imageUrl}
              alt={track.title}
              fill
              className="object-cover"
            />
          </motion.div>
          <motion.div
            className="absolute inset-0 bg-black/40 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered || isPlaying ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/90 dark:bg-zinc-800/90 rounded-full p-4"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-zinc-900 dark:text-zinc-100" />
              ) : (
                <Play className="w-6 h-6 text-zinc-900 dark:text-zinc-100 ml-1" />
              )}
            </motion.div>
          </motion.div>
          {isPlaying && (
            <motion.div
              className="absolute bottom-3 right-3"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Badge className="bg-green-500 text-white border-none">
                Playing
              </Badge>
            </motion.div>
          )}
        </div>
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                {track.title}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 capitalize">
                {track.artist && `${track.artist} • `}{track.category}
              </p>
            </div>
            <Badge
              variant="outline"
              className="shrink-0 border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300"
            >
              {track.duration}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
