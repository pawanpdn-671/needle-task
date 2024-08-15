import Navigation from "@/components/Navigation";

const AppLayout = ({ children }) => {
	return (
		<div className="max-w-[1440px] mx-auto px-5">
			<Navigation />
			<main className="w-full pt-10">{children}</main>
		</div>
	);
};

export default AppLayout;
