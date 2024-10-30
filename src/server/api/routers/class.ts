import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { ClassCategory } from "@prisma/client";

// Define the ClassProps type for type safety.
type ClassProps = {
  classId: string;
  className: string;
  section?: string; // Section is optional.
  category: ClassCategory;
  fee: number;
};

export const ClassRouter = createTRPCRouter({
  // Fetch all classes from the database.
  getClasses: publicProcedure.query(async ({ ctx }) => {
    try {
      const classes = await ctx.db.classes.findMany();
      return classes as ClassProps[];
    } catch (error) {
      console.error('Error in getClasses:', error);
      throw new TRPCError({ 
        code: 'INTERNAL_SERVER_ERROR', 
        message: error instanceof Error ? error.message : "Failed to retrieve classes." 
      });
    }
  }),

  // Group classes by category and return an object structure.
  getGroupedClasses: publicProcedure.query(async ({ ctx }) => {
    try {
      const classes = await ctx.db.classes.findMany();
      const groupedClasses: Record<ClassCategory, ClassProps[]> = {
          Montessori: [],
          Primary: [],
          Middle: [],
          SSC_I: [],
          SSC_II: []
      };

      classes.forEach((classData) => {
        if (!groupedClasses[classData.category]) {
          groupedClasses[classData.category] = [];
        }
        groupedClasses[classData.category].push(classData as ClassProps);
      });

      return groupedClasses;
    } catch (error) {
      console.error('Error in getGroupedClasses:', error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to retrieve grouped classes.',
      });
    }
  }),

  // Create a new class with the provided input data.
  createClass: publicProcedure
    .input(
      z.object({
        className: z.string(),
        section: z.enum(["ROSE", "TULIP"]).optional(),
        category: z.nativeEnum(ClassCategory),
        fee: z.number().min(0),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.classes.create({
          data: {
            className: input.className,
            section: input.section,
            category: input.category,
            fee: input.fee,
          },
        });
      } catch (error) {
        console.error('Error in createClass:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create class.',
        });
      }
    }),

  // Delete multiple classes by their IDs.
  deleteClassesByIds: publicProcedure
    .input(
      z.object({
        classIds: z.string().array(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.classes.deleteMany({
          where: {
            classId: {
              in: input.classIds,
            },
          },
        });
      } catch (error) {
        console.error('Error in deleteClassesByIds:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to delete classes.',
        });
      }
    }),
});
