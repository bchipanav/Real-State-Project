import prisma from "@/lib/prisma";
import type { SubscriptionPlan } from "@prisma/client";
import React from "react";
import PurchasePlan from "./_components/PurchasePlan";

const SubscriptionPage = async () => {
	const subscriptionPlansPromise = prisma.subscriptionPlan.findMany();
	const [subscriptionPlans] = await Promise.all([subscriptionPlansPromise]);

	return (
		<div className="grid grid-cols01 lg:grid-cols-3 gap-5 p-4">
			{subscriptionPlans.map((item) => (
				<Plan key={item.id} plan={item} />
			))}
		</div>
	);
};

const Plan = ({ plan }: { plan: SubscriptionPlan }) => {
	return (
		<div className="border rounded shadow flex flex-col gap-5 justify-between p-5">
			<h1 className="text-xl font-bold text-primary-500 text-center">
				{plan.name}
			</h1>
			<h1 className="text-2xl lg:text-4xl text-orange-600 font-bold text-center">
				$ {plan.price.toString()}
			</h1>
			<hr />
			<div className="flex flex-col gap-1 text-center">
				{plan.features.split(",").map((feature) => (
					<p key={feature} className="text-slate-500 text-sm">
						{feature.trim()}
					</p>
				))}
			</div>
			<PurchasePlan plan={plan} />
		</div>
	);
};

export default SubscriptionPage;
