import prisma from "@/lib/prisma";
import React from "react";
import AddPropertyForm from "../../add/_components/AddPropertyForm";
import { notFound } from "next/navigation";
interface Props {
	params: { id: string };
}

const EditPropertyPage = async ({ params }: Props) => {
	const [propertyTypes, propertyStatuses, property] = await Promise.all([
		prisma.propertyType.findMany(),
		prisma.propertyStatus.findMany(),
		prisma.property.findUnique({
			where: {
				id: +params.id,
			},
			include: {
				location: true,
				feature: true,
				contact: true,
				images: true,
			},
		}),
	]);
	if (!property) return notFound();
	return (
		<AddPropertyForm
			types={propertyTypes}
			statuses={propertyStatuses}
			property={property}
			isEdit={true}
		/>
	);
};

export default EditPropertyPage;
