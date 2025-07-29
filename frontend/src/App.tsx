import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import SignInPage from '@/pages/SignInPage';
import SignUpPage from '@/pages/SignUpPage';
import PhotoGallery from '@/pages/PhotoGallery';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignInPage />}/>
        <Route path="/signup" element={<SignUpPage />}/>
        <Route path="/photos" element={<PhotoGallery />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
