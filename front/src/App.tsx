import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import Login from "@/pages/login";
import Photos from "@/pages/photos";
import Register from "@/pages/register";

export function App() {
	return (
		<main className="min-h-screen max-w-[640px] mx-auto">
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route
					path="/*"
					element={
						<ProtectedRoute>
							<Photos />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</main>
	);
}

export default App;
