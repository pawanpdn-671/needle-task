import AddBreedToFavorite from "@/components/AddBreedToFavorite";
import BreedFeed from "@/components/BreedFeed";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import axios from "axios";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Home = () => {
	const [loading, setLoading] = useState(true);
	const [breeds, setBreeds] = useState([]);
	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState("");

	const getBreeds = async () => {
		try {
			setLoading(true);

			const response = await axios.get("https://dog.ceo/api/breeds/list/all");
			setBreeds(Object.keys(response.data?.message));
		} catch (error) {
			toast("Something went wrong while fetching breeds");
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getBreeds();
	}, []);

	useEffect(() => {
		if (breeds?.length > 0) {
			setSelected(breeds[0]);
		}
	}, [breeds]);

	return (
		<div className="pb-20">
			<div className="flex flex-col sm:flex-row gap-4 justify-between sm:items-center">
				<h2 className="text-3xl sm:text-4xl font-futura">Featured Section</h2>
				<div className="flex flex-row justify-between sm:flex-col gap-2">
					<Popover open={open} onOpenChange={setOpen}>
						<PopoverTrigger asChild>
							<Button
								variant="outline"
								role="combobox"
								aria-expanded={open}
								className="w-[150px] sm:w-[200px] justify-between capitalize">
								{selected ? breeds.find((breed) => breed === selected) : "Select breed..."}
								<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-[150px] sm:w-[200px] p-0">
							<Command>
								<CommandInput placeholder="Search breed..." />
								<CommandList>
									<CommandEmpty>{loading ? "Loading..." : "No breed found."}</CommandEmpty>
									<CommandGroup>
										{breeds?.map((breed) => (
											<CommandItem
												key={breed}
												value={breed}
												className="capitalize"
												onSelect={(currentValue) => {
													setSelected(currentValue === selected ? "" : currentValue);
													setOpen(false);
												}}>
												<Check
													className={cn("mr-2 h-4 w-4", selected === breed ? "opacity-100" : "opacity-0")}
												/>
												{breed}
											</CommandItem>
										))}
									</CommandGroup>
								</CommandList>
							</Command>
						</PopoverContent>
					</Popover>
					{!loading && <AddBreedToFavorite selectedBreed={selected} />}
				</div>
			</div>
			<div className="mt-5">{!loading && selected ? <BreedFeed selectedBreed={selected} /> : <></>}</div>
		</div>
	);
};

export default Home;
