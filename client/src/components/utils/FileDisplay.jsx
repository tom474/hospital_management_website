import { PaperClipIcon } from "@heroicons/react/16/solid";
import PropTypes from "prop-types";

export default function FileDisplay({ fileName, size, onRemove, name }) {
	return (
		<li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6 border-solid border-[1px] border-gray-200 rounded-lg mt-2">
			<div className="flex w-0 flex-1 items-center">
				<PaperClipIcon
					aria-hidden="true"
					className="h-5 w-5 flex-shrink-0 text-gray-400"
				/>
				<div className="ml-4 flex min-w-0 flex-1 gap-2">
					<span className="truncate font-medium text-black">
						{fileName}
					</span>
					<span className="flex-shrink-0 text-gray-400">
						{size}mb
					</span>
				</div>
			</div>
			<div className="ml-4 flex-shrink-0">
				<div
					onClick={() => onRemove({ name: name })}
					className="font-medium text-red-600 cursor-pointer w-7 h-7 rounded-full flex items-center justify-center transition ease-in hover:text-red-400 hover:bg-red-100"
				>
					✕
				</div>
			</div>
		</li>
	);
}

FileDisplay.propTypes = {
	fileName: PropTypes.string.isRequired,
	size: PropTypes.string.isRequired,
	onRemove: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired
};
