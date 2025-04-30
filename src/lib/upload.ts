import { createClient } from "@supabase/supabase-js";

export async function uploadAvatar(image: File) {
	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
	const supabase = createClient(supabaseUrl, supabaseKey);
	const safeFileName = `${image.name
		.replace(/\s+/g, "_")
		.replace(/[^a-zA-Z0-9._-]/g, "")}_${Date.now()}`;
	const { data, error } = await supabase.storage
		.from("avatars")
		.upload(safeFileName, image);

	if (error) {
		throw new Error(`Error al subir avatar: ${error.message}`);
	}

	// Obtener la URL pública
	const { data: urlData } = supabase.storage
		.from("avatars")
		.getPublicUrl(data.path);

	return urlData.publicUrl;
}

export async function uploadImages(images: File[]) {
	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
	const supabase = createClient(supabaseUrl, supabaseKey);
	const uploadResults = await Promise.all(
		images.map((file) =>
			supabase.storage
				.from("property-images")
				.upload(`${file.name.replace(/\s+/g, "_")}_${Date.now()}`, file),
		),
	);
	const failedUpload = uploadResults.find((result) => result.error);
	if (failedUpload?.error) {
		throw new Error(`Error al subir imagen: ${failedUpload.error.message}`);
	}
	const urls = uploadResults.map(
		(item) =>
			supabase.storage
				.from("property-images")
				.getPublicUrl(item.data?.path ?? "").data.publicUrl,
	);
	return urls;
}
