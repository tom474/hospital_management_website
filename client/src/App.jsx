import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./config/MuiConfig";
import Homepage from "./pages/Homepage";

// Router configuration of the application.
const router = createBrowserRouter([{
	path: "/",
	element: <Root />,
	children: [
		{
			index: true,
			element: <Homepage />
		}
	]
}]);

const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<RouterProvider router={router} />
		</ThemeProvider>
	);
}

export default App;
