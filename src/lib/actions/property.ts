"use server";
import type { AddPropertyInputType } from "@/app/user/properties/add/_components/AddPropertyForm";
import prisma from "../prisma";
import type { Property } from "@prisma/client";

export async function saveProperty(
	propertyData: AddPropertyInputType,
	imagesUrls: string[],
	userId: string,
) {
	const basic: Omit<Property, "id"> = {
		name: propertyData.name,
		description: propertyData.description,
		price: propertyData.price,
		statusId: propertyData.statusId,
		typeId: propertyData.typeId,
		userId,
	};
	const result = await prisma.property.create({
		data: {
			...basic,
			location: {
				create: propertyData.location,
			},
			feature: {
				create: propertyData.propertyFeature,
			},
			contact: {
				create: propertyData.contact,
			},
			images: {
				create: imagesUrls.map((img) => ({
					url: img,
				})),
			},
		},
	});
	console.log({ result });
	return result;
}

export async function editProperty(
	propertyData: AddPropertyInputType,
	propertyId: number,
	newImagesUrl: string[],
	deleteImageID: number[],
) {
	const result = await prisma.property.update({
		where: {
			id: propertyId,
		},
		data: {
			name: propertyData.name,
			price: propertyData.price,
			statusId: propertyData.statusId,
			typeId: propertyData.typeId,
			description: propertyData.description,
			contact: {
				update: {
					...propertyData.contact,
				},
			},
			feature: {
				update: {
					...propertyData.propertyFeature,
				},
			},
			location: {
				update: {
					...propertyData.location,
				},
			},
			images: {
				create: newImagesUrl.map((img) => ({
					url: img,
				})),
				deleteMany: {
					id: { in: deleteImageID },
				},
			},
		},
	});
	console.log({ result });
	return result;
}
