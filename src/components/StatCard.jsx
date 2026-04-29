import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function StatCard({ value, label, suffix = '', isInView }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl p-8 shadow-lg text-center"
    >
      <div className="text-4xl font-bold text-blue-600 mb-2">
        {count}{suffix}
      </div>
      <div className="text-gray-600">{label}</div>
    </motion.div>
  );
}