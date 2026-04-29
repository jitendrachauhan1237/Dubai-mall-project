import { motion } from 'framer-motion';
import { useState } from 'react';

export function BrandCard({ name, logo, description }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.03 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-white rounded-2xl p-6 shadow-lg cursor-pointer overflow-hidden"
    >
      <div className="h-32 flex items-center justify-center mb-4">
        <img src={logo} alt={name} className="max-h-full max-w-full object-contain" />
      </div>
      <h3 className="text-xl font-bold text-center mb-2">{name}</h3>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isHovered ? 1 : 0, height: isHovered ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
        className="text-gray-600 text-center"
      >
        {description}
      </motion.div>
    </motion.div>
  );
}