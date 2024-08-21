export const formatSalary = (salary) => {
	const formattedSalary = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0
	}).format(salary);

	return formattedSalary;
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
