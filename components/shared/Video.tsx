"use client";
import { useAnimation } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { TextReveal } from "@/components/magicui/text-reveal";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { PlayCircle, PauseCircle, VolumeX, Volume2 } from "lucide-react"; // Import icons

interface VideoProps {}

const Video = ({}: VideoProps) => {
	const controls = useAnimation();
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const [scrollY, setScrollY] = useState(0);
	const [isPlaying, setIsPlaying] = useState(true);
	const [volume, setVolume] = useState(1);
	const [muted, setMuted] = useState(true);
	const [progress, setProgress] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);

	// Detect keyboard input for mute (Ctrl/Cmd + M)
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			// Check for Ctrl (or Cmd on Mac) + M
			if ((event.ctrlKey || event.metaKey) && event.key === "m") {
				toggleMute();
			}
		};

		// Add event listener
		window.addEventListener("keydown", handleKeyDown);

		// Clean up on component unmount
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [muted]);

	useEffect(() => {
		const handleScroll = () => setScrollY(window.scrollY);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		controls.start({ opacity: Math.min(scrollY / 500, 1) });
	}, [scrollY, controls]);

	const togglePlayPause = () => {
		if (videoRef.current) {
			if (isPlaying) videoRef.current.pause();
			else videoRef.current.play();
			setIsPlaying(!isPlaying);
		}
	};

	const toggleMute = () => {
		if (videoRef.current) {
			videoRef.current.muted = !muted;
			setMuted(!muted);

			if (videoRef.current.muted === true) {
				videoRef.current.volume = 1;
				setVolume(0);
			}
		}
	};

	const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const volumeValue = parseFloat(e.target.value);
		if (videoRef.current) videoRef.current.volume = volumeValue;
		setVolume(volumeValue);
		setMuted(false);
	};

	const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const progressValue = parseFloat(e.target.value);
		if (videoRef.current) {
			videoRef.current.currentTime =
				(progressValue / 100) * videoRef.current.duration;
		}
		setProgress(progressValue);
	};

	const handleVideoTimeUpdate = () => {
		if (videoRef.current) {
			setCurrentTime(videoRef.current.currentTime);
			setProgress(
				(videoRef.current.currentTime / videoRef.current.duration) * 100
			);
		}
	};

	// Format time into MM:SS format
	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
	};

	// Set video duration once it's loaded
	const handleLoadedMetadata = () => {
		if (videoRef.current) {
			setDuration(videoRef.current.duration);
		}
	};

	return (
		<div className="relative" id="donate">
			<div className="relative overflow-hidden z-[99999]">
				{/* Video */}
				<video
					ref={videoRef}
					autoPlay
					loop
					muted={muted}
					onTimeUpdate={handleVideoTimeUpdate}
					onLoadedMetadata={handleLoadedMetadata}
					onClick={togglePlayPause} // Click video to pause/play
					className="top-0 relative left-0 w-full min-h-[20vh] object-contain sm:object-cover bg-[#fff2f2]">
					<source src="/assets/videos/PeriodPoverty.mp4" type="video/mp4" />
				</video>

				{/* Video Controls */}
				<div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/80 to-black/0 py-4">
					<div className="flex justify-between items-center px-10">
						{/* Play/Pause Button */}
						{isPlaying ? (
							<div className="flex items-center space-x-2">
								<PauseCircle
									size={24}
									className="size-[44px] text-white cursor-pointer hover:bg-white hover:text-black rounded-full p-2"
									onClick={togglePlayPause}
								/>
							</div>
						) : (
							<div className="flex items-center space-x-2">
								<PlayCircle
									size={24}
									onClick={togglePlayPause}
									className="size-[44px] text-white cursor-pointer hover:bg-white hover:text-black rounded-full p-2"
								/>
							</div>
						)}

						{/* Volume Control */}
						<div className="flex items-center space-x-2">
							<Button
								onClick={toggleMute}
								size={"icon"}
								className="size-[44px] text-white cursor-pointer hover:bg-white hover:text-black rounded-full p-2"
								variant="ghost">
								{muted ? <VolumeX size={24} /> : <Volume2 size={24} />}
							</Button>
							<Input
								type="range"
								min="0"
								max="1"
								step="0.01"
								value={volume}
								onChange={handleVolumeChange}
								className="w-32 accent-red-500 cursor-pointer ring-black"
							/>
						</div>

						{/* Video Progress Bar */}
						<Input
							type="range"
							min="0"
							max="100"
							step="0.1"
							value={progress}
							onChange={handleProgressChange}
							className="w-full mx-4 accent-red-500 cursor-pointer"
						/>
					</div>

					{/* Video Timer */}
					<div className="flex justify-center items-center text-white mt-2">
						<span>
							{formatTime(currentTime)} /{" "}
							{formatTime(videoRef?.current?.duration || duration)}
						</span>
					</div>
				</div>
			</div>

			<div>
				<TextReveal className="bg-[#fff2f2] relative z-30 p-10">
					Your Support Can Change Lives!
				</TextReveal>
			</div>
		</div>
	);
};

export default Video;
