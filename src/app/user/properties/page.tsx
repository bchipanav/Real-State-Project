import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";

const PropertiesPage = async () => {
	const { getUser } = await getKindeServerSession();
	const user = await getUser();
	const propertiesPromise = prisma.property.findMany({
		where: {
			userId: user.id,
		},
		include: {
			type: true,
			status: true,
		},
	});
	const [properties] = await Promise.all([propertiesPromise]);
	console.log({ properties });
	return <div>PropertiesPage</div>;
};

export default PropertiesPage;
