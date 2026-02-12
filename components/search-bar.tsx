"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      className="relative max-w-md mx-auto"
      animate={isFocused ? { scale: 1.02 } : { scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <Search
        className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
          isFocused ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-400"
        }`}
      />
      <Input
        type="text"
        placeholder="Search for music..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`pl-12 pr-4 py-6 text-lg rounded-full border-2 transition-all ${
          isFocused
            ? "border-zinc-900 dark:border-zinc-100 ring-4 ring-zinc-900/10 dark:ring-zinc-100/10"
            : "border-zinc-200 dark:border-zinc-800"
        }`}
      />
    </motion.div>
  );
}
