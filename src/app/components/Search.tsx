"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { Input } from "@heroui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const Search = () => {
	const searchParams = useSearchParams();
	const pathName = usePathname();
	const router = useRouter();
	const handleChange = (query: string) => {
		const params = new URLSearchParams(searchParams);
		if (query) params.set("query", query);
		else params.delete("query");
		router.replace(`${pathName}?${params.toString()}`);
	};
	return (
		<div className="p-4 flex items-center justify-center bg-gradient-to-br from-sky-400 to-indigo-500">
			<Input
				onChange={(e) => handleChange(e.target.value)}
				className="w-96 shadow"
				endContent={<MagnifyingGlassIcon className="w-4 text-slate-500" />}
			/>
		</div>
	);
};

export default Search;
