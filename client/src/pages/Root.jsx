import { Outlet } from "react-router-dom";
import Footer from "../components/utils/Footer";
import Header from "../components/utils/Header";
import { useEffect, useState } from "react";
import Login from "../components/utils/Login";

export default function Root() {
	const [role, setRole] = useState();

	const checkRole = (roleState) => {
		if (roleState) {
			setRole(roleState);
		} else {
			document.getElementById("login_modal").showModal();
		}
	};

	useEffect(() => {
		const roleState = localStorage.getItem("role");
		checkRole(roleState);
	}, []);

	const handleLogin = (role) => {
		setRole(role);
		localStorage.setItem("role", role);
		document.getElementById("login_modal").close();
	};

	return (
		<>
			<Login loginFunction={handleLogin} />
			<div className="min-h-screen flex flex-col">
				<div className="mx-12 flex-1 flex flex-col">
					<Header role={role} />
					<main className="flex-1">
						<Outlet />
					</main>
				</div>
				<Footer />
			</div>
		</>
	);
}
