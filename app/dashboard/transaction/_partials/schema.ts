import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const transactionSchema = z.object({
  id: z.number(),
  date: z.string(),
  type: z.string(),
  category: z.string(),
  paymentMethod: z.string(),
  amount: z.string(),
  description: z.string()
})
export type Transaction = z.infer<typeof transactionSchema>
