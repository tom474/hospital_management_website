import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import Homepage from "./pages/Homepage";

export default function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Root />,
			children: [
				{
					index: true,
					element: <Homepage />
				}
			]
		}
	]);

	return <RouterProvider router={router} />;
}
