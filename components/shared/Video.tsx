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
			<div className="relative overflow-hidden z-[99999] cursor-none w-full max-w-full aspect-video">
				{/* Video */}
				<iframe
					src="https://drive.google.com/file/d/1Ktw12ahm0ancw6UADQVVyT01b0w9K-8h/preview"
					className="w-full h-[100vh] object-contain"
					allow="autoplay"></iframe>
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
