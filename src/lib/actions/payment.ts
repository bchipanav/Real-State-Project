"use server";
import Stripe from "stripe";

export const createPaymentIntent = async (
	amount: number,
	description: string,
) => {
	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
		typescript: true,
		apiVersion: "2025-04-30",
	});

	const paymentIntent = await stripe.paymentIntents.create({
		amount,
		description,
		currency: "USD",
	});
	return paymentIntent;
};
