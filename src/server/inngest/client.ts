/* eslint-disable */

import { Inngest } from "inngest"
import { db } from "../db"

export const inngest = new Inngest({ id: "pair-programming-challenge" })

const runTask = inngest.createFunction(
  { id: "run-task" },
  { event: "app/task.started" },
  async ({ event, step }) => {
    const taskId = event.data.taskId as number
    try {
      await step.sleep("Simulating slow startup", "1s")

      await db.task.update({
        where: { id: taskId },
        data: { status: "working" },
      })

      await step.sleep("Simulating doing work", "5s")

      await db.task.update({
        where: { id: taskId },
        data: {
          status: "completed",
          result:
            "In a recent neighbor dispute case, our client, Mr. Johnson, claimed his neighbor, Ms. Smith, built a fence encroaching two feet into his property, blocking sunlight to his vegetable garden. Despite multiple attempts to resolve the issue amicably, Ms. Smith refused to relocate the fence, leading Mr. Johnson to seek legal action for property encroachment and damages to his garden. The case required detailed property surveys, mediation efforts, and preparation for potential court proceedings.",
        },
      })
    } catch (e) {
      console.error(e)

      await db.task.update({
        where: { id: taskId },
        data: { status: "failed" },
      })
    }
  }
)
export const inngestFunctions = [runTask]
