"use client";

import { Button, type ButtonProps } from "@heroui/button";
import { useFormStatus } from "react-dom";

function SubmitButton(props: ButtonProps) {
	const { pending } = useFormStatus();
	return <Button {...props} disabled={pending} isLoading={pending}></Button>;
}

export default SubmitButton;
