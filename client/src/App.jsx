import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import Homepage from "./pages/Homepage";
import PatientDetailPage from "./pages/PatientDetailPage";
import PatientPage from "./pages/PatientPage";
import AddPatientPage from "./pages/AddPatientPage";
import StaffPage from "./pages/StaffPage";
import StaffDetailPage from "./pages/StaffDetailPage";
import AddStaffPage from "./pages/AddStaffPage";
import AppointmentPage from "./pages/AppointmentPage";
import ReportPage from "./pages/ReportPage";

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
							element: <PatientPage />
						},
						{
							path: "add-patient",
							element: <AddPatientPage />
						},
						{
							path: ":patientId",
							element: <PatientDetailPage />
						}
					]
				},
				{
					path: "staff",
					children: [
						{
							index: true,
							element: <StaffPage />
						},
						{
							path: "add-staff",
							element: <AddStaffPage />
						},
						{
							path: ":staffId",
							element: <StaffDetailPage />
						}
					]
				},
				{
					path: "appointment",
					children: [
						{
							index: true,
							element: <AppointmentPage />
						}
					]
				},
				{
					path: "report",
					children: [
						{
							index: true,
							element: <ReportPage />
						}
					]
				}
			]
		}
	]);

	return <RouterProvider router={router} />;
}
