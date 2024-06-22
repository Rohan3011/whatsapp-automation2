import { z } from "zod";

export const eventFormSchema = z.object({
  name: z.string().min(2),
  date: z.date(),
  person: z
    .object({
      id: z.string(),
    })
    .transform((data) => data.id),
  meta_data: z.object({}).optional(),
  additional_info: z.string().optional(),
});

export type FormFields = z.infer<typeof eventFormSchema>;
