import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

const BreedImageViewer = ({ open, setOpen, breedName, breedSrc }) => {
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		if (!open) setIsLoaded(false);
	}, [open]);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="!w-[90vw] !max-w-[90vw] !h-[90vh] p-2 items-start">
				<DialogHeader className={"p-2"}>
					<DialogTitle className="capitalize text-xl font-semibold">{breedName}</DialogTitle>
				</DialogHeader>
				<div className="w-full">
					<img
						src={breedSrc}
						className={cn("w-full h-[calc(90vh-100px)] object-contain", isLoaded ? "blur-0" : "blur-lg")}
						alt={`${breedName} image`}
						onLoad={() => setIsLoaded(true)}
					/>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default BreedImageViewer;
