import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TopBar from '../components/TopBar';
import AllPhotos from './AllPhotos';

const queryClient = new QueryClient();

function Dashboard() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='min-h-screen md:max-w-2xl mx-auto bg-white px-8 py-16'>
        <TopBar />
        <AllPhotos />
      </div>
    </QueryClientProvider>
  );
}

export default Dashboard;
