import Hero from "./components/Hero";
import Highlights from "./components/Highlights";
import Model from "./components/Model";
import NavBar from "./components/NavBar";

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
		</main>
	);
}

export default App;
