import React from "react";
import { Button, Card, cn, Input, Textarea } from "@heroui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { useFormContext } from "react-hook-form";
import type { AddPropertyInputType } from "./AddPropertyForm";
interface Props {
	className?: string;
	previous: () => void;
	next: () => void;
}

const Location = (props: Props) => {
	const {
		register,
		formState: { errors },
		trigger,
		getValues,
	} = useFormContext<AddPropertyInputType>();
	const handleNext = async () => {
		if (
			await trigger([
				"location.streetAddress",
				"location.city",
				"location.region",
				"location.state",
				"location.zip",
			])
		)
			props.next();
	};
	return (
		<Card
			className={cn(
				"p-2  grid grid-cols-1 md:grid-cols-2 gap-3",
				props.className,
			)}
		>
			<Input
				{...register("location.streetAddress")}
				errorMessage={errors.location?.streetAddress?.message}
				isInvalid={!!errors.location?.streetAddress}
				label="Street Address"
				defaultValue={
					getValues().location ? getValues().location.streetAddress : undefined
				}
			/>
			<Input
				{...register("location.zip")}
				errorMessage={errors.location?.zip?.message}
				isInvalid={!!errors.location?.zip}
				label="ZIP/ Postal Code"
				defaultValue={
					getValues().location ? getValues().location.zip : undefined
				}
			/>
			<Input
				{...register("location.city")}
				errorMessage={errors.location?.city?.message}
				isInvalid={!!errors.location?.city}
				label="City"
				defaultValue={
					getValues().location ? getValues().location.city : undefined
				}
			/>
			<Input
				{...register("location.state")}
				errorMessage={errors.location?.state?.message}
				isInvalid={!!errors.location?.state}
				label="State"
				defaultValue={
					getValues().location ? getValues().location.state : undefined
				}
			/>
			<Input
				{...register("location.region")}
				errorMessage={errors.location?.region?.message}
				isInvalid={!!errors.location?.region}
				label="Region/Neighborhood"
				className="col-span-2"
				defaultValue={
					getValues().location ? getValues().location.region : undefined
				}
			/>
			<Textarea
				{...register("location.landmark")}
				errorMessage={errors.location?.landmark?.message}
				isInvalid={!!errors.location?.landmark}
				label="Landmarks"
				className="col-span-2"
				defaultValue={
					getValues().location ? getValues().location.landmark : undefined
				}
			/>
			<div className="flex justify-center col-span-2 gap-3">
				<Button
					onPress={props.previous}
					startContent={<ChevronLeftIcon className="w-6" />}
					color="primary"
					className="w-36"
				>
					Previous
				</Button>
				<Button
					endContent={<ChevronRightIcon className="w-6" />}
					color="primary"
					className="w-36"
					onPress={handleNext}
				>
					Next
				</Button>
			</div>
		</Card>
	);
};

export default Location;
