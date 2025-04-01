import Image from "next/image";
import { getPodcastData } from "@/lib/actions/Spotify.actions"; // Import the server action
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { PodcastIcon } from "lucide-react";

const PodcastList = async () => {
	const podcast = await getPodcastData(); // Fetch podcast details
	const episodes = podcast.episodes.items; // Get the actual podcast episodes
	console.log(episodes);

	return (
		<div className="bg-white py-14" id="podcast">
			<Image
				src={"/assets/OurPodcast.png"}
				width={500}
				height={100}
				className="lg:ml-[150px]"
				alt="Podcast"
				style={{ objectFit: "contain" }}
			/>
			<div className="max-w-7xl mx-auto text-left mt-10">
				<h2 className="text-3xl font-bold mb-8">{podcast.name}</h2>
				<p className="text-gray-600 mb-6 text-justify times-new-roman text-2xl">
					At PadSeva, we believe that knowledge is the cornerstone of change.
					Our PadSeva Podcast serves as a dynamic platform where doctors,
					students, and advocates come together to engage in insightful
					conversations about period poverty, menstrual health, and sustainable
					solutions. Through these discussions, we aim to disseminate critical
					knowledge and foster a deeper understanding of the challenges faced by
					marginalized communities, while exploring ways to break the stigma
					surrounding menstruation.
					<br />
					<br />
					Each episode is carefully curated to highlight diverse
					perspectives—from medical expertise on menstrual hygiene and health
					concerns to student-driven initiatives and policy advocacy efforts
					aimed at eradicating period poverty. By amplifying these voices, the
					PadSeva Podcast inspires listeners to become catalysts for change,
					ensuring that menstrual equity becomes a reality for all.
				</p>

				{/* Podcast Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
					{episodes.map((episode: any, index: number) => (
						<div
							key={episode.id}
							className="bg-gray-50 rounded-[30px] shadow-md flex flex-col items-center">
							<div className="relative w-full h-[20rem]">
								<Image
									src={episode.images?.[0]?.url || podcast.images[0]?.url}
									alt={episode.name}
									fill
									objectPosition="center"
									className="rounded-t-[30px]"
								/>
							</div>
							<div className="pb-4 px-4">
								<h3 className="text-xl font-semibold mt-4 text-start line-clamp-1">
									{index + 1}. {episode.name}
								</h3>
								<p className="text-gray-600 text-sm  mt-2 line-clamp-3 text-justify">
									{episode.description}
								</p>
							</div>
							<div className="w-full px-3 pb-3">
								<Link
									href={episode.external_urls.spotify}
									target="_blank"
									className={cn(
										buttonVariants({ variant: "padseva", size: "lg" }),
										"relative bg-[#91373e] text-white hover:bg-[#7a2d33] transition-all  w-full rounded-b-[18px] rounded-t-none"
									)}>
									<PodcastIcon className="size-6" />
									<p className="">Listen</p>
									<div className="absolute ease-[cubic-bezier(0.19,1,0.22,1)] -left-[75px] -top-[50px] -z-10 h-[155px] w-8 rotate-[35deg] bg-white/20 transition-all duration-500 group-hover:left-[120%]" />
								</Link>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default PodcastList;
