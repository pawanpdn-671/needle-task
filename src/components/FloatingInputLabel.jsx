import { cn } from "@/lib/utils";

const FloatingInputLabel = ({ id, label, type, placeholder, error, name, ...props }) => {
	return (
		<div className="relative">
			<input
				type={type}
				id={id}
				name={name}
				className={cn(
					"block px-4 pr-10 pb-2.5 pt-4 w-full text-base text-gray-900 bg-transparent rounded-lg border-2 border-[#D4D4D4] appearance-none font-normal focus:outline-none focus:ring-0 hover:border-primaryColor-400 focus:border-primaryColor-600",
					error ? "!border-[#D94F14] hover:!border-[#D94F14] focus:!border-[#D94F14]" : "",
				)}
				placeholder={placeholder}
				{...props}
			/>
			<label htmlFor={id} className="absolute font-medium text-sm transform z-10 left-4 px-2 bg-white -top-2">
				{label}
			</label>
		</div>
	);
};

export default FloatingInputLabel;
