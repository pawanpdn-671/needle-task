import BreedFeed from "@/components/BreedFeed";
import EmptyState from "@/components/EmptyState";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/config/firebase.config";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { doc, getDoc } from "firebase/firestore";
import { Dog } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ViewFeed = () => {
	const [loading, setLoading] = useState(true);
	const [favoritesBreed, setFavoritesBreed] = useState([]);
	const [selectedBreed, setSelectedBreed] = useState("");
	const { user } = useAuth();

	const fetchFavoriteBreeds = async () => {
		try {
			setLoading(true);
			const userDocRef = doc(db, "users", user.uid);
			const userDocSnap = await getDoc(userDocRef);

			if (userDocSnap.exists()) {
				const userData = userDocSnap.data();
				setFavoritesBreed(userData.favoriteBreeds || []);
				if (userData?.favoriteBreeds && userData?.favoriteBreeds?.length > 0) {
					setSelectedBreed(userData?.favoriteBreeds[0]);
				}
			}
		} catch (error) {
			console.error("Error fetching user data: ", error);
			toast("Something went wrong while fetching user favorites breed");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (user) {
			fetchFavoriteBreeds();
		}
	}, [user]);

	return (
		<div className="pb-20">
			<h2 className="text-3xl sm:text-4xl font-futura">Favorite Breeds</h2>
			<div>
				<ScrollArea className="w-full">
					<div className="flex items-center w-max space-x-4 sm:space-x-5 py-4">
						{loading ? (
							<ViewFeed.Skeleton />
						) : (
							favoritesBreed?.map((breed) => (
								<div
									className={cn(
										"flex items-center gap-1 text-sm font-futura cursor-pointer py-2 px-5 rounded-3xl capitalize",
										selectedBreed === breed ? "bg-primaryColor-700 text-white" : "bg-primaryColor-100",
									)}
									key={breed}
									onClick={() => setSelectedBreed(breed)}>
									<Dog className="w-4 h-4 -mt-0.5" />
									{breed}
								</div>
							))
						)}
					</div>
					<ScrollBar orientation="horizontal" />
				</ScrollArea>
			</div>
			<div className="mt-4">
				{!loading && selectedBreed ? (
					<BreedFeed canLike={true} selectedBreed={selectedBreed} />
				) : !loading && !selectedBreed ? (
					<EmptyState
						className="col-span-full"
						message={
							"Uh Oh! It seems like you don't have any favorite breeds. Explore home and add your favorite breeds to see it here."
						}
					/>
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default ViewFeed;

ViewFeed.Skeleton = function ViewFeedSkeletonList() {
	return (
		<>
			<Skeleton className={"h-[40px] rounded-3xl w-[120px]"} />
			<Skeleton className={"h-[40px] rounded-3xl w-[120px]"} />
			<Skeleton className={"h-[40px] rounded-3xl w-[120px]"} />
		</>
	);
};
