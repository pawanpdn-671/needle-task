import { db } from "@/config/firebase.config";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Heart, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const AddBreedToFavorite = ({ selectedBreed }) => {
	const [userFavoritesBreed, setUserFavoritiesBreed] = useState([]);
	const [loading, setLoading] = useState(false);
	const { user } = useAuth();

	const fetchFavoriteBreeds = async () => {
		try {
			setLoading(true);
			const userDocRef = doc(db, "users", user.uid);
			const userDocSnap = await getDoc(userDocRef);

			if (userDocSnap.exists()) {
				const userData = userDocSnap.data();
				setUserFavoritiesBreed(userData.favoriteBreeds || []);
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

	const handleAddToFavorites = async () => {
		if (loading) return;

		let updatedBreeds;
		if (userFavoritesBreed.includes(selectedBreed)) {
			updatedBreeds = userFavoritesBreed.filter((item) => item !== selectedBreed);
		} else if (userFavoritesBreed.length < 3) {
			updatedBreeds = [...userFavoritesBreed, selectedBreed];
		} else {
			return toast("Favorite breed limit exceeds! Max 3 breeds");
		}

		try {
			setLoading(true);
			const userDocRef = doc(db, "users", user.uid);
			console.log(userDocRef);
			await updateDoc(userDocRef, {
				favoriteBreeds: updatedBreeds,
			});
			await fetchFavoriteBreeds();

			toast("Favorite breed update successful.");
		} catch (error) {
			console.error("Error updating favorite breeds: ", error);
			toast("Something went wrong while updating favorites! Try again");
		} finally {
			setLoading(false);
		}
	};

	console.log(userFavoritesBreed);

	return (
		<div
			className={cn(
				"flex items-center gap-1 text-sm cursor-pointer font-medium underline justify-end pr-4",
				loading ? "opacity-50" : "opacity-100",
			)}
			onClick={handleAddToFavorites}>
			{loading ? (
				<LoaderCircle className="w-4 h-4 animate-spin" />
			) : (
				<Heart
					className={cn(
						"w-4 h-4 mt-0.5 text-destructive",
						userFavoritesBreed?.includes(selectedBreed) ? "fill-destructive" : "",
					)}
				/>
			)}
			{loading ? "Loading..." : userFavoritesBreed?.includes(selectedBreed) ? "Saved" : "Add to favorites"}
		</div>
	);
};

export default AddBreedToFavorite;
