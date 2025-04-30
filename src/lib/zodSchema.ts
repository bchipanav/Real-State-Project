import { z } from "zod";

export const AddPropertyFormSchema = z.object({
	name: z.string(),
	description: z.string(),
	typeId: z.string().transform((data: unknown) => Number(data)),
	statusId: z.string().transform((data: unknown) => Number(data)),
	price: z.string().transform((data: unknown) => Number(data)),
});
