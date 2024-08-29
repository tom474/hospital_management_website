import PropTypes from "prop-types";

export default function Loading({ isFull = true }) {
	if (!isFull) {
		return (
			<span className="loading loading-spinner loading-md text-sky-500"></span>
		);
	}
	return (
		<div className="flex w-full justify-center mt-10">
			<span className="loading loading-spinner loading-lg text-sky-500"></span>
		</div>
	);
}

Loading.propTypes = {
	isFull: PropTypes.bool
};
