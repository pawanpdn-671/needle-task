import { db } from "@/config/firebase.config";
import { useAuth } from "@/context/AuthContext";
import useLikedPhotos from "@/hooks/useLikedPhotos";
import { cn } from "@/lib/utils";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Heart, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import BreedImageViewer from "./BreedImageViewer";

const BreedCard = ({ breed, breedName, canLike }) => {
	const [open, setOpen] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);
	const [loading, setLoading] = useState(false);
	const { user } = useAuth();
	const { likedPhotos, refetch } = useLikedPhotos(user);

	const liked = likedPhotos?.some((like) => like.photoUrl === breed);
	const likedPhotoObj = likedPhotos?.find((photo) => photo.photoUrl === breed);

	const handleLike = async () => {
		if (loading) return;

		const currentTimestamp = new Date().toISOString();
		try {
			setLoading(true);
			const userDocRef = doc(db, "users", user.uid);
			const userDoc = await getDoc(userDocRef);

			if (userDoc.exists()) {
				const userData = userDoc.data();
				let updatedLikedPhotos = [];
				const likedPhotos = Array.isArray(userData.likedPhotos) ? userData.likedPhotos : [];

				if (liked) {
					updatedLikedPhotos = likedPhotos.filter((photo) => photo.photoUrl !== breed);
				} else {
					updatedLikedPhotos = [...likedPhotos, { photoUrl: breed, breedName, likedAt: currentTimestamp }];
				}

				await updateDoc(userDocRef, {
					likedPhotos: updatedLikedPhotos,
				});
			}
			refetch();
		} catch (error) {
			console.error("Error liking photo:", error);
			toast("Something went wrong when liking photo! Try again");
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<div className="relative overflow-hidden aspect-square rounded-lg" onClick={() => setOpen(true)}>
				<img
					src={breed}
					className={cn(
						"w-full h-full object-cover cursor-pointer transition-all hover:opacity-85",
						isLoaded ? "blur-0" : "blur-lg",
					)}
					alt={breed}
					onLoad={() => setIsLoaded(true)}
				/>
				{canLike && isLoaded && (
					<div
						className="p-4 flex justify-between absolute items-center bottom-0 left-0 w-full bg-black/20 backdrop-blur-lg"
						onClick={(e) => e.stopPropagation()}>
						<div
							className="flex w-max gap-1 font-futura cursor-pointer items-center text-white text-sm font-normal"
							onClick={handleLike}>
							{loading ? (
								<LoaderCircle className="w-4 h-4 animate-spin" />
							) : (
								<Heart className={cn("w-4 h-4 mt-0.5 text-destructive", liked ? "fill-destructive" : "")} />
							)}
							like
						</div>
						{liked && (
							<div className="text-xs text-white font-medium">
								{new Date(likedPhotoObj?.likedAt).toLocaleDateString("en-GB", {
									day: "2-digit",
									month: "long",
									year: "numeric",
								})}
							</div>
						)}
					</div>
				)}
			</div>
			<BreedImageViewer breedName={breedName} breedSrc={breed} open={open} setOpen={setOpen} />
		</>
	);
};

export default BreedCard;
