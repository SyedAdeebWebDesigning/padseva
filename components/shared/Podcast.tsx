import Image from "next/image";
import { getPodcastData } from "@/lib/actions/Spotify.actions";
import Link from "next/link";
import { PodcastIcon } from "lucide-react";

const PodcastList = async () => {
	const podcast = await getPodcastData();
	const episodes = podcast.episodes.items;

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
			<div className="max-w-7xl mx-auto text-left mt-10 px-4 w-full">
				{/* Podcast Vertical List */}
				<div className="space-y-4 w-full">
					{episodes.map((episode: any, index: number) => (
						<Link
							key={episode.id}
							href={episode.external_urls.spotify}
							target="_blank"
							className="block group">
							<div className="flex flex-col md:flex-row gap-4 p-4 md:p-6 bg-gray-50 rounded-lg shadow hover:shadow-md hover:bg-gray-100 transition-all duration-200 hover:scale-[1.01] active:scale-[0.98]">
								<div className="hidden md:block relative w-20 h-20 flex-shrink-0">
									<Image
										src={episode.images?.[0]?.url || podcast.images[0]?.url}
										alt={episode.name}
										fill
										className="rounded-md object-cover"
									/>
								</div>
								<div className="flex-1">
									<div className="flex items-center gap-2 mb-2">
										<h3 className="text-lg md:text-xl font-semibold text-gray-800">
											{index + 1}. {episode.name}
										</h3>
										<PodcastIcon className="size-4 text-[#91373e] ml-auto hidden md:inline-block" />
									</div>
									<p className="text-sm md:text-base text-gray-600 line-clamp-2">
										{episode.description}
									</p>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export default PodcastList;
