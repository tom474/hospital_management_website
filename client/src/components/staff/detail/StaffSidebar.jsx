import { faClock, faUser } from "@fortawesome/free-regular-svg-icons";
import {
	faBookMedical,
	faNotesMedical
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StaffSidebar({ staff }) {
	const navigate = useNavigate();

	const [sidebarOptions, setSidebarOptions] = useState([
		{
			title: "Staff Information",
			icon: <FontAwesomeIcon icon={faUser} />,
			selected: true
		},
		{
			title: "Schedule",
			icon: <FontAwesomeIcon icon={faClock} />,
			selected: false
		},
		{
			title: "Appointment",
			icon: <FontAwesomeIcon icon={faNotesMedical} />,
			selected: false
		},
		{
			title: "Job History",
			icon: <FontAwesomeIcon icon={faBookMedical} />,
			selected: false
		}
	]);

	const displayJobType = (jobType) => {
		let defaultStyle =
			"mt-2 py-1 text-xs rounded-full text-center w-fit min-w-20 font-bold justify-self-end";

		if (jobType === "Doctor") {
			defaultStyle += " bg-blue-400 text-white";
		}

		if (jobType === "Nurse") {
			defaultStyle += " bg-green-400 text-white";
		}

		if (jobType === "Receptionist") {
			defaultStyle += " bg-yellow-400 text-white";
		}

		return (
			<div className="align-top text-black flex justify-center">
				<p className={`${defaultStyle} `}>{jobType}</p>
			</div>
		);
	};

	const handleSelectOption = (title) => {
		// Update the selected option in the sidebar.
		setSidebarOptions((prev) => {
			return prev.map((option) => {
				if (option.title === title) {
					return { ...option, selected: true };
				} else {
					return { ...option, selected: false };
				}
			});
		});

		// Redirect to the selected option to display the corresponding content in other component.
		const direction = title.toLowerCase().replace(" ", "_");
		navigate(`/staff/${staff.id}?option=${direction}`);
	};

	return (
		<div className="w-3/12 flex flex-col justify-center items-center border-solid border-[1px] rounded-xl border-slate-500 h-fit">
			<div className="w-full flex justify-end mr-4 mb-3">
				{displayJobType(staff.jobType)}
			</div>
			<div className="flex flex-col items-center mb-5">
				<p className="text-2xl text-blue-600 font-semibold">
					{staff.firstName} {staff.lastName}
				</p>

				<p className="mt-1 italic text-gray-500 text-base">
					{staff.email}
				</p>
			</div>
			<div className="w-full rounded-bl-xl rounded-br-xl overflow-clip">
				<ul className="menu menu-vertical w-full">
					{sidebarOptions.map((option, index) => (
						<li
							key={index}
							className={`cursor-pointer mb-1 rounded-xl transition delay-150 ease-in-out ${
								option.selected ? "bg-blue-200" : ""
							}`}
							onClick={() => handleSelectOption(option.title)}
						>
							<div className="flex gap-5 p-3 items-center text-lg text-black">
								{option.icon}
								<span className="ml-2">{option.title}</span>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

StaffSidebar.propTypes = {
	staff: PropTypes.object.isRequired
};
