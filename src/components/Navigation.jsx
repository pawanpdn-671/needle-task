import { auth } from "@/config/firebase.config";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { signOut } from "firebase/auth";
import { AlignJustify, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";

const Navigation = () => {
	const [openMobileMenu, setOpenMobileMenu] = useState(false);
	const { user } = useAuth();
	const { pathname } = useLocation();
	const navigate = useNavigate();

	const handleSignout = async () => {
		try {
			await signOut(auth);
			toast("Logout Successful");
			navigate("/login");
		} catch (error) {
			console.log(error);
			toast("Failed to Logout.");
		}
	};

	useEffect(() => {
		setOpenMobileMenu(false);
	}, [pathname]);

	return (
		<nav className="flex justify-between items-center h-[60px] gap-4">
			<div>
				<Link
					to="/"
					className="text-2xl font-futura text-transparent bg-clip-text bg-gradient-to-r from-primaryColor-400 via-primaryColor-700 to-primaryColor-900">
					Dog.CEO
				</Link>
			</div>
			<ul className="hidden sm:flex gap-8 items-center">
				<li>
					<Link
						to="/"
						className={cn(
							"hover:text-primaryColor-600 font-futura transition-all",
							pathname === "/" ? "text-primaryColor-700" : "",
						)}>
						Home
					</Link>
				</li>
				<li>
					<Link
						to="/feed"
						className={cn(
							"hover:text-primaryColor-600 font-futura transition-all",
							pathname === "/feed" ? "text-primaryColor-700" : "",
						)}>
						View Feed
					</Link>
				</li>
				<li>
					<Link
						to="/liked-breed-images"
						className={cn(
							"hover:text-primaryColor-600 font-futura transition-all",
							pathname === "/liked-breed-images" ? "text-primaryColor-700" : "",
						)}>
						Liked Photos
					</Link>
				</li>
			</ul>
			<Popover>
				<PopoverTrigger className="ml-auto sm:ml-0">
					<span className="w-[40px] h-[40px] bg-gradient-to-bl from-cyan-200 to-teal-500 rounded-full flex justify-center items-center cursor-pointer font-medium">
						{user?.email?.charAt(0)?.toUpperCase()}
					</span>
				</PopoverTrigger>
				<PopoverContent className="" align="end">
					<div className="grid gap-4">
						<div className="space-y-1">
							<h4 className="font-medium leading-none">Profile</h4>
							<p className="text-sm text-muted-foreground">See your details here.</p>
						</div>
						<div className="grid gap-4">
							<p className="flex items-center gap-1 text-base">
								<img src="/src/assets/icons/Mail.svg" className="w-[20px]" alt="mail icon" />
								{user?.email}
							</p>
							<Button size="sm" variant="destructive" className="gap-1 font-medium" onClick={handleSignout}>
								<LogOut className="w-[18px]" />
								Logout
							</Button>
						</div>
					</div>
				</PopoverContent>
			</Popover>
			<Button variant="outline" className="px-2 sm:hidden" onClick={() => setOpenMobileMenu(true)}>
				<AlignJustify className="w-5 h-5" />
			</Button>
			<Sheet open={openMobileMenu} onOpenChange={setOpenMobileMenu}>
				<SheetContent>
					<SheetHeader>
						<SheetTitle className="text-left text-xl">Navigation</SheetTitle>
					</SheetHeader>
					<div className=" mt-10">
						<ul className="flex flex-col gap-8 items-center">
							<li>
								<Link
									to="/"
									className={cn(
										"hover:text-primaryColor-600 font-futura transition-all",
										pathname === "/" ? "text-primaryColor-700" : "",
									)}>
									Home
								</Link>
							</li>
							<li>
								<Link
									to="/feed"
									className={cn(
										"hover:text-primaryColor-600 font-futura transition-all",
										pathname === "/feed" ? "text-primaryColor-700" : "",
									)}>
									View Feed
								</Link>
							</li>
							<li>
								<Link
									to="/liked-breed-images"
									className={cn(
										"hover:text-primaryColor-600 font-futura transition-all",
										pathname === "/liked-breed-images" ? "text-primaryColor-700" : "",
									)}>
									Liked Photos
								</Link>
							</li>
						</ul>
					</div>
				</SheetContent>
			</Sheet>
		</nav>
	);
};

export default Navigation;
