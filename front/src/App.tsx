import { Route, Routes } from "react-router-dom";

import Auth from "@/pages/auth";
import Photos from "@/pages/photos";

export function App() {
  return (
    <main className='bg-gray-200 min-h-screen'>
      <Routes>
        <Route path="/photos" element={<Photos />} />
        <Route path="*" element={<Auth />} />
      </Routes>
    </main>
  )
}

export default App
