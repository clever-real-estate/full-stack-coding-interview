import { Route, Routes } from "react-router-dom";

import Auth from "@/pages/auth";
import Photos from "@/pages/photos";
import ProtectedRoute from "@/components/ProtectedRoute";

export function App() {
	return (
		<main className="min-h-screen max-w-[640px] mx-auto">
			<Routes>
				<Route
					path="/photos"
					element={
						<ProtectedRoute>
							<Photos />
						</ProtectedRoute>
					}
				/>
				<Route path="*" element={<Auth />} />
			</Routes>
		</main>
	);
}

export default App;
