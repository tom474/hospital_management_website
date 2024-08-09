import { Outlet } from "react-router-dom";
import Footer from "../components/utils/Footer";
import Header from "../components/utils/Header";

export default function Root() {
	return (
		<>
			<div className="min-h-screen flex flex-col">
				<div className="w-1200 mx-auto flex-1 flex flex-col">
					<Header />
					<main className="flex-1">
						<Outlet />
					</main>
				</div>
				<Footer />
			</div>
		</>
	);
}
