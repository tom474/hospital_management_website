import PropTypes from "prop-types";

export default function Sidebar({ patient }) {
	return (
		<div className="w-3/12 flex flex-col justify-center items-center mt-16 border-solid border-[1px] rounded-xl border-blue-700">
			<div className="flex flex-col items-center mt-4 mb-5">
				<p className="text-2xl text-blue-600 font-semibold">
					{patient.firstName} {patient.lastName}
				</p>

				<p className="mt-1 italic text-gray-500 text-base">
					{patient.email}
				</p>
			</div>
			<div className="w-full rounded-bl-xl rounded-br-xl overflow-clip">
				<ul className="menu bg-base-200  w-full ">
					<li className="cursor-pointer p-2 hover:bg-blue-100">
						<div></div>
					</li>
					<li className="cursor-pointer p-2 hover:bg-blue-100">
						Sidebar Item 2
					</li>
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
