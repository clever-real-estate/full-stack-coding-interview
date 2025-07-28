import { Outlet } from 'react-router-dom';

import Header from '@/components/layout/Header';

const MainLayout = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <main className="p-4 md:p-8">
      <Outlet />
    </main>
  </div>
);
export default MainLayout;
