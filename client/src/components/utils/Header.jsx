import { PopoverGroup } from "@headlessui/react";
import { NavLink } from "react-router-dom";

export default function Header() {
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
				</PopoverGroup>
			</nav>
		</header>
	);
}
