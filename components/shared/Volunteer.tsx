"use client";

interface VolunteerProps {
	index: number;
}
import { delay, motion } from "framer-motion";
import { CarouselItem } from "../ui/carousel";
import { Card, CardContent } from "../ui/card";

const Volunteer = ({ index }: VolunteerProps) => {
	return (
		<CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
			<div className="p-1">
				<motion.div
					initial={{ opacity: 0, scale: 0 }}
					whileInView={{ opacity: 1, scale: 1 }}>
					<Card>
						<CardContent className="flex aspect-square items-center justify-center p-6">
							<span className="text-3xl font-semibold">{index + 1}</span>
						</CardContent>
					</Card>
				</motion.div>
			</div>
		</CarouselItem>
	);
};

export default Volunteer;
