"use client"

import { Button } from "~/components/ui/button"
import { Card, CardContent } from "~/components/ui/card"
import { BookOpen, Users, Trophy, Lightbulb } from "lucide-react"
import { CldImage } from "next-cloudinary"
import { motion } from "framer-motion"

export default function AboutUs() {
  return (
    <section className="flex flex-col min-h-screen mt-20">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[50vh] flex items-center justify-center">
          <CldImage
            src="FrontView1_alaabu"
            alt="School building"
            fill
            style={{ objectFit: 'cover' }}
            className="absolute inset-0"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <motion.div
            className="relative z-10 text-center text-white"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">About M.S.NAZ HIGH SCHOOL®</h2>
            <p className="text-xl md:text-2xl mb-8">Nurturing Minds, Shaping Futures</p>
            <Button size="lg" className="transition transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary">
              Learn More
            </Button>
          </motion.div>
        </section>

        {/* Mission Statement */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-8">Our Mission</h3>
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
            <h3 className="text-3xl font-bold text-center mb-12">MSNS by the Numbers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: BookOpen, label: "AP Courses", value: "15+" },
                { icon: Users, label: "Student-Teacher Ratio", value: "18:1" },
                { icon: Trophy, label: "State Championships", value: "25" },
                { icon: Lightbulb, label: "Clubs & Activities", value: "50+" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card>
                    <CardContent className="flex flex-col items-center p-6">
                      <stat.icon className="w-12 h-12 mb-4 text-primary" />
                      <h4 className="text-2xl font-bold mb-2">{stat.value}</h4>
                      <p className="text-muted-foreground">{stat.label}</p>
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
            <h3 className="text-3xl font-bold text-center mb-12">Our Core Values</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Excellence",
                  description: "We strive for excellence in all aspects of education and personal development.",
                },
                {
                  title: "Inclusivity",
                  description: "We celebrate diversity and create an inclusive environment for all students.",
                },
                {
                  title: "Innovation",
                  description: "We embrace innovative teaching methods and technologies to enhance learning.",
                },
                {
                  title: "Integrity",
                  description: "We uphold the highest standards of integrity in our actions and decisions.",
                },
                {
                  title: "Community",
                  description: "We foster a strong sense of community and encourage active participation.",
                },
                {
                  title: "Growth Mindset",
                  description: "We believe in the power of continuous learning and personal growth.",
                },
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <h4 className="text-xl font-bold mb-2">{value.title}</h4>
                      <p className="text-muted-foreground">{value.description}</p>
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
