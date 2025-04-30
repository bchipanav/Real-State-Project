import React from "react";
import { Button, Card, Checkbox, cn, Input } from "@heroui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
interface Props {
	className?: string;
	previous: () => void;
	next: () => void;
}

const Features = (props: Props) => {
	const handleNext = () => props.next();
	return (
		<Card
			className={cn(
				"p-2  grid grid-cols-1 md:grid-cols-2 gap-3",
				props.className,
			)}
		>
			<Input label="Bedrooms" />
			<Input label="Bathrooms" />
			<Input label="Parking Spots" />
			<Input label="Area" />
			<div className="flex items-center justify-between">
				<Checkbox>Has Swimming Pool</Checkbox>
				<Checkbox>Has Gard/Yard</Checkbox>
				<Checkbox>Has Balcony/Patio</Checkbox>
			</div>

			<div className="flex justify-center col-span-2 gap-3">
				<Button
					onClick={props.previous}
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
					onClick={handleNext}
				>
					Next
				</Button>
			</div>
		</Card>
	);
};

export default Features;
