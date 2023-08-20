import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { RootLayout } from "./Components/Navigation/RootLayout";
import { GridLayout } from "./Components/Navigation/GridLayout";
import { Welcome } from "./Routes/Welcome";
import { Home } from "./Routes/Home";
import { NavigationLayout } from "./Components/Navigation/NavigationLayout";
import { MyProfile } from "./Routes/MyProfile";
import { UnprotectedRoute } from "./Routes/RouteLimiters/UnprotectedRoute";
import { ProtectedRoute } from "./Routes/RouteLimiters/ProtectedRoute";
import { Requests } from "./Routes/Requests";
import { RequestStatus } from "./Routes/RequestStatus";
import { CertificateRequests } from "./Routes/CertificateRequests";
import { ProcessRequest } from "./Routes/ProcessRequest";
import { AddUser } from "./Routes/AddUser";
import { RequestHelp } from "./Routes/RequestHelp";
import { Typography } from "@mui/material";

const router = createBrowserRouter(createRoutesFromElements(
  <Route element={<RootLayout/>}>
		<Route element={<GridLayout/>}>
			<Route element={<UnprotectedRoute/>}>
				<Route path="/" element={<Welcome/>}/>
			</Route>
		</Route>

		<Route element={<ProtectedRoute/>}>
			<Route element={<NavigationLayout/>}>
				<Route path="home" element={<Home/>}/>
				<Route path="profile" element={<MyProfile/>}/>
				<Route path="request" element={<Requests/>}/>
				<Route path="status" element={<RequestStatus/>}/>
				<Route path="certificate-requests" element={<CertificateRequests/>}/>
				<Route path="certificate-requests/:id" element={<ProcessRequest/>}/>
				<Route path="add-user" element={<AddUser/>}/>
				<Route path="request-help" element={<RequestHelp/>}/>
			</Route>
		</Route>
  </Route>
))

function App() {
	return (
		<RouterProvider router={router}/>
	);
}

export default App;
