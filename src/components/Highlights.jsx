import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { rightImg, watchImg } from "../utils";
import VideoCarousel from "./VideoCarousel";

const Highlights = () => {
	// Animation

	useGSAP(() => {
		gsap.to("#title", {
			opacity: 1,
			y: 0
		});
		gsap.to(".link", {
			opacity: 1,
			y: 0,
			duration: 1,
			stagger: 0.2
		});
	}, []);

	return (
		<section
			id="highlights"
			className="w-screen overflow-hidden h-full common-padding bg-zinc"
		>
			<div className="screen-max-width">
				<div className="mb-12 w-full flex flex-col  justify-between md:flex-row md:items-center">
					<h1 id="title" className="section-heading">
						Get the highlights
					</h1>
					<div className="flex flex-wrap items-end gap-5 ">
						<p className="link">
							Watch the film
							<img src={watchImg} alt="Watch the film" className=" ml-2" />
						</p>
						<p className="link">
							Watch the event
							<img src={rightImg} alt="right" className=" ml-2" />
						</p>
					</div>
				</div>

				{/* slider carousel */}

				<div>
					<VideoCarousel />
				</div>
			</div>
		</section>
	);
};

export default Highlights;
