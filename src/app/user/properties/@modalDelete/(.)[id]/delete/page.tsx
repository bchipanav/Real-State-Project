"use client";
import { deleteProperty } from "@/lib/actions/property";
import { Button } from "@heroui/button";
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@heroui/modal";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Props {
	params: {
		id: string;
	};
}
function ModalDeletePropertyPage({ params }: Props) {
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);
	useEffect(() => setIsOpen(true), []);
	const handleCancel = () => {
		router.push("/user/properties");
		setIsOpen(false);
	};
	const handleDelete = async () => {
		await deleteProperty(+params.id);
		router.push("/user/properties");
		setIsOpen(false);
	};
	return (
		<Modal isOpen={isOpen} onOpenChange={handleCancel}>
			<ModalContent>
				<ModalHeader>Delete Property</ModalHeader>
				<ModalBody>
					<p>Are you sure to delete this property?</p>
				</ModalBody>
				<ModalFooter>
					<Button onPress={handleCancel}>Cancel</Button>
					<Button onPress={handleDelete} color="danger" variant="light">
						Delete
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}

export default ModalDeletePropertyPage;
