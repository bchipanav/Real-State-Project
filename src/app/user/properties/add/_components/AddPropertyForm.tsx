"use client";
import React, { useState } from "react";
import Stepper from "./Stepper";
import type { PropertyStatus, PropertyType } from "@prisma/client";
import Basic from "./basic";
import Location from "./location";
import { cn } from "@heroui/react";
import Features from "./features";
import Pictures from "./pictures";
import Contact from "./contact";

const steps = [
	{ label: "Basic" },
	{ label: "Location" },
	{ label: "Features" },
	{ label: "Pictures" },
	{ label: "Contact" },
];
interface Props {
	types: PropertyType[];
	statuses: PropertyStatus[];
}
const AddPropertyForm = (props: Props) => {
	const [images, setImages] = useState<File[]>([]);
	const [step, setStep] = useState(0);
	return (
		<div>
			<Stepper items={steps} activeItem={step} setActiveItem={setStep} />
			<form className="p-2">
				<Basic
					className={cn({ hidden: step !== 0 })}
					next={() => setStep((prev) => prev + 1)}
					types={props.types}
					statuses={props.statuses}
				/>
				<Location
					next={() => setStep((prev) => prev + 1)}
					previous={() => setStep((prev) => prev - 1)}
					className={cn({ hidden: step !== 1 })}
				/>
				<Features
					next={() => setStep((prev) => prev + 1)}
					previous={() => setStep((prev) => prev - 1)}
					className={cn({ hidden: step !== 2 })}
				/>
				<Pictures
					next={() => setStep((prev) => prev + 1)}
					previous={() => setStep((prev) => prev - 1)}
					className={cn({ hidden: step !== 3 })}
					images={images}
					setImages={setImages}
				/>
				<Contact
					previous={() => setStep((prev) => prev - 1)}
					className={cn({ hidden: step !== 4 })}
				/>
			</form>
		</div>
	);
};

export default AddPropertyForm;
