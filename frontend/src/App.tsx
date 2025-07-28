import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import SignInPage from '@/pages/SignInPage';
import SignUpPage from '@/pages/SignUpPage';
import AllPhotosPage from '@/pages/AllPhotosPage';

import MainLayout from '@/components/layout/MainLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignInPage />}/>
        <Route path="/signup" element={<SignUpPage />}/>
        <Route element={<MainLayout />} />
        <Route path="/" element={<AllPhotosPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
