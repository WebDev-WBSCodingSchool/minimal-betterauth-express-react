import { useEffect, useState } from 'react';
import { createAuthClient } from 'better-auth/react';

type User = {
  name: string;
  email: string;
  image: string;
};

const { signIn, signUp, signOut, useSession } = createAuthClient({ baseURL: 'http://localhost:3000' });

function App() {
  const [user, setUser] = useState<null | User>(null);
  const [protectedData, setProtectedData] = useState<null | object>(null);

  const { data, error, isPending, refetch } = useSession();
  useEffect(() => {}, []);

  console.log({ data, error, isPending });
  const handleSignIn = async () => {
    try {
      const response = await signIn.social({
        provider: 'google',
        callbackURL: 'http://localhost:5173/',
      });
      refetch();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setProtectedData(null);
    } catch (error) {
      console.log(error);
    }
  };

  const getProtectedData = async () => {
    try {
      const res = await fetch('http://localhost:3000/protected', {
        credentials: 'include',
      });
      console.log('RES: ', res);
      if (res.redirected) window.location.href = res.url;
      const d = await res.json();
      console.log('DATA: ', d);
      if (!res.ok) throw new Error('Fetching Data failed');
      if (!d) setProtectedData(null);
      else setProtectedData(d);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='w-screen h-screen'>
      <nav className='flex justify-end p-2 gap-2'>
        {!data?.user && <button onClick={handleSignIn}>Sign In with Google</button>}
        {data?.user && (
          <>
            <button onClick={getProtectedData}>Protected Page</button>
            <button className='button' onClick={handleSignOut}>
              Logout
            </button>
          </>
        )}
      </nav>
      <main>
        <div className='text-center'>
          {isPending && <p>Hold on, just a sec...</p>}
          {data ? (
            <>
              <h2>User Info</h2>
              <p>{data.user.name}</p>
              <p>{data.user.email}</p>
              <div className='size-20 mx-auto'>
                <img
                  src={
                    data.user.image ??
                    'https://upload.wikimedia.org/wikipedia/en/thumb/3/34/RickAstleyNeverGonnaGiveYouUp7InchSingleCover.jpg/250px-RickAstleyNeverGonnaGiveYouUp7InchSingleCover.jpg'
                  }
                  alt=''
                  className='w-full h-full'
                />
              </div>
            </>
          ) : (
            <h2>Log in to see stuff</h2>
          )}
          {data && <p>{JSON.stringify(data)}</p>}
          <br />
          {protectedData && <p>{JSON.stringify(protectedData)}</p>}
        </div>
      </main>
    </div>
  );
}

export default App;
