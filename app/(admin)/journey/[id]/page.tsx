"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getJourneyById, updateJourney } from "@/lib/actions/Journey.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import Journey from "@/lib/database/model/Journey.model";

interface PageProps {
	params: {
		id: string;
	};
}

const JourneyUpdatePage = ({ params }: PageProps) => {
	const router = useRouter();
	const journeyId = params.id;

	const [title, setTitle] = useState("");
	const [value, setValue] = useState("");
	const [isMore, setIsMore] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = (await getJourneyById(journeyId)) as Journey;
				if (data) {
					setTitle(data.title || "");
					setValue(String(data.value || ""));
					setIsMore(data.isMore || false);
				}
			} catch (err) {
				toast.error("Failed to load journey");
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [journeyId]);

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!title.trim()) {
			toast.error("Title cannot be empty");
			return;
		}
		if (!value.trim() || isNaN(Number(value))) {
			toast.error("Value must be a number");
			return;
		}

		try {
			await updateJourney(journeyId, {
				title,
				value: Number(value),
				isMore,
			});
			toast.success("Journey updated");
			router.push("/journey");
		} catch (err) {
			toast.error("Update failed");
		}
	};

	if (loading) return <div className="text-center mt-10">Loading...</div>;

	return (
		<div className="min-h-screen flex items-center justify-center w-full">
			<form
				onSubmit={onSubmit}
				className="space-y-4 max-w-md w-full mx-auto bg-white p-8 rounded-lg shadow-lg">
				{/* Title */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Title
					</label>
					<Input
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="Pads Distributed"
					/>
				</div>

				{/* Value */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Value
					</label>
					<Input
						type="number"
						value={value}
						onChange={(e) => setValue(e.target.value)}
						placeholder="100"
					/>
				</div>

				{/* Checkbox */}
				<div className="flex items-center space-x-2">
					<input
						type="checkbox"
						checked={isMore}
						onChange={(e) => setIsMore(e.target.checked)}
						className="h-5 w-5"
					/>
					<span className="text-sm text-gray-600">Add (+) to the total</span>
				</div>

				<Button
					type="submit"
					variant={"padseva"}
					disabled={loading}
					className="w-full p-4 bg-[#91373E] text-white font-bold rounded-lg shadow-xl hover:bg-[#BC6B6B] transition-all ease-in-out duration-300">
					Update Journey
				</Button>
			</form>
		</div>
	);
};

export default JourneyUpdatePage;
