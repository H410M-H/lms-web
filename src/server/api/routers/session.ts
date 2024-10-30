import { TRPCClientError } from "@trpc/client"
import { createTRPCRouter, publicProcedure } from "../trpc"
import { z } from "zod"
import { TRPCError } from "@trpc/server"




export const SessionRouter = createTRPCRouter({

    getSessions: publicProcedure.query(async ({ ctx }) => {
        try {
            const sessions: SessionProps[] = await ctx.db.sessions.findMany()
            return sessions
        } catch (error) {
            if (error instanceof TRPCClientError) {
                console.error(error.message)
                throw new Error(error.message)
            }
            console.error(error)
            throw new Error("Something went wrong.")
        }
    }),

    getGroupedSessions: publicProcedure.query(async ({ ctx }) => {
        try {
            const sessions: SessionProps[] = await ctx.db.sessions.findMany()
            const groupedSessions = new Map<string,SessionProps[]>()

            sessions.forEach((sessionData)=>{
                const key = groupedSessions.has(sessionData.sessionFrom)
                const data = groupedSessions.get(sessionData.sessionFrom)
                if(key && data  && data.length!=0) {
                    data.push(sessionData)
                    groupedSessions.set(sessionData.sessionFrom,data)
                }else{
                    groupedSessions.set(sessionData.sessionFrom,[sessionData])
                }

            })  
            const groupedArray = Array.from(groupedSessions,(([key,value])=>({sessionFrom:key,sessions:value})))
            return groupedArray
        } catch (error) {
            if (error instanceof TRPCClientError) {
                console.error(error.message)
                throw new Error(error.message)
            }
            console.error(error)
            throw new Error("Something went wrong.")
        }
    }),

    createSession: publicProcedure
    .input(
        z.object({
          sessionName: z.string(),
          sessionFrom: z.string({
            required_error: "Session From date is required",
          }),
          sessionTo: z.string({
            required_error: "Session To date is required",
          }),
        })
      )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.sessions.create({
            data: {
              sessionName: input.sessionName,
              sessionFrom: input.sessionFrom,
              sessionTo: input.sessionTo,
            }
          });
            } catch (error) {
                if (error instanceof TRPCClientError) {
                    console.error(error.message)
                    throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: error.message })
                }
                console.error(error)
                throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: "Something went wrong." })
            }
        }),

    deleteSessionsByIds: publicProcedure
        .input(z.object({
            sessionIds: z.string().array(),
        }))
        .mutation(async ({ ctx, input }) => {
            try {

                await ctx.db.sessions.deleteMany({
                    where: {
                        sessionId: {
                            in: input.sessionIds
                        }
                    }
                })
            } catch (error) {
                if (error instanceof TRPCClientError) {
                    console.error(error.message)
                    throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: error.message })
                }
                console.error(error)
                throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: "Something went wrong." })
            }
        })
})