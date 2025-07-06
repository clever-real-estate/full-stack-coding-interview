import { Route, Routes } from "react-router-dom";

import Auth from "@/pages/auth";
import Photos from "@/pages/photos";

export function App() {
  return (
    <main className='min-h-screen max-w-[320px] mx-auto'>
      <Routes>
        <Route path="/photos" element={<Photos />} />
        <Route path="*" element={<Auth />} />
      </Routes>
    </main>
  )
}

export default App
