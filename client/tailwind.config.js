/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			width: {
				1200: "1200px"
			}
		}
	},
	// eslint-disable-next-line no-undef
	plugins: [require("daisyui")]
};
