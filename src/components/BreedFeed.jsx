import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import BreedCard from "./BreedCard";
import { Skeleton } from "./ui/skeleton";

const BreedFeed = ({ selectedBreed, canLike, initialData }) => {
	const [loading, setLoading] = useState(false);
	const [selectedBreedData, setSelectedBreedData] = useState(initialData ?? []);

	const getBreedData = async () => {
		try {
			setLoading(true);

			const response = await axios.get(`https://dog.ceo/api/breed/${selectedBreed}/images/random/20`);
			setSelectedBreedData(response.data?.message);
		} catch (error) {
			toast("Something went wrong while fetching breed data");
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (selectedBreed) {
			getBreedData();
		}
	}, [selectedBreed]);

	return (
		<div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{loading ? (
				<BreedFeed.Skeleton />
			) : (
				selectedBreedData?.map((breed) => (
					<BreedCard canLike={canLike} key={breed} breed={breed} breedName={selectedBreed} />
				))
			)}
		</div>
	);
};

export default BreedFeed;

BreedFeed.Skeleton = function BreedFeedSkeletonList() {
	return (
		<>
			<Skeleton className={"rounded-lg aspect-square"} />
			<Skeleton className={"rounded-lg aspect-square"} />
			<Skeleton className={"rounded-lg aspect-square"} />
			<Skeleton className={"rounded-lg aspect-square"} />
			<Skeleton className={"rounded-lg aspect-square"} />
			<Skeleton className={"rounded-lg aspect-square"} />
			<Skeleton className={"rounded-lg aspect-square"} />
			<Skeleton className={"rounded-lg aspect-square"} />
			<Skeleton className={"rounded-lg aspect-square"} />
			<Skeleton className={"rounded-lg aspect-square"} />
			<Skeleton className={"rounded-lg aspect-square"} />
			<Skeleton className={"rounded-lg aspect-square"} />
			<Skeleton className={"rounded-lg aspect-square"} />
			<Skeleton className={"rounded-lg aspect-square"} />
			<Skeleton className={"rounded-lg aspect-square"} />
		</>
	);
};
