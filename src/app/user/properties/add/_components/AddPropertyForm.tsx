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
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import { AddPropertyFormSchema } from "@/lib/zodSchema";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadImages } from "@/lib/upload";

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

export type AddPropertyInputType = z.infer<typeof AddPropertyFormSchema>;
const AddPropertyForm = (props: Props) => {
	const methods = useForm<AddPropertyInputType>({
		resolver: zodResolver(AddPropertyFormSchema),
	});
	const [images, setImages] = useState<File[]>([]);
	const [step, setStep] = useState(0);
	const onSubmit: SubmitHandler<AddPropertyInputType> = async (data) => {
		const imageUrls = await uploadImages(images);
		console.log({ data, imageUrls });
	};
	return (
		<div>
			<Stepper items={steps} activeItem={step} setActiveItem={setStep} />
			<FormProvider {...methods}>
				<form
					className="p-2"
					onSubmit={methods.handleSubmit(onSubmit, (errors) =>
						console.log({ errors }),
					)}
				>
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
			</FormProvider>
		</div>
	);
};

export default AddPropertyForm;
