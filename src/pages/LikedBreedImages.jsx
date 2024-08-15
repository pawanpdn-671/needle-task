import BreedCard from "@/components/BreedCard";
import BreedFeed from "@/components/BreedFeed";
import EmptyState from "@/components/EmptyState";
import { useAuth } from "@/context/AuthContext";
import useLikedPhotos from "@/hooks/useLikedPhotos";

const LikedBreedImages = () => {
	const { user } = useAuth();
	const { likedPhotos, loading } = useLikedPhotos(user);

	return (
		<div className="pb-20">
			<h2 className="text-3xl sm:text-4xl font-futura">Liked Breed Photos</h2>

			<div className="mt-4">
				<div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{loading ? (
						<BreedFeed.Skeleton />
					) : likedPhotos?.length > 0 ? (
						likedPhotos?.map((breed) => (
							<BreedCard
								canLike={true}
								key={breed.likedAt}
								breed={breed.photoUrl}
								breedName={breed?.breedName}
							/>
						))
					) : (
						<EmptyState
							className="col-span-full"
							message={
								"Uh Oh! It seems like you haven't liked any breed photos. Explore view feed and like photos to see it here."
							}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default LikedBreedImages;
