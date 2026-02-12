"use client";

import { categories } from "@/lib/music-data";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryTabs({
  activeCategory,
  onCategoryChange,
}: CategoryTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {categories.map((category) => (
        <motion.button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={cn(
            "px-4 py-2 rounded-full font-medium transition-all duration-200 flex items-center gap-2",
            activeCategory === category.id
              ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-lg scale-105"
              : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          )}
          whileHover={{ scale: activeCategory === category.id ? 1.05 : 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>{category.icon}</span>
          <span>{category.name}</span>
        </motion.button>
      ))}
    </div>
  );
}
