'use client'

import { useEffect, useMemo } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { CldImage } from 'next-cloudinary'

const logos = [
  'off_logo_ggu1ci.png',
  'off_logo_green_g1q261',
]

export default function LogoCloud() {
  const controls = useAnimation()
  const duplicatedLogos = useMemo(() => [...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos], [])

  useEffect(() => {
    const animateLogos = async () => {
      await controls.start({
        x: [0, '-100%'],
        transition: {
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 20,
            ease: 'linear',
          },
        },
      })
    }
    void animateLogos()
  }, [controls])

  return (
    <div className="overflow-hidden w-full">
      <motion.div className="flex space-x-8" animate={controls}>
        {duplicatedLogos.map((logo, index) => (
          <motion.div
            key={index}
            className="flex-shrink-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            <CldImage
              src={logo}
              alt={`Logo ${index + 1}`}
              width={80}
              height={80}
              className="h-20 w-auto"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}