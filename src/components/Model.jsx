import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ModelView from "./ModelView";
import { yellowImg } from "../utils";
import { useRef, useState } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { models, sizes } from "../constants";

const Model = () => {
	// Size phones

	const [size, setSize] = useState("small");
	const [model, setModel] = useState({
		title: "iPhone 15 Pro in Natural Titanium",
		color: ["#8f8a81", "#ffe7b9", "#6f6c64"],
		image: yellowImg
	});

	// Camera control for the model

	const cameraControlSmall = useRef();
	const cameraControlLarge = useRef();

	// Models

	const small = useRef(new THREE.Group());
	const large = useRef(new THREE.Group());

	// Rotation

	const [smallRotation, setSmallRotation] = useState(0);
	const [largeRotation, setLargeRotation] = useState(0);

	// Animation

	useGSAP(() => {
		gsap.to("#heading", {
			opacity: 1,
			y: 0
		});
	}, []);

	return (
		<section className="common-padding">
			<div className="screen-max-width">
				<h1 id="heading" className="section-heading">
					Takea closer look
				</h1>
				{/* Container models phones */}
				<div className="flex flex-col items-center mt-5">
					<div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
						{/* Small phone */}
						<ModelView
							index={1}
							groupRef={small}
							gsapType="view1"
							controlRef={cameraControlSmall}
							setRotationState={setSmallRotation}
							item={model}
							size={size}
						/>

						{/* Large phone */}

						<ModelView
							index={2}
							groupRef={large}
							gsapType="view2"
							controlRef={cameraControlLarge}
							setRotationState={setLargeRotation}
							item={model}
							size={size}
						/>

						{/* Canvas */}

						<Canvas
							className="w-full h-full"
							style={{
								position: "absolute",
								top: 0,
								left: 0,
								bottom: 0,
								right: 0,
								overflow: "hidden"
							}}
							eventSource={document.getElementById("root")}
						>
							<View.Port />
						</Canvas>
					</div>

					{/* Titles and descriptions */}

					<div className="mx-auto w-full">
						<p className="text-sm font-light text-center mb-5">{model.title}</p>

						{/* Colors */}
						<div className="flex-center">
							<ul className="color-container">
								{models.map((item, i) => (
									<li
										key={i}
										className="w-6 h-6 rounded-full mx-2 cursor-pointer"
										style={{
											backgroundColor: item.color[0]
										}}
										onClick={() => setModel(item)}
									></li>
								))}
							</ul>

							{/* Sizes button */}

							<button className="size-btn-container">
								{sizes.map(({ label, value }) => (
									<span
										key={label}
										className="size-btn"
										style={{
											backgroundColor: size === value ? "#fff" : "transparent",
											color: size === value ? "black" : "white"
										}}
										onClick={() => setSize(value)}
									>
										{label}
									</span>
								))}
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Model;
