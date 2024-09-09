import PropTypes from "prop-types";

export default function Login({ loginFunction }) {
	return (
		<dialog id="login_modal" className="modal">
			<div className="modal-box bg-white">
				<form method="dialog">
					<h3 className="font-bold text-lg text-blue-400">
						Welcome to Group 10 website!
					</h3>
					<h3 className="font-bold text-lg text-blue-400">
						Please choose a role to use
					</h3>
					<div className="flex gap-3 mt-3 justify-center">
						<div
							onClick={() => {
								loginFunction("Doctor");
							}}
							className="btn btn-info text-white"
						>
							Doctor
						</div>
						<div
							onClick={() => {
								loginFunction("Nurse");
							}}
							className="btn btn-info text-white"
						>
							Nurse
						</div>
						<div
							onClick={() => {
								loginFunction("Receptionist");
							}}
							className="btn btn-info text-white"
						>
							Receptionist
						</div>
						<div
							onClick={() => {
								loginFunction("Admin");
							}}
							className="btn btn-info text-white"
						>
							Admin
						</div>
					</div>
				</form>
			</div>
		</dialog>
	);
}

Login.propTypes = {
	loginFunction: PropTypes.func.isRequired
};
