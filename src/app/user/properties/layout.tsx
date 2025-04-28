import { Button } from "@heroui/button";
import Link from "next/link";
import React, { type ReactNode } from "react";

interface Props {
	children: ReactNode;
}
const PropertiesLayout = ({ children }: Props) => {
	return (
		<div>
			<div className="flex items-center justify-between p-2 bg-primary-400">
				<h2 className="text-white text-xl font-semibold px-2">
					Mis propiedades
				</h2>
				<Button color="secondary">
					<Link href="/user/properties/add">Agregar propiedad</Link>
				</Button>
			</div>
			{children}
		</div>
	);
};

export default PropertiesLayout;
