import React from "react";
import { Button, Card, cn, Input, Textarea } from "@heroui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
interface Props {
	className?: string;
	previous: () => void;
	next: () => void;
}

const Location = (props: Props) => {
	const handleNext = () => props.next();
	return (
		<Card
			className={cn(
				"p-2  grid grid-cols-1 md:grid-cols-2 gap-3",
				props.className,
			)}
		>
			<Input label="Street Address" />
			<Input label="ZIP/ Postal Code" />
			<Input label="City" />
			<Input label="State" />
			<Input label="Region/Neighborhood" className="col-span-2" />
			<Textarea label="Landmarks" className="col-span-2" />
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

export default Location;
