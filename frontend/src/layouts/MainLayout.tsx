import { Outlet } from 'react-router';
import authClient from '../services/auth-client';
import Navbar from '../components/Navbar';

const { signIn, signOut, useSession } = authClient;

const handleSignIn = async () => {
  try {
    await signIn.social({
      provider: 'google',
      callbackURL: 'http://localhost:5173/', // target URL after successful signin
    });
  } catch (error) {
    console.log(error);
  }
};

const MainLayout = () => {
  const { data, error, isPending } = useSession();
  console.log({ data, error, isPending });

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='w-screen h-screen'>
      <Navbar user={data?.user} handleSignIn={handleSignIn} handleSignOut={handleSignOut} isPending={isPending} />
      <main>
        <Outlet context={{ data, isPending }} />
      </main>
    </div>
  );
};

export default MainLayout;
