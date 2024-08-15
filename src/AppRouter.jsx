import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import PageLoader from "./components/PageLoader";
import AppLayout from "./layouts/AppLayout";
import { useAuth } from "./context/AuthContext";
import LikedBreedImages from "./pages/LikedBreedImages";

const Login = lazy(() => import("@/pages/Login"));
const Signup = lazy(() => import("@/pages/Signup"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Home = lazy(() => import("@/pages/Home"));
const ViewFeed = lazy(() => import("@/pages/ViewFeed"));

const PrivateRoute = () => {
	const { user, loading } = useAuth();

	if (loading) return <PageLoader />;

	if (user && Object.keys(user)?.length > 0) {
		return <Outlet />;
	}
	return <Navigate to="/login" />;
};

const AppRouter = () => {
	return (
		<Router>
			<Suspense fallback={<PageLoader />}>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route element={<PrivateRoute />}>
						<Route
							path="/"
							element={
								<AppLayout>
									<Home />
								</AppLayout>
							}
						/>
						<Route
							path="/feed"
							element={
								<AppLayout>
									<ViewFeed />
								</AppLayout>
							}
						/>
						<Route
							path="/liked-breed-images"
							element={
								<AppLayout>
									<LikedBreedImages />
								</AppLayout>
							}
						/>
					</Route>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Suspense>
		</Router>
	);
};

export default AppRouter;
