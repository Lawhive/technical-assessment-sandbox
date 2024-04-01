/* eslint-disable */

import { z } from "zod"

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"
import { inngest } from "~/server/inngest/client"

export const taskRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        url: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const task = await ctx.db.task.create({
        data: { url: input.url },
      })

      await inngest.send({
        name: "app/task.started",
        data: { taskId: task.id, url: task.url },
      })

      return { id: task.id }
    }),

  get: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.task.findFirstOrThrow({
        where: { id: input.id },
      })
    }),
})
