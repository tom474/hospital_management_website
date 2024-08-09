import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import Homepage from "./pages/Homepage";
import PatientDetailPage from "./pages/PatientDetailPage";

export default function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Root />,
			children: [
				{
					index: true,
					element: <Homepage />
				},
				{
					path: "patient",
					children: [
						{
							path: ":patientId",
							element: <PatientDetailPage />
						}
					]
				}
			]
		}
	]);

	return <RouterProvider router={router} />;
}
