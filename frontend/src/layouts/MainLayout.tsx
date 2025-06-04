import { Outlet } from 'react-router';
import authClient from '../services/auth-client';
import Navbar from '../components/Navbar';

const { useSession } = authClient;

const MainLayout = () => {
  const { data, error, isPending } = useSession();
  console.log({ data, error, isPending });

  return (
    <div className='w-screen h-screen'>
      <Navbar user={data?.user} isPending={isPending} />
      <main>
        <Outlet context={{ data, isPending }} />
      </main>
    </div>
  );
};

export default MainLayout;
