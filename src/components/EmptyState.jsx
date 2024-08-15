import { cn } from "@/lib/utils";

const EmptyState = ({ type, message, className }) => {
	return (
		<div className={cn("my-10", className)}>
			<p
				className={cn(
					"text-center text-lg font-semibold sm:w-[500px] sm:mx-auto",
					type === "error" ? "text-destructive" : "",
				)}>
				{message}
			</p>
		</div>
	);
};

export default EmptyState;
