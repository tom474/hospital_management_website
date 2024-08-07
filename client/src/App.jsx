import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./config/MuiConfig";

const router = createBrowserRouter([{
	path: "/",
	element: <Root />
}]);

const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<RouterProvider router={router} />
		</ThemeProvider>
	);
}

export default App;
