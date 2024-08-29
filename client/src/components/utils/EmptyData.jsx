import PropTypes from "prop-types";
import { faFolderOpen } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function EmptyData({ children }) {
	return (
		<div className="flex flex-col gap-2 justify-center items-center mt-5 text-lg text-slate-500">
			<FontAwesomeIcon className="text-[3rem]" icon={faFolderOpen} />
			<p className="font-bold">{children}</p>
		</div>
	);
}

EmptyData.propTypes = {
	children: PropTypes.string.isRequired
};
