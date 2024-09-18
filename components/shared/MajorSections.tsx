import Image from "next/image";
import Missions from "./Missions";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import OurFounder from "./OurFounder";

interface MajorSectionsProps {}

const MajorSections = ({}: MajorSectionsProps) => {
	return (
		<div className="w-full bg-[#ffe8e8] relative ">
			{/* Left Section */}
			<Missions />
			{/* Other Sections */}
			<section className="sticky bg-white lg:w-[50%] w-full z-[999] top-10 py-4">
				<nav className="flex flex-wrap items-center justify-end w-full">
					<ul className="flex justify-around items-center lg:w-[50%] w-full">
						<Link
							href={"#founder"}
							className={buttonVariants({ variant: "link" })}>
							Founder
						</Link>
						<Link
							href={"#team"}
							className={buttonVariants({ variant: "link" })}>
							Team
						</Link>
						<Link href={"#"} className={buttonVariants({ variant: "link" })}>
							Link 3
						</Link>
						<Link href={"#"} className={buttonVariants({ variant: "link" })}>
							Link 4
						</Link>
					</ul>
				</nav>
			</section>
			<section>
				<OurFounder />
			</section>
		</div>
	);
};

export default MajorSections;
