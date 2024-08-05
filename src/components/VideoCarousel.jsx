import { useEffect, useRef, useState } from "react";
import { hightlightsSlides } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { pauseImg, playImg, replayImg } from "../utils";

const VideoCarousel = () => {
	const videoRef = useRef([]);
	const videoSpanRef = useRef([]);
	const videoDivRef = useRef([]);

	const [loadedData, setLoadedData] = useState([]);

	const [video, setVideo] = useState({
		isEnd: false,
		startPlay: false,
		videoId: 0,
		isLastVideo: false,
		isPlaying: false
	});

	const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video;

	// GSAP animation for video
	useGSAP(() => {
		gsap.to("#slider", {
			transform: `translateX(${-100 * videoId}%)`,
			duration: 2,
			ease: "power1.inOut"
		});

		gsap.to("#video", {
			scrollTrigger: {
				trigger: "#video",
				toggleActions: "restart none none none"
			},
			onComplete: () => {
				setVideo((previous) => ({
					...previous,
					startPlay: true,
					isPlaying: true
				}));
			}
		});
	}, [isEnd, videoId]);

	useEffect(() => {
		if (loadedData.length > 3) {
			if (!isPlaying) {
				videoRef.current[videoId]?.pause();
			} else {
				videoRef.current[videoId]?.play();
			}
		}
	}, [startPlay, videoId, isPlaying, loadedData]);

	const handleLoadedData = (i, e) => {
		setLoadedData((previous) => [...previous, e]);
	};

	useEffect(() => {
		let currentProgress = 0;
		let span = videoSpanRef.current;

		if (span[videoId]) {
			//Animate the progress of the video
			let anim = gsap.to(span[videoId], {
				onUpdate: () => {
					const progress = Math.ceil(anim.progress() * 100);
					if (progress !== currentProgress) {
						currentProgress = progress;
						gsap.to(videoDivRef.current[videoId], {
							width:
								window.innerWidth < 760
									? "10vw"
									: window.innerWidth < 1280
									? "10vw"
									: "4vw"
						});

						gsap.to(span[videoId], {
							width: `${currentProgress}%`,
							backgroundColor: "white"
						});
					}
				},
				onComplete: () => {
					if (isPlaying) {
						gsap.to(videoDivRef.current[videoId], {
							width: "12px"
						});

						gsap.to(span[videoId], {
							backgroundColor: "#afafaf"
						});
					}
				}
			});

			if (videoId === 0) {
				anim.restart();
			}

			// Update the progress of the video
			const animUpdate = () => {
				anim.progress(
					videoRef.current[videoId].currentTime /
						hightlightsSlides[videoId].videoDuration
				);
			};

			if (isPlaying) {
				gsap.ticker.add(animUpdate);
			} else {
				gsap.ticker.remove(animUpdate);
			}
		}
	}, [videoId, startPlay, isPlaying]);

	const handleProcess = (type, i) => {
		switch (type) {
			case "video-end":
				setVideo((previous) => ({
					...previous,
					isEnd: true,
					videoId: i + 1
				}));
				break;
			case "video-last":
				setVideo((previous) => ({
					...previous,
					isLastVideo: true
				}));
				break;
			case "video-reset":
				setVideo((previous) => ({
					...previous,
					isLastVideo: false,
					videoId: 0
				}));
				break;
			case "video-play":
				setVideo((previous) => ({
					...previous,
					isPlaying: !previous.isPlaying
				}));
				break;
			default:
				return video;
		}
	};

	//  Handle click on dots navigation
	const handleClick = (index) => {
		setVideo((previous) => ({
			...previous,
			videoId: index
		}));
	};

	return (
		<>
			<div className="flex items-center">
				{hightlightsSlides.map((slide, index) => (
					<div key={slide.id} id="slider" className="pr-20 md:pr-10">
						<div className="video-carousel_container">
							<div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
								<video
									id="video"
									playsInline
									preload="auto"
									muted
									className={`${
										slide.id === 2 && "translate-x-44"
									} pointer-events-none`}
									ref={(el) => (videoRef.current[index] = el)}
									onEnded={() =>
										index !== 3
											? handleProcess("video-end", index)
											: handleProcess("video-last", index)
									}
									onPlay={() =>
										setVideo((previous) => ({ ...previous, isPlaying: true }))
									}
									onLoadedData={(e) => handleLoadedData(index, e)}
								>
									<source src={slide.video} type="video/mp4" />
								</video>
							</div>
							<div className="absolute top-12 left-[5%] z-10">
								{slide.textLists.map((text, idx) => (
									<p key={idx} className="text-xl md:text-2xl font-medium">
										{text}
									</p>
								))}
							</div>
						</div>
					</div>
				))}
			</div>

			<div className="flex-center relative mt-10">
				<div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
					{videoRef.current.map((_, index) => (
						<span
							key={index}
							ref={(el) => (videoDivRef.current[index] = el)}
							className="mx-2 w-3 h-3 rounded-full bg-gray-200 relative cursor-pointer"
						>
							<span
								className="absolute w-full h-full rounded-full"
								ref={(el) => (videoSpanRef.current[index] = el)}
							/>
						</span>
					))}
				</div>
				<button
					className="control-btn"
					onClick={() =>
						handleProcess(isLastVideo ? "video-reset" : "video-play")
					}
				>
					<img
						src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
						alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
						className="w-6 h-6"
					/>
				</button>
			</div>
		</>
	);
};

export default VideoCarousel;
