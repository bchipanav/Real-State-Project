import prisma from "@/lib/prisma";
import PropertyCard from "./components/propertyCard";
import PropertyContainer from "./components/propertyContainer";
import Search from "./components/Search";
const PAGE_SIZE = 8;
interface Props {
	searchParams: {
		[key: string]: string | string[] | undefined;
	};
}
export default async function Home({ searchParams }: Props) {
	const pagenum = searchParams.pagenum ?? 0;
	const query = searchParams.query ?? "";
	const propertiesPromise = await prisma.property.findMany({
		select: {
			id: true,
			name: true,
			price: true,
			images: {
				select: {
					url: true,
				},
			},
			location: {
				select: {
					city: true,
					state: true,
				},
			},
		},
		...(!!query && {
			where: {
				name: {
					contains: String(query),
				},
			},
		}),
		skip: +pagenum * PAGE_SIZE,
		take: PAGE_SIZE,
	});
	const totalPropertiesPromise = prisma.property.count();
	const [properties, totalProperties] = await Promise.all([
		propertiesPromise,
		totalPropertiesPromise,
	]);
	const totalPages = Math.floor(totalProperties / PAGE_SIZE);
	return (
		<div>
			<Search />
			<PropertyContainer totalPages={totalPages} currentPage={+pagenum}>
				{properties.map((property) => (
					<PropertyCard key={property.id} property={property} />
				))}
			</PropertyContainer>
		</div>
	);
}
