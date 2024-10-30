"use client"

import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';

const logos = [
  '/logo/off_logo.png', // Adjust this path if needed
  '/logo/logo.png', // Adjust this path if needed
  '/logo/off_logo.png', // Adjust this path if needed
  '/logo/logo.png', // Adjust this path if needed
  '/logo/off_logo.png', // Adjust this path if needed
  '/logo/logo.png', // Adjust this path if needed
  '/logo/off_logo.png', // Adjust this path if needed
  '/logo/logo.png', // Adjust this path if needed
  '/logo/off_logo.png', // Adjust this path if needed
  '/logo/logo.png', // Adjust this path if needed
  '/logo/off_logo.png', // Adjust this path if needed
  '/logo/logo.png', // Adjust this path if needed
  '/logo/off_logo.png', // Adjust this path if needed
  '/logo/logo.png', // Adjust this path if needed
];

export const LogoCloud = () => {
  const controls = useAnimation();

  useEffect(() => {
    void controls.start({
      x: [0, -1000], // Adjust this value based on the total width of your logos
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 10,
          ease: "linear",
        },
      },
    });
  }, [controls]);

  return (
      <div className="fixed">
        <motion.div className="flex space-x-8" animate={controls}>
          {/* Concatenating logos array for a seamless loop */}
          {logos.concat(logos).map((logo, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0"
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Image
                src={logo}
                alt={`Logo ${index * 5}`}
                width={500} // Adjust based on your logo size
                height={500} // Adjust based on your logo size
                className="h-20 w-auto"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
  );
};