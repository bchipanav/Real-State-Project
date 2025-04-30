import React from "react";
import type { PropertyStatus, PropertyType } from "@prisma/client";
import {
	Button,
	Card,
	cn,
	Input,
	Select,
	SelectItem,
	Textarea,
} from "@heroui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
interface Props {
	className?: string;
	types: PropertyType[];
	statuses: PropertyStatus[];
	next: () => void;
}

const Basic = (props: Props) => {
	const handleNext = () => props.next();
	return (
		<Card
			className={cn(
				"p-2 gap-3 grid grid-cols-1 md:grid-cols-3 ",
				props.className,
			)}
		>
			<Input label="Name" className="md:col-span-3" />
			<Textarea label="Description" className="md:col-span-3" />
			<Select label="Type" selectionMode="single">
				{props.types.map((item) => (
					<SelectItem key={item.id} data-value={item.id}>
						{item.value}
					</SelectItem>
				))}
			</Select>
			<Select label="Status" selectionMode="single">
				{props.statuses.map((item) => (
					<SelectItem key={item.id} data-value={item.id}>
						{item.value}
					</SelectItem>
				))}
			</Select>
			<Input label="Price" />
			<div className="flex justify-center col-span-3 gap-3">
				<Button
					isDisabled
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

export default Basic;
