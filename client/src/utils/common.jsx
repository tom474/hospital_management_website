export const formatSalary = (salary) => {
	const formattedSalary = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0
	}).format(salary);

	return formattedSalary;
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
