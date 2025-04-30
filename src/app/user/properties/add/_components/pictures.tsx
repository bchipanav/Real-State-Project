/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button, Card, cn } from "@heroui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import FileInput from "@/app/components/fileUpload";
import PictureCard from "./pictureCard";

interface Props {
	className?: string;
	previous: () => void;
	next: () => void;
	images: File[];
	setImages: (images: File[]) => void;
}

const Pictures = (props: Props) => {
	const handleNext = () => props.next();
	return (
		<Card className={cn("p-2 space-y-3", props.className)}>
			<FileInput
				onSelect={(e) =>
					// biome-ignore lint/suspicious/noExplicitAny: <explanation>
					props.setImages([(e as any).target.files[0], ...props.images])
				}
			/>
			<div className="flex gap-3 flex-wrap">
				{props.images.map((image, index) => {
					const srcUrl = URL.createObjectURL(image);
					return (
						<PictureCard
							key={srcUrl}
							src={srcUrl}
							index={index}
							onDelete={(i) =>
								props.setImages([
									...props.images.slice(0, i),
									...props.images.slice(i + 1),
								])
							}
						/>
					);
				})}
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

export default Pictures;
