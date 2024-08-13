import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import Homepage from "./pages/Homepage";
import PatientDetailPage from "./pages/PatientDetailPage";
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

					element: <Homepage />
				},
				{
					path: "patient",
					children: [
            {
              index: true,
              element: <PatientPage />,
            },
            {
              path: "add-patient",
              element: <AddPatientPage />,
            }
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
