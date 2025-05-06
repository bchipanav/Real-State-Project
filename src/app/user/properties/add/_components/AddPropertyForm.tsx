"use client";
import React, { useState } from "react";
import Stepper from "./Stepper";
import type {
	Prisma,
	PropertyImage,
	PropertyStatus,
	PropertyType,
} from "@prisma/client";
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
import { editProperty, saveProperty } from "@/lib/actions/property";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

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
	property?: Prisma.PropertyGetPayload<{
		include: {
			location: true;
			contact: true;
			feature: true;
			images: true;
		};
	}>;
	isEdit?: boolean;
}

export type AddPropertyInputType = z.infer<typeof AddPropertyFormSchema>;
const AddPropertyForm = ({ isEdit = false, ...props }: Props) => {
	const router = useRouter();
	const methods = useForm<AddPropertyInputType>({
		resolver: zodResolver(AddPropertyFormSchema),
		defaultValues: {
			contact: props.property?.contact ?? undefined,
			location: props.property?.location ?? undefined,
			propertyFeature: props.property?.feature ?? undefined,
			description: props.property?.description ?? undefined,
			name: props.property?.name ?? undefined,
			price: props.property?.price ?? undefined,
			statusId: props.property?.statusId ?? undefined,
			typeId: props.property?.typeId ?? undefined,
		},
	});
	const [images, setImages] = useState<File[]>([]);
	const [savedImagesUrl, setSavedImagesUrl] = useState<PropertyImage[]>(
		props.property?.images ?? [],
	);
	const [step, setStep] = useState(0);
	const { user } = useKindeBrowserClient();
	const onSubmit: SubmitHandler<AddPropertyInputType> = async (data) => {
		const imageUrls = await uploadImages(images);
		try {
			if (isEdit && props.property) {
				const deletedImagesIDs = props.property?.images
					.filter((item) => !savedImagesUrl.includes(item))
					.map((item) => item.id);
				await editProperty(
					data,
					props.property?.id,
					imageUrls,
					deletedImagesIDs,
				);
				toast.success("Property Updated!");
			} else {
				await saveProperty(data, imageUrls, user?.id);
				toast.success("Property Added");
			}
		} catch (error) {
			console.error({ error });
		} finally {
			router.push("/user/properties");
		}
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
						{...(props.property && {
							savedImagesUrl: savedImagesUrl,
							setSavedImagesUrl: setSavedImagesUrl,
						})}
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
