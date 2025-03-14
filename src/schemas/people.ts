import { z } from "zod";

export const personFormSchema = z.object({
  name: z.string().min(2),
  date_of_birth: z.date(),
  salutation: z.string().optional(),
  relation: z
    .array(
      z.object({
        id: z.string(),
      })
    )
    .transform((data) => data.map((d) => d.id)),
  gender: z.string(),
  email: z.string().email().optional(),
  image: z.record(z.any()).nullable(),
  mobile: z.string().length(10).optional(),
  extended_family: z.boolean().optional(),
  company: z.string().optional(),
  social_link: z.string().url().optional(),
  ex: z.boolean().optional(),
  meta_data: z.object({}).optional(),
  additional_info: z.string().optional(),
});

export type FormFields = z.infer<typeof personFormSchema>;
