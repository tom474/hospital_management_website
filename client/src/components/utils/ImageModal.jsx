import PropTypes from "prop-types";

export default function ImageModal({ imageUrl, modalId }) {
	return (
		<dialog id={modalId} className="modal">
			<div className="modal-box p-0 border-none bg-white max-w-screen-lg max-h-screen">
				<div className="flex justify-center">
					<img
						src={imageUrl}
						alt="Diagnose"
						className="w-full h-full object-contain"
					/>
				</div>
			</div>
			<form method="dialog" className="modal-backdrop">
				<button>Close</button>
			</form>
		</dialog>
	);
}

ImageModal.propTypes = {
	imageUrl: PropTypes.string.isRequired,
	modalId: PropTypes.string.isRequired
};
