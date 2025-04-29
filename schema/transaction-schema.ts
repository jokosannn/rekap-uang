import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const transactionSchema = z.object({
  id: z.string(),
  date: z.date(),
  type: z.string(),
  category: z.string(),
  paymentMethod: z.string(),
  amount: z.number(),
  description: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
})

export type Transaction = z.infer<typeof transactionSchema>
