import PageTitle from "@/app/components/pageTitle";
import { getUserById } from "@/lib/actions/user";
import { Card } from "@heroui/card";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import React, { type ReactNode } from "react";
import SectionTitle from "./_components/sectionTitle";
import { Avatar } from "@heroui/avatar";
import UploadAvatar from "./_components/uploadAvatar";
import Link from "next/link";
import { Button } from "@heroui/button";
import prisma from "@/lib/prisma";
const ProfilePage = async () => {
	const { getUser } = await getKindeServerSession();
	const user = await getUser();
	const dbUser = await getUserById(user ? user.id : "");
	const userSubcription = await prisma.subscriptions.findFirst({
		where: { userId: dbUser?.id },
		include: { plan: true },
		orderBy: { createdAt: "desc" },
	});
	return (
		<div>
			<PageTitle title="My Profile" linkCaption="Back To Home Page" href="/" />
			<Card className="m-4 p-4 flex flex-col gap-5">
				<SectionTitle title="Basic information" />
				<div className="flex">
					<div className="flex flex-col items-center">
						<Avatar
							className="w-20 h-20"
							src={dbUser?.avatarUrl ?? "/profile.png"}
						/>
						<UploadAvatar userId={dbUser?.id ?? ""} />
					</div>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					<Attribute
						title="Name"
						value={`${dbUser?.firstName} ${dbUser?.lastName}`}
					/>
					<Attribute title="Email" value={dbUser?.email} />
					<Attribute
						title="Registered on"
						value={dbUser?.createdAt.toLocaleDateString()}
					/>
					<Attribute title="Properties posted" value={1} />
				</div>
			</Card>
			<Card className="m-4 p-4 flex flex-col gap-5">
				<SectionTitle title="Suscription Details" />
				{userSubcription ? (
					<div>
						<Attribute title="Plan" value={userSubcription.plan.name} />
						<Attribute title="Price" value={userSubcription.plan.price} />
						<Attribute
							title="Purchased On"
							value={userSubcription.createdAt.toLocaleDateString()}
						/>
					</div>
				) : (
					<div className="flex flex-col items-center">
						<p className="text-center">No Subscription Found!</p>
					</div>
				)}
				<Link href={"user/subscription"}>
					<Button color="secondary">Purchase Your Suscription</Button>
				</Link>
			</Card>
		</div>
	);
};
export default ProfilePage;

const Attribute = ({ title, value }: { title: string; value: ReactNode }) => {
	return (
		<div className="flex flex-col text-sm">
			<span className="text-slate-800 font-semibold">{title}</span>
			<span className="text-slate-600">{value}</span>
		</div>
	);
};
