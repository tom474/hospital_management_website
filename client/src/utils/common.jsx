export const formatSalary = (salary) => {
	const formattedSalary = new Intl.NumberFormat("vi-VN", {
		style: "currency",
		currency: "VND"
	}).format(salary);

	return formattedSalary;
};
