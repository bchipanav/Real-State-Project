"use server";

import { deleteProperty } from "@/lib/actions/property";
import { redirect } from "next/navigation";

export async function deletePropertyAction(formData: FormData) {
	const id = Number(formData.get("id"));
	if (!id) throw new Error("Invalid ID");

	await deleteProperty(id);
	redirect("/user/properties");
}
