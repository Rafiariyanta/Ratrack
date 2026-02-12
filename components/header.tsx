"use client";

import { motion } from "framer-motion";
import { Music } from "lucide-react";

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md sticky top-0 z-40"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-700 dark:from-zinc-100 dark:to-zinc-300 p-2 rounded-lg">
              <Music className="w-6 h-6 text-white dark:text-zinc-900" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 bg-clip-text text-transparent">
              RaTrack
            </h1>
          </motion.div>

          <nav className="hidden md:flex items-center gap-6">
            <motion.a
              href="#"
              className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors font-medium"
              whileHover={{ y: -2 }}
            >
              Home
            </motion.a>
            <motion.a
              href="#"
              className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors font-medium"
              whileHover={{ y: -2 }}
            >
              License
            </motion.a>
            <motion.a
              href="#"
              className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors font-medium"
              whileHover={{ y: -2 }}
            >
              About
            </motion.a>
            <motion.button
              className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-6 py-2 rounded-full font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign In
            </motion.button>
          </nav>
        </div>
      </div>
    </motion.header>
  );
}
