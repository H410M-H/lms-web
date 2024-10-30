'use client'

import { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { toast } from "~/components/ui/use-toast"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { Card, CardContent, CardFooter, CardHeader } from "~/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, ChevronDown, ChevronUp } from "lucide-react"
import { api } from "~/trpc/react"

const studentSchema = z.object({
  studentMobile: z.string().min(10, "Invalid mobile number"),
  fatherMobile: z.string().min(10, "Invalid mobile number"),
  studentName: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must not exceed 100 characters"),
  gender: z.enum(['MALE', 'FEMALE', 'CUSTOM']),
  dateOfBirth: z.string().min(1, "Date of Birth is required"),
  fatherName: z.string().min(2, "Father's name must be at least 2 characters").max(100, "Father's name must not exceed 100 characters"),
  studentCNIC: z.string().regex(/^\d{4}-\d{7}-\d$/, "Invalid CNIC format"),
  fatherCNIC: z.string().regex(/^\d{4}-\d{7}-\d$/, "Invalid CNIC format"),
  fatherProfession: z.string().min(1, "Father's profession is required"),
  bloodGroup: z.string().optional(),
  guardianName: z.string().optional(),
  caste: z.string().min(1, "Caste is required"),
  currentAddress: z.string().min(5, "Current Address must be at least 5 characters"),
  permanentAddress: z.string().min(5, "Permanent Address must be at least 5 characters"),
  medicalProblem: z.string().optional(),})

type StudentSchema = z.infer<typeof studentSchema>

export default function StudentCreationDialog() {
  const [expandedSection, setExpandedSection] = useState<'academic' | 'personal' | null>('academic')

  const form = useForm<StudentSchema>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      gender: 'CUSTOM',
      bloodGroup: '',
      guardianName: '',
      medicalProblem: '',
    },
  })

  const createStudent = api.student.createStudent.useMutation({
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: `Student registered successfully with registration number: ${data.registrationNumber}`,
      })
      form.reset()
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "An error occurred",
        variant: "destructive",
      })
    },
  })

  const onSubmit = (data: StudentSchema) => {
    createStudent.mutate(data)
  }

  const toggleSection = (section: 'academic' | 'personal') => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  return (
<div className="min-h-screen bg-gradient-to-b from-green-100 to-blue-100 p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto w-full max-w-4xl"
      >
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl rounded-3xl overflow-hidden">
          <CardHeader className="bg-teal-600 text-white p-6">
            <h2 className="text-3xl font-bold">Student Registration Form</h2>
          </CardHeader>
          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-4">
                  <motion.div
                    initial={false}
                    animate={{ height: expandedSection === 'academic' ? 'auto' : 60 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div
                      className="flex justify-between items-center cursor-pointer bg-teal-100 p-4 rounded-t-lg"
                      onClick={() => toggleSection('academic')}
                    >
                      <h3 className="text-2xl font-semibold text-teal-700">Academic Data</h3>
                      {expandedSection === 'academic' ? <ChevronUp /> : <ChevronDown />}
                    </div>
                    <AnimatePresence>
                      {expandedSection === 'academic' && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 bg-teal-50 rounded-b-lg"
                        >
                          <FormField
                            control={form.control}
                            name="studentName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Student Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Student Name" {...field} className="transition-all duration-300 focus:ring-2 focus:ring-teal-500" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="dateOfBirth"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Date of Birth</FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} className="transition-all duration-300 focus:ring-2 focus:ring-teal-500" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
              control={form.control}
              name="studentMobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student Mobile</FormLabel>
                  <FormControl>
                    <Input placeholder="Student Mobile" {...field} className="transition-all duration-300 focus:ring-2 focus:ring-red-500" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fatherName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Father Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Father's Name" {...field} className="transition-all duration-300 focus:ring-2 focus:ring-red-500" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fatherMobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Father Mobile</FormLabel>
                  <FormControl>
                    <Input placeholder="Father Mobile" {...field} className="transition-all duration-300 focus:ring-2 focus:ring-red-500" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="studentCNIC"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student CNIC</FormLabel>
                  <FormControl>
                    <Input placeholder="0000-0000000-0" {...field} className="transition-all duration-300 focus:ring-2 focus:ring-red-500" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fatherCNIC"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Father CNIC</FormLabel>
                  <FormControl>
                    <Input placeholder="0000-0000000-0" {...field} className="transition-all duration-300 focus:ring-2 focus:ring-red-500" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

    <motion.div
      initial={false}
      animate={{ height: expandedSection === 'personal' ? 'auto' : 60 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden"
    >
      <div
        className="flex justify-between items-center cursor-pointer bg-red-100 p-4 rounded-t-lg"
        onClick={() => toggleSection('personal')}
      >
        <h3 className="text-2xl font-semibold text-red-700">Personal Data</h3>
        {expandedSection === 'personal' ? <ChevronUp /> : <ChevronDown />}
      </div>
      <AnimatePresence>
        {expandedSection === 'personal' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 bg-red-50 rounded-b-lg"
          >
                                      <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Gender</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-teal-500">
                                      <SelectValue placeholder="Select gender" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="MALE">Male</SelectItem>
                                    <SelectItem value="FEMALE">Female</SelectItem>
                                    <SelectItem value="CUSTOM">Custom</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
          <FormField
              control={form.control}
              name="fatherProfession"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Father Profession</FormLabel>
                  <FormControl>
                    <Input placeholder="Father Profession" {...field} className="transition-all duration-300 focus:ring-2 focus:ring-red-500" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bloodGroup"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blood Group</FormLabel>
                  <FormControl>
                    <Input placeholder="Blood Group" {...field} className="transition-all duration-300 focus:ring-2 focus:ring-red-500" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="guardianName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Guardian Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Guardian Name" {...field} className="transition-all duration-300 focus:ring-2 focus:ring-red-500" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="caste"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Caste</FormLabel>
                  <FormControl>
                    <Input placeholder="Caste" {...field} className="transition-all duration-300 focus:ring-2 focus:ring-red-500" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currentAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Current Address" {...field} className="transition-all duration-300 focus:ring-2 focus:ring-red-500" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="permanentAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Permanent Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Permanent Address" {...field} className="transition-all duration-300 focus:ring-2 focus:ring-red-500" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="medicalProblem"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medical Problem</FormLabel>
                  <FormControl>
                    <Input placeholder="Medical Problem" {...field} className="transition-all duration-300 focus:ring-2 focus:ring-red-500" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
</motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="bg-gray-50 p-6 flex justify-end">
            <Button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105"
              disabled={createStudent.isPending}
              onClick={form.handleSubmit(onSubmit)}
            >
              {createStudent.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Registering...
                </>
              ) : (
                'Register Student'
              )}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}