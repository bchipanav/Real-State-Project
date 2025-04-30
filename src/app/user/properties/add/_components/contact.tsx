import React from "react";
import { Button, Card, cn, Input } from "@heroui/react";
import { ChevronLeftIcon, PlusCircleIcon } from "@heroicons/react/16/solid";
import { useFormContext } from "react-hook-form";
import type { AddPropertyInputType } from "./AddPropertyForm";
interface Props {
	className?: string;
	previous: () => void;
}

const Contact = (props: Props) => {
	const {
		register,
		formState: { errors },
	} = useFormContext<AddPropertyInputType>();
	return (
		<Card
			className={cn(
				"p-2  grid grid-cols-1 md:grid-cols-3 gap-3",
				props.className,
			)}
		>
			<Input
				{...register("contact.name")}
				errorMessage={errors.contact?.name?.message}
				isInvalid={!!errors.contact?.name}
				label="Contact Name"
			/>
			<Input
				{...register("contact.phone")}
				errorMessage={errors.contact?.phone?.message}
				isInvalid={!!errors.contact?.phone}
				label="Phone"
			/>
			<Input
				{...register("contact.email")}
				errorMessage={errors.contact?.email?.message}
				isInvalid={!!errors.contact?.email}
				label="E-mail"
			/>
			<div className="flex justify-center col-span-3 gap-3">
				<Button
					onPress={props.previous}
					startContent={<ChevronLeftIcon className="w-6" />}
					color="primary"
					className="w-36"
				>
					Previous
				</Button>
				<Button
					endContent={<PlusCircleIcon className="w-6" />}
					color="secondary"
					className="w-36"
					type="submit"
				>
					Save
				</Button>
			</div>
		</Card>
	);
};

export default Contact;
