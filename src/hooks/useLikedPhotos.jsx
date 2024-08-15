import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase.config";

const useLikedPhotos = (user) => {
	const [likedPhotos, setLikedPhotos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchLikedPhotos = async () => {
		if (user) {
			setLoading(true);
			try {
				const userDocRef = doc(db, "users", user.uid);
				const userDocSnap = await getDoc(userDocRef);

				if (userDocSnap.exists()) {
					const userData = userDocSnap.data();
					setLikedPhotos(userData.likedPhotos || []);
				}
			} catch (err) {
				setError(err);
			} finally {
				setLoading(false);
			}
		}
	};

	useEffect(() => {
		fetchLikedPhotos();
	}, [user]);

	return { likedPhotos, loading, error, refetch: fetchLikedPhotos };
};

export default useLikedPhotos;
