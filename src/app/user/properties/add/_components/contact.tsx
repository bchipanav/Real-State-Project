import React from "react";
import { Button, Card, cn, Input } from "@heroui/react";
import { ChevronLeftIcon, PlusCircleIcon } from "@heroicons/react/16/solid";
interface Props {
	className?: string;
	previous: () => void;
}

const Contact = (props: Props) => {
	return (
		<Card
			className={cn(
				"p-2  grid grid-cols-1 md:grid-cols-3 gap-3",
				props.className,
			)}
		>
			<Input label="Contact Name" />
			<Input label="Phone" />
			<Input label="E-mail" />
			<div className="flex justify-center col-span-3 gap-3">
				<Button
					onClick={props.previous}
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
