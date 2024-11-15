"use client"

import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Card, CardContent } from "~/components/ui/card"
import { BookOpen, Users, Trophy, Lightbulb, ChevronDown } from "lucide-react"
import { CldImage } from "next-cloudinary"
import { motion, useScroll, useTransform } from "framer-motion"

export default function About() {
  const [expandedValue, setExpandedValue] = useState<number | null>(null)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

  const stats = [
    { icon: BookOpen, label: "AP Courses", value: "15+" },
    { icon: Users, label: "Student-Teacher Ratio", value: "18:1" },
    { icon: Trophy, label: "State Championships", value: "25" },
    { icon: Lightbulb, label: "Clubs & Activities", value: "50+" },
  ]

  const values = [
    {
      title: "Excellence",
      description: "We strive for excellence in all aspects of education and personal development.",
      details: "Our commitment to excellence is reflected in our rigorous academic programs, state-of-the-art facilities, and highly qualified faculty.",
    },
    {
      title: "Inclusivity",
      description: "We celebrate diversity and create an inclusive environment for all students.",
      details: "We actively promote diversity through multicultural events, inclusive curricula, and support services for students from all backgrounds.",
    },
    {
      title: "Innovation",
      description: "We embrace innovative teaching methods and technologies to enhance learning.",
      details: "Our classrooms are equipped with the latest educational technology, and our teachers regularly participate in professional development to stay at the forefront of educational innovation.",
    },
    {
      title: "Integrity",
      description: "We uphold the highest standards of integrity in our actions and decisions.",
      details: "We foster a culture of honesty and ethical behavior through our honor code, character education programs, and leading by example.",
    },
    {
      title: "Community",
      description: "We foster a strong sense of community and encourage active participation.",
      details: "Our school organizes regular community service projects, family events, and alumni networks to strengthen our bonds beyond the classroom.",
    },
    {
      title: "Growth Mindset",
      description: "We believe in the power of continuous learning and personal growth.",
      details: "We encourage students to embrace challenges, learn from failures, and continuously strive for improvement through our mentoring programs and growth-oriented feedback systems.",
    },
  ]

  return (
    <section className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
          <motion.div style={{ scale, opacity }} className="absolute inset-0">
            <CldImage
              src="FrontView1_alaabu"
              alt="School building"
              fill
              style={{ objectFit: 'cover' }}
              className="absolute inset-0"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50" />
          </motion.div>
          <motion.div
            className="relative z-10 text-center text-white px-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">About M.S.NAZ HIGH SCHOOL®</h1>
            <p className="text-xl md:text-2xl lg:text-3xl mb-8">Nurturing Minds, Shaping Futures</p>
            <Button size="lg" className="transition transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary">
              Learn More
            </Button>
          </motion.div>
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown className="w-8 h-8 text-white" />
          </motion.div>
        </section>

        {/* Mission Statement */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Our Mission</h2>
            <motion.p
              className="text-xl text-center max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              At M.S.NAZ High School, we are committed to providing a nurturing and challenging educational environment that empowers students to become lifelong learners, critical thinkers, and responsible global citizens.
            </motion.p>
          </div>
        </section>

        {/* Key Statistics */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">MSNS by the Numbers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full">
                    <CardContent className="flex flex-col items-center justify-center h-full p-6">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <stat.icon className="w-12 h-12 mb-4 text-primary" />
                      </motion.div>
                      <h3 className="text-2xl font-bold mb-2">{stat.value}</h3>
                      <p className="text-muted-foreground text-center">{stat.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* School Values */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full">
                    <CardContent className="p-6 flex flex-col h-full">
                      <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                      <p className="text-muted-foreground mb-4 flex-grow">{value.description}</p>
                      <motion.div
                        initial={false}
                        animate={{ height: expandedValue === index ? "auto" : 0 }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm mt-2">{value.details}</p>
                      </motion.div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-4 self-end"
                        onClick={() => setExpandedValue(expandedValue === index ? null : index)}
                        aria-expanded={expandedValue === index}
                        aria-controls={`value-details-${index}`}
                      >
                        {expandedValue === index ? "Less" : "More"}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </section>
  )
}