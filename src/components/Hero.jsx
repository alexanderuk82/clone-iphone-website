import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { heroVideo, smallHeroVideo } from "../utils";
import { useEffect, useState } from "react";

const Hero = () => {
	// Definining sreen dimensions

	const [videoSrc, setVideoSrc] = useState(
		window.innerWidth > 768 ? heroVideo : smallHeroVideo
	);

	const handleVideoSrc = () => {
		if (window.innerWidth < 760) {
			setVideoSrc(smallHeroVideo);
		} else {
			setVideoSrc(heroVideo);
		}
	};

	useEffect(() => {
		window.addEventListener("resize", handleVideoSrc);
		return () => {
			window.removeEventListener("resize", handleVideoSrc);
		};
	}, []);

	// Animation GSAP
	useGSAP(() => {
		gsap.to("#hero", {
			delay: 2.5,
			opacity: 1
		});
		gsap.to("#cta", {
			delay: 2.5,
			opacity: 1,
			y: "-50%"
		});
	}, []);
	return (
		<section className="w-full nav-height bg-black relative">
			<div className="h-5/6 container w-full mx-auto flex flex-col items-center justify-center">
				<p className="hero-title" id="hero">
					Iphone 15 Pro
				</p>
				<div className="md:w-10/12 w-9/12">
					<video
						autoPlay
						loop
						muted
						playsInline={true}
						key={videoSrc}
						className="pointer-events-none"
					>
						<source src={videoSrc} type="video/mp4" />
					</video>
				</div>
			</div>
			{/* Call to Action */}
			<div
				id="cta"
				className="flex flex-col items-center opacity-0 translate-y-20"
			>
				<a href="#highlights" className="btn">
					Buy
				</a>
				<p className="font-normal text-xl">From 1199/month or $999</p>
			</div>
		</section>
	);
};

export default Hero;
