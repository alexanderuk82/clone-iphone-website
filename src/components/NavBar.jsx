import { appleImg, bagImg, searchImg } from "../utils";
import { navLists } from "../constants";

const NavBar = () => {
	return (
		<header className="w-full py-5 sm:px-10 px-5 flex justify-between items-center">
			<nav className="flex justify-between container m-auto">
				<img src={appleImg} alt="apple logo" width={14} height={18} />
				<div className="hidden md:flex container mx-auto w-full flex-1 justify-center">
					{navLists.map((item, index) => (
						<div
							key={index}
							className="px-5 text-sm cursor-pointer text-gray hover:text-white transition-all"
						>
							<a href="#">{item}</a>
						</div>
					))}
				</div>
				<div className="flex flex-1 items-baseline gap-7 justify-end md:flex-none">
					<img src={searchImg} alt=" search icon" width={18} height={18} />
					<img src={bagImg} alt=" bag icon" width={18} height={18} />
				</div>
			</nav>
		</header>
	);
};

export default NavBar;
