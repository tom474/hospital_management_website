import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import Homepage from "./pages/Homepage";
import PatientPage from "./pages/PatientPage";
import AddPatientPage from "./pages/AddPatientPage";

export default function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Root />,
			children: [
				{
					index: true,
					element: <Homepage />,
				},
				{
					path: "patient",
					children: [
						{
							index: true,
							element: <PatientPage />,
						},
						{
							path: "addPatient",
							element: <AddPatientPage />,
						},
					],
				},
			],
		},
	]);

	return <RouterProvider router={router} />;
}
