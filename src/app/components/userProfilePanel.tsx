"use client";
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	User,
} from "@heroui/react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import type { User as PrismaUser } from "@prisma/client";
import Link from "next/link";
import React from "react";

interface Props {
	user: PrismaUser;
}
const UserProfilePanel = ({ user }: Props) => {
	return (
		<Dropdown placement="bottom-start">
			<DropdownTrigger>
				<User
					as="button"
					avatarProps={{
						isBordered: true,
						src: user.avatarUrl ?? "/profile.png",
					}}
					className="transition-transform"
					name={`${user.firstName} ${user.lastName}`}
				/>
			</DropdownTrigger>
			<DropdownMenu aria-label="User Actions" variant="flat">
				<DropdownItem key="profile">
					<Link href="/user/profile">Mi Perfil</Link>
				</DropdownItem>
				<DropdownItem key="properties">
					<Link href="/user/properties">Propiedades</Link>
				</DropdownItem>
				<DropdownItem key="logout" color="danger">
					<LogoutLink>Cerrar sesión</LogoutLink>
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
};

export default UserProfilePanel;
