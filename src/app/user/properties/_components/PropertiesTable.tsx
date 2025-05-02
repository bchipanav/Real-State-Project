import { Table, TableColumn, TableHeader } from "@heroui/react";
import type { Prisma } from "@prisma/client";
import React from "react";

type Props = {
	properties: Prisma.PropertyGetPayload<{
		include: {
			type: true;
			status: true;
		};
	}>[];
};
const PropertiesTable = ({ properties }: Props) => {
	return (
		<div>
			<Table>
				<TableHeader>
					<TableColumn>NAME</TableColumn>
					<TableColumn>PRICE</TableColumn>
					<TableColumn>TYPE</TableColumn>
					<TableColumn>STATUS</TableColumn>
					<TableColumn>ACTIONS</TableColumn>
				</TableHeader>
			</Table>
		</div>
	);
};

export default PropertiesTable;
