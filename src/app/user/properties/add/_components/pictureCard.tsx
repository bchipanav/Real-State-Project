import React from "react";
import { Card, Image } from "@heroui/react";
import { TrashIcon } from "@heroicons/react/16/solid";
interface Props {
	src: string;
	index: number;
	onDelete: (index: number) => void;
}

const PictureCard = ({ src, onDelete, index }: Props) => {
	return (
		<Card className="flex flex-col items-center">
			<Image
				src={src}
				alt="Property image"
				className="w-36 h-36 object-contain"
			/>
			<button className="my-3" type="button" onClick={() => onDelete(index)}>
				<TrashIcon className="text-danger-400 w-4" />
			</button>
		</Card>
	);
};

export default PictureCard;
