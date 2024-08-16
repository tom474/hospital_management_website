import PropTypes from "prop-types";
import { PopoverGroup } from "@headlessui/react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Header({ role }) {
	const [mode, setMode] = useState(false);
	const navigate = useNavigate();

	const onLogout = () => {
		localStorage.removeItem("role");
		setMode(false);
		navigate("/");
		document.getElementById("login_modal").showModal();
	};

	return (
		<header className="bg-sky-50">
			<nav
				aria-label="Global"
				className="mx-auto flex mt-3 rounded-full border-[1px] border-gray-300 border-solid max-w-7xl items-center 
                justify-between p-6 lg:px-8 bg-white"
			>
				<div className="flex lg:flex-1">
					<NavLink
						to={"/"}
						className="flex items-center text-blue-400 font-medium text-xl"
					>
						Hospital Management System
					</NavLink>
				</div>

				<PopoverGroup className="hidden lg:flex lg:gap-x-12">
					<NavLink
						to={"/"}
						className={({ isActive }) =>
							isActive
								? "text-base font-semibold leading-6 text-blue-400"
								: "text-base font-semibold leading-6 text-gray-900"
						}
					>
						Home
					</NavLink>
					<NavLink
						to={"/patient"}
						className={({ isActive }) =>
							isActive
								? "text-base font-semibold leading-6 text-blue-400"
								: "text-base font-semibold leading-6 text-gray-900"
						}
					>
						Patient
					</NavLink>
					<NavLink
						to={"/staff"}
						className={({ isActive }) =>
							isActive
								? "text-base font-semibold leading-6 text-blue-400"
								: "text-base font-semibold leading-6 text-gray-900"
						}
					>
						Staff
					</NavLink>

					{(role === "Receptionist" || role === "Admin") && (
						<NavLink
							to={"/appointment"}
							className={({ isActive }) =>
								isActive
									? "text-base font-semibold leading-6 text-blue-400"
									: "text-base font-semibold leading-6 text-gray-900"
							}
						>
							Appointment
						</NavLink>
					)}

					{role === "Admin" && (
						<NavLink
							to={"/report"}
							className={({ isActive }) =>
								isActive
									? "text-base font-semibold leading-6 text-blue-300"
									: "text-base font-semibold leading-6 text-gray-900"
							}
						>
							Report
						</NavLink>
					)}

					{role && (
						<div className="relative">
							<p
								onClick={() => setMode(!mode)}
								className="font-semibold text-blue-400 cursor-pointer"
							>
								{role}
							</p>
							<div
								onClick={onLogout}
								className={`absolute mt-3 cursor-pointer w-20 p-4 rounded right-[3px] bg-blue-400 hover:bg-blue-300 text-white font-semibold ${
									mode ? "block" : "hidden"
								}`}
							>
								<p>logout</p>
							</div>
						</div>
					)}
				</PopoverGroup>
			</nav>
		</header>
	);
}

Header.propTypes = {
	role: PropTypes.string
};
