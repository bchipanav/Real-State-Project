import validator from "validator";
import { z } from "zod";

export const AddPropertyFormSchema = z.object({
	name: z.string().min(1, "Please enter the name"),
	description: z.string().min(2, "Please enter a description"),
	typeId: z
		.string()
		.min(1, "Select the type of your property")
		.transform((data: unknown) => Number(data)),
	statusId: z
		.string()
		.min(1, "Select the status of your property")
		.transform((data: unknown) => Number(data)),
	price: z
		.string()
		.min(1, "Please enter the price")
		.regex(/^[0-9]+$/, "Please enter a number")
		.transform((data: unknown) => Number(data)),
	location: z.object({
		streetAddress: z.string().min(1, "Please enter a street address"),
		city: z.string().min(1, "Please enter a city name"),
		state: z.string().min(1, "Please enter a state name"),
		zip: z
			.string()
			.refine(
				(data) => validator.isPostalCode(data, "CA"),
				"Enter the zip code",
			),
		region: z.string().min(1, "Please enter a region name"),
		landmark: z.string().min(1, "Please enter landmark"),
	}),
	propertyFeature: z.object({
		bedrooms: z
			.string()
			.regex(/^[0-9]+$/, "Please enter a number of bedrooms")
			.transform((data: unknown) => Number(data)),
		bathrooms: z
			.string()
			.regex(/^[0-9]+$/, "Please enter a number of bathrooms")
			.transform((data: unknown) => Number(data)),
		parkingSpots: z
			.string()
			.regex(/^[0-9]+$/, "Please enter a number of parking spots")
			.transform((data: unknown) => Number(data)),
		area: z
			.string()
			.regex(/^[0-9]+$/, "Please enter the area")
			.transform((data: unknown) => Number(data)),
		hasSwimmingPool: z.boolean(),
		hasGardenYard: z.boolean(),
		hasBalcony: z.boolean(),
	}),
	contact: z.object({
		name: z.string().min(1, "Please enter a contact name"),
		phone: z
			.string()
			.refine(validator.isMobilePhone, "Please enter a valid phone number"),
		email: z.string().email(),
	}),
});
