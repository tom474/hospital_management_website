import { useState } from "react";
import { useLocation } from "react-router-dom";

export const usePaginate = (data) => {
	const [currentPage, setCurrentPage] = useState(1);
	const patientsPerPage = 10;
	const indexOfLastPatient = currentPage * patientsPerPage;
	const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
	let currentData = [];
	let totalPages = 0;
	if (data) {
		currentData = data.slice(indexOfFirstPatient, indexOfLastPatient);
		totalPages = Math.ceil(data.length / patientsPerPage);
	}
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	return { currentData, currentPage, totalPages, paginate };
};

export const useExtractSearchParams = (val) => {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const res = queryParams.get(val);

	return res;
};

export const formatTime = (timeString) => {
	// Split the time string by colon
	const [hours, minutes] = timeString.split(":");

	// Return the formatted time as "HH:MM"
	return `${hours}:${minutes}`;
};

export const formatSalary = (salary) => {
	const formattedSalary = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0
	}).format(salary);

	return formattedSalary;
};

export const formatDate = (dateString) => {
	const date = new Date(dateString);

	const year = date.getUTCFullYear();
	const month = String(date.getUTCMonth() + 1).padStart(2, "0");
	const day = String(date.getUTCDate()).padStart(2, "0");

	return `${year}-${month}-${day}`;
};

export const displayStatus = (status) => {
	const defaultStyle = "badge border-none text-white font-semibold";
	if (status === "Scheduled") {
		return <p className={`${defaultStyle}  bg-green-400`}>{status}</p>;
	} else if (status === "Completed") {
		return <p className={`${defaultStyle}  bg-sky-400`}>{status}</p>;
	} else {
		return <p className={`${defaultStyle}  bg-red-400`}>{status}</p>;
	}
};

export const displayJobType = (jobType) => {
	let defaultStyle =
		"py-2 text-xs rounded-full text-center w-fit min-w-24 font-bold";

	if (jobType === "Doctor") {
		defaultStyle += " bg-blue-400 text-white";
	}

	if (jobType === "Nurse") {
		defaultStyle += " bg-green-400 text-white";
	}

	if (jobType === "Receptionist") {
		defaultStyle += " bg-yellow-400 text-white";
	}

	if (jobType === "Administrative") {
		defaultStyle += " bg-red-400 text-white";
	}

	return (
		<td className="align-top text-black flex justify-center">
			<p className={`${defaultStyle} `}>{jobType}</p>
		</td>
	);
};

export const fileToBase64 = (file) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.onloadend = () => {
			resolve(reader.result);
		};

		reader.onerror = (error) => {
			reject(error);
		};

		reader.readAsDataURL(file);
	});
};

export const verifyLogin = () => {
	const role = localStorage.getItem("role");

	if (role === null) {
		window.location.href = "/";
	}

	return true;
};

export const verifyAdmin = () => {
	const role = localStorage.getItem("role");

	if (role !== "Admin") {
		window.location.href = "/";
	}
	return true;
};

export const verifyAdminOrReceptionist = () => {
	const role = localStorage.getItem("role");

	if (role !== "Admin" && role !== "Receptionist") {
		window.location.href = "/";
	}
	return true;
};

export const adjustDateByOneDay = (dateString) => {
	if (dateString === "") return "";
	let date = new Date(dateString);

	date.setDate(date.getDate() + 1);

	return date.toISOString().split("T")[0];
};
