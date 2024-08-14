import Features from "./components/Features";
import Hero from "./components/Hero";
import Highlights from "./components/Highlights";
import Model from "./components/Model";
import NavBar from "./components/NavBar";
import * as Sentry from "@sentry/react";

function App() {
	return (
		<main className="bg-black">
			{/* NavBar component */}

			<NavBar />

			{/* Hero component */}

			<Hero />
			{/* Highlights component */}

			<Highlights />

			{/* Model phones */}

			<Model />

			{/* Features component */}

			<Features />
		</main>
	);
}

export default Sentry.withProfiler(App);
