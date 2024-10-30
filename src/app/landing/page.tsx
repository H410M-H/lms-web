"use client"

import { type ReactNode, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import Link from 'next/link'
import { Button } from "~/components/ui/button"
import { ChevronRight, GraduationCap, Book, Users, Calendar } from 'lucide-react'

export default function Home() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0])
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.8])

  const linkCards = [
    {
      title: "Enroll Now →",
      href: "/admin/dashboard",
    },
    {
      title: "Our Socials →",
      href: "https://www.instagram.com/msnazhighschool/",
    },
  ];

  const videos = [
    "https://res.cloudinary.com/dvvbxrs55/video/upload/f_auto,q_auto,w_auto/v1729269611/clip1_awtegx",
    "https://res.cloudinary.com/dvvbxrs55/video/upload/f_auto,q_auto,w_auto/v1729269805/clip4_stlpus",
    "https://res.cloudinary.com/dvvbxrs55/video/upload/f_auto,q_auto,w_auto/v1729269773/clip3_cshxdl",
    "https://res.cloudinary.com/dvvbxrs55/video/upload/f_auto,q_auto,w_auto/v1729267740/clip5_szbx9z",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [videos.length])

  return (
    <div className="min-h-screen bg-emerald-100 font-serif">
      {/* Hero Section */}
      <motion.section
        className="relative h-[70vh] overflow-hidden"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        <video
          key={currentVideoIndex}
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={videos[currentVideoIndex]} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-green-100">
            <motion.h1
              className="font-serif text-white text-5xl md:text-7xl font-bold mb-4"
              initial={{ opacity: 0, y: 20, scale: 0.5 }}
              animate={{
                opacity: [0, 1],
                y: [20, 0],
                scale: [0.5, 1.2],
              }}
              transition={{
                duration: 0.8,
                delay: 0.8,
                ease: "easeOut",
                type: "keyframes",
                stiffness: 100,
              }}
            >
              M.S. NAZ HIGH SCHOOL
            </motion.h1>
            <motion.p
              className="font-serif text-2xl md:text-3xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              PURSUIT OF EXCELLENCE
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Link href={'/about'}>
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300">
                  Learn More <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Quick Links Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl font-bold mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            Quick Links
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {linkCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Link href={card.href}>
                  <Card className="bg-green-800 text-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardHeader>
                      <CardTitle>{card.title}</CardTitle> 
                    </CardHeader>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Why Choose M.S. Naz High School?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<GraduationCap className="h-12 w-12 text-primary" />}
              title="Academic Excellence"
              description="Our rigorous curriculum prepares students for success in higher education and beyond."
              delay={0}
            />
            <FeatureCard
              icon={<Users className="h-12 w-12 text-primary" />}
              title="Dedicated Faculty"
              description="Experienced teachers committed to nurturing each student's potential."
              delay={0.2}
            />
            <FeatureCard
              icon={<Book className="h-12 w-12 text-primary" />}
              title="Diverse Programs"
              description="A wide range of academic and extracurricular activities to foster well-rounded development."
              delay={0.4}
            />
            <FeatureCard
              icon={<Calendar className="h-12 w-12 text-primary" />}
              title="Modern Facilities"
              description="State-of-the-art classrooms, labs, and sports facilities to enhance learning experiences."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-700 text-primary-foreground py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Ready to Join Our Community?
          </motion.h2>
          <motion.p
            className="text-xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Take the first step towards a bright future with M.S. Naz High School.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link href={'/signup'}>
              <Button size="lg" className="bg-emerald-500 text-primary-foreground hover:bg-primary/90 transition-colors duration-300">
                Apply Now <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  delay: number;
}

function FeatureCard({ icon, title, description, delay }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
    >
      <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <CardContent className="pt-6">
          <div className="mb-4 flex justify-center">{icon}</div>
          <CardTitle className="mb-2">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  )
}