'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOG_MESSAGES = [
  "INITIALIZING_SYSTEM_CORE...",
  "ESTABLISHING_GRID_COORDINATES...",
  "LOADING_ML_MODELS: NEUROLM_V2",
  "CONNECTING_TO_KAFKA_STREAMS...",
  "FETCHING_REGENERATION_DATA: STANFORD_LAB",
  "UPLINK_STABLE: 10.0.0.1",
  "SYNCHRONIZING_UI_THREAD...",
  "OPTIMIZING_RENDER_PATH...",
  "MEMORY_ALLOCATION: 0X7FF8A...",
  "AUTHENTICATING_USER_IDENTITY...",
  "SYSTEM_HEALTH: NOMINAL"
];

export default function SystemLog() {
  const [logs, setLogs] = useState<string[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setLogs(prev => {
        const next = [...prev, LOG_MESSAGES[index]];
        if (next.length > 5) next.shift();
        return next;
      });
      setIndex(prev => (prev + 1) % LOG_MESSAGES.length);
    }, 2000);

    return () => clearInterval(timer);
  }, [index]);

  return (
    <div className="font-mono text-[8px] uppercase tracking-widest space-y-1 opacity-50">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-1 h-1 bg-blue-500 animate-pulse" />
        <span className="text-blue-500">[ SYSTEM_LOG ]</span>
      </div>
      <AnimatePresence mode="popLayout">
        {logs.map((log, i) => (
          <motion.div
            key={`${log}-${i}`}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 5 }}
            className="flex gap-2"
          >
            <span className="opacity-30">{new Date().toLocaleTimeString()}</span>
            <span>{log}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

