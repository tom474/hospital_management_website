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
import {
	verifyAdmin,
	verifyAdminOrReceptionist,
	verifyLogin
} from "./utils/common";

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
							loader: verifyLogin
						},
						{
							path: "add-patient",
							element: <AddPatientPage />,
							loader: verifyAdminOrReceptionist
						},
						{
							path: ":patientId",
							element: <PatientDetailPage />,
							loader: verifyLogin
						}
					]
				},
				{
					path: "staff",
					children: [
						{
							index: true,
							element: <StaffPage />,
							loader: verifyLogin
						},
						{
							path: "add-staff",
							element: <AddStaffPage />,
							loader: verifyAdmin
						},
						{
							path: ":staffId",
							element: <StaffDetailPage />,
							loader: verifyLogin
						}
					]
				},
				{
					path: "appointment",
					children: [
						{
							index: true,
							element: <AppointmentPage />,
							loader: verifyAdminOrReceptionist
						}
					]
				},
				{
					path: "report",
					children: [
						{
							index: true,
							element: <ReportPage />,
							loader: verifyAdmin
						}
					]
				}
			]
		}
	]);

	return <RouterProvider router={router} />;
}
