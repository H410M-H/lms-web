import { TRPCClientError } from "@trpc/client";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const FeeRouter = createTRPCRouter({
  getFees: publicProcedure.query(async ({ ctx }) => {
    try {
      const fees: FeeProps[] = await ctx.db.fees.findMany();
      return fees;
    } catch (error) {
      if (error instanceof TRPCClientError) {
        console.error(error.message);
        throw new Error(error.message);
      }
      console.error(error);
      throw new Error("Something went wrong.");
    }
  }),

  createFee: publicProcedure
    .input(
      z.object({
        feeName: z.string(),
        feeTuition: z.number().nonnegative(),
        feePaper: z.number().nonnegative(),
        feeSport: z.number().nonnegative(),
        feeIdcard: z.number().nonnegative(),
        feeComm: z.number().nonnegative(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.fees.create({
          data: {
            feeName: input.feeName,
            feeTuition: input.feeTuition,
            feePaper: input.feePaper,
            feeSport: input.feeSport,
            feeIdcard: input.feeIdcard,
            feeComm: input.feeComm,
          },
        });
      } catch (error) {
        console.error(error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: "Failed to create fee." });
      }
    }),

  deleteFeesByIds: publicProcedure
    .input(z.object({
      feeIds: z.array(z.string()),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.fees.deleteMany({
          where: {
            feeId: {
              in: input.feeIds,
            },
          },
        });
      } catch (error) {
        console.error(error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: "Failed to delete fees." });
      }
    }),
});
