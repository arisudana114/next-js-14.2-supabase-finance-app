import { z } from "zod";
import { categories, dateRangeValues, types } from "./consts";

export const settingsSchema = z.object({
  fullName: z.string().min(2),
  defaultView: z.enum(dateRangeValues),
});

export const transactionSchema = z
  .object({
    type: z.enum(types),
    category: z.preprocess(
      (val: any) => (val?.length ? val : undefined),
      z.string().optional()
    ),
    amount: z.coerce.number().min(1, { message: "Amount must be at least 1" }),
    description: z.string().optional(),
    created_at: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Date needs to contain a valid date",
    }),
  })
  .refine(
    (data: any) => {
      if (data.type === "Expense") {
        return (
          data.category !== undefined && categories.includes(data.category)
        );
      }
      return true;
    },
    {
      path: ["category"],
      message: "Category is required for Expense",
    }
  );