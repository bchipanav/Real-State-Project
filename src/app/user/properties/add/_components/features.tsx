import React from "react";
import { Button, Card, Checkbox, cn, Input } from "@heroui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { Controller, useFormContext } from "react-hook-form";
import type { AddPropertyInputType } from "./AddPropertyForm";
interface Props {
	className?: string;
	previous: () => void;
	next: () => void;
}

const Features = (props: Props) => {
	const {
		register,
		control,
		trigger,
		formState: { errors },
	} = useFormContext<AddPropertyInputType>();
	const handleNext = async () => {
		if (
			await trigger([
				"propertyFeature.area",
				"propertyFeature.bathrooms",
				"propertyFeature.bedrooms",
				"propertyFeature.parkingSpots",
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
				{...register("propertyFeature.bedrooms")}
				errorMessage={errors.propertyFeature?.bedrooms?.message}
				isInvalid={!!errors.propertyFeature?.bedrooms}
				label="Bedrooms"
			/>
			<Input
				{...register("propertyFeature.bathrooms")}
				errorMessage={errors.propertyFeature?.bathrooms?.message}
				isInvalid={!!errors.propertyFeature?.bathrooms}
				label="Bathrooms"
			/>
			<Input
				{...register("propertyFeature.parkingSpots")}
				errorMessage={errors.propertyFeature?.parkingSpots?.message}
				isInvalid={!!errors.propertyFeature?.parkingSpots}
				label="Parking Spots"
			/>
			<Input
				{...register("propertyFeature.area")}
				errorMessage={errors.propertyFeature?.area?.message}
				isInvalid={!!errors.propertyFeature?.area}
				label="Area"
			/>
			<div className="flex items-center justify-between">
				<Controller
					control={control}
					name="propertyFeature.hasSwimmingPool"
					render={({ field }) => (
						<Checkbox
							onChange={field.onChange}
							onBlur={field.onBlur}
							checked={field.value ?? false}
						>
							Has Swimming Pool
						</Checkbox>
					)}
				/>

				<Controller
					control={control}
					name="propertyFeature.hasGarden"
					render={({ field }) => (
						<Checkbox
							onChange={field.onChange}
							onBlur={field.onBlur}
							checked={field.value ?? false}
						>
							Has Gard/Yard
						</Checkbox>
					)}
				/>

				<Controller
					control={control}
					name="propertyFeature.hasBalcony"
					render={({ field }) => (
						<Checkbox
							onChange={field.onChange}
							onBlur={field.onBlur}
							checked={field.value ?? false}
						>
							Has Balcony/Patio
						</Checkbox>
					)}
				/>
			</div>

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

export default Features;
