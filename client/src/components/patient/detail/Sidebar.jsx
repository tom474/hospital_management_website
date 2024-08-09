import { faClock, faUser } from "@fortawesome/free-regular-svg-icons";
import { faNotesMedical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ patient }) {
	const navigate = useNavigate();

	const [sidebarOptions, setSidebarOptions] = useState([
		{
			title: "Personal Information",
			icon: <FontAwesomeIcon icon={faUser} />,
			selected: true
		},
		{
			title: "Schedule",
			icon: <FontAwesomeIcon icon={faClock} />,
			selected: false
		},
		{
			title: "Treatment History",
			icon: <FontAwesomeIcon icon={faNotesMedical} />,
			selected: false
		}
	]);

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
		navigate(`/patient/${patient.id}?option=${direction}`);
	};

	return (
		<div className="w-3/12 flex flex-col justify-center items-center mt-16 border-solid border-[1px] rounded-xl border-slate-500 h-fit">
			<div className="flex flex-col items-center mt-4 mb-5">
				<p className="text-2xl text-blue-600 font-semibold">
					{patient.firstName} {patient.lastName}
				</p>

				<p className="mt-1 italic text-gray-500 text-base">
					{patient.email}
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

Sidebar.propTypes = {
	patient: PropTypes.shape({
		id: PropTypes.number.isRequired,
		firstName: PropTypes.string.isRequired,
		lastName: PropTypes.string.isRequired,
		email: PropTypes.string.isRequired,
		phoneNumber: PropTypes.string.isRequired,
		birthDate: PropTypes.string.isRequired,
		bloodType: PropTypes.string.isRequired,
		address: PropTypes.string.isRequired,
		allergies: PropTypes.string.isRequired
	}).isRequired
};
