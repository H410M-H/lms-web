import { TRPCError } from "@trpc/server"
import { createTRPCRouter, publicProcedure } from "../trpc"
import { z } from "zod"

const studentSchema = z.object({
  studentMobile: z.string(),
  fatherMobile: z.string(),
  studentName: z.string(),
  gender: z.enum(['MALE', 'FEMALE', 'CUSTOM']),
  dateOfBirth: z.string(),
  fatherName: z.string(),
  studentCNIC: z.string(),
  fatherCNIC: z.string(),
  fatherProfession: z.string(),
  bloodGroup: z.string().optional(),
  guardianName: z.string().optional(),
  caste: z.string(),
  currentAddress: z.string(),
  permanentAddress: z.string(),
  medicalProblem: z.string().optional(),
})

export const StudentRouter = createTRPCRouter({
  getStudents: publicProcedure.query(async ({ ctx }) => {
    try {
      const students = await ctx.db.students.findMany()
      return students
    } catch (error) {
      console.error(error)
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: "Something went wrong.",
      })
    }
  }),

  getUnAllocateStudents: publicProcedure.query(async ({ ctx }) => {
    try {
      const students = await ctx.db.students.findMany({
        where: {
          isAssign: false
        }
      })
      return students
    } catch (error) {
      console.error(error)
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: "Something went wrong.",
      })
    }
  }),

  createStudent: publicProcedure
  .input(studentSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const currentYear = new Date().getFullYear().toString().slice(-2)
      const latestStudent = await ctx.db.students.findFirst({
        where: {
          registrationNumber: {
            startsWith: `MSNS${currentYear}`,
          },
        },
        orderBy: {
          registrationNumber: 'desc',
        },
      })
      let newRegNumber
      if (latestStudent) {
        const latestNumber = parseInt(latestStudent.registrationNumber.slice(-4))
        newRegNumber = `MSNS${currentYear}${(latestNumber + 1).toString().padStart(4, '0')}`
      } else {
        newRegNumber = `MSNS${currentYear}0001`
      }
      const newStudent = await ctx.db.students.create({
        data: {
          ...input,
          registrationNumber: newRegNumber,
          admissionNumber: newRegNumber, // Assuming admission number is the same as registration number
          dateOfBirth: new Date(input.dateOfBirth).toISOString(),
        }
      })
      return newStudent
    } catch (error) {
      console.error(error)
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Something went wrong'
      })
    }
  }),

  deleteStudentsByIds: publicProcedure
    .input(z.object({
      studentIds: z.string().array(),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.students.deleteMany({
          where: {
            studentId: {
              in: input.studentIds,
            },
          },
        })
      } catch (error) {
        console.error(error)
        throw new TRPCError({ 
          code: 'INTERNAL_SERVER_ERROR', 
          message: "Something went wrong." 
        })
      }
    }),
})