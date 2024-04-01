import { z } from "zod"

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"

export const caseRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        paymentType: z.string(),
        data: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      return ctx.db.legalCase.create({
        data: {
          title: input.title,
          description: input.description,
          paymentType: input.paymentType,
          data: input.data,
          isPaid: false,
          status: "initial",
        },
      })
    }),
  pay: publicProcedure
    .input(
      z.object({
        id: z.number(),
        paidAmount: z.number(),
        feeAmount: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      return ctx.db.legalCase.update({
        where: { id: input.id },
        data: {
          isPaid: true,
          paidAmount: input.paidAmount,
          feeAmount: input.feeAmount,
        },
      })
    }),

  list: publicProcedure.query(({ ctx }) => {
    return ctx.db.legalCase.findMany({
      orderBy: { createdAt: "desc" },
    })
  }),
})
