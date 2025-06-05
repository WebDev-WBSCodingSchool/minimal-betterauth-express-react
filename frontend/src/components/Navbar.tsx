import { useRef, type FormEvent } from 'react';
import { NavLink } from 'react-router';
import authClient from '../services/auth-client';

const { signUp, signIn, signOut } = authClient;

const handleGoogleSignIn = async () => {
  try {
    await signIn.social({
      provider: 'google',
      callbackURL: 'http://localhost:5173/', // target URL after successful signin
    });
  } catch (error) {
    console.log(error);
  }
};

const handleSignOut = async () => {
  try {
    await signOut();
  } catch (error) {
    console.log(error);
  }
};

const Navbar = ({ user, isPending }: NavbarProps) => {
  const dialogRef = useRef<null | HTMLDialogElement>(null);

  const handlePWSignUp = async (e: FormEvent) => {
    e.preventDefault();
    const elements = (e.target as HTMLFormElement).elements;
    const { usernameSu, emailSu, passwordSu } = elements as HTMLFormControlsCollection & {
      usernameSu: HTMLInputElement;
      emailSu: HTMLInputElement;
      passwordSu: HTMLInputElement;
    };

    const name = usernameSu.value;
    const email = emailSu.value;
    const password = passwordSu.value;

    try {
      const { data, error } = await signUp.email(
        { email, password, name },
        {
          onRequest: (ctx) => {
            //show loading
            console.log('ON REQUEST', ctx);
          },
          onSuccess: (ctx) => {
            //redirect to the dashboard or sign in page
            console.log('ON SUCCESS', ctx);
          },
          onError: (ctx) => {
            // display the error message
            alert(ctx.error.message);
          },
        }
      );
      console.log({ data, error });
    } catch (error) {
      console.log(error);
    }
  };

  const handlePWSignIn = async (e: FormEvent) => {
    e.preventDefault();
    const elements = (e.target as HTMLFormElement).elements;
    const { emailSi, passwordSi } = elements as HTMLFormControlsCollection & {
      emailSi: HTMLInputElement;
      passwordSi: HTMLInputElement;
    };

    const email = emailSi.value;
    const password = passwordSi.value;

    try {
      const { data, error } = await authClient.signIn.email(
        { email, password, rememberMe: true },
        {
          onRequest: (ctx) => {
            //show loading
            console.log('ON REQUEST', ctx);
          },
          onSuccess: (ctx) => {
            //redirect to the dashboard or sign in page
            console.log('ON SUCCESS', ctx);
          },
          onError: (ctx) => {
            // display the error message
            alert(ctx.error.message);
          },
        }
      );
      console.log({ data, error });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <nav className='flex justify-end p-2 gap-2'>
        {!user && <button onClick={() => dialogRef.current?.showModal()}>Sign In</button>}
        {user && (
          <button className='button' onClick={handleSignOut}>
            Logout
          </button>
        )}
        {/* Should be rendered conditionally, here to show effect of ProtectedLayout */}
        <NavLink to={'/protected'} className={({ isActive }) => (isActive ? 'underline button' : 'button')}>
          Protected page
        </NavLink>
      </nav>
      {!user && (
        <dialog
          ref={dialogRef}
          className='p-5 rounded m-auto backdrop:backdrop-blur-xs relative  overflow-y-auto max-h-screen'
        >
          {isPending && (
            <div className='absolute inset-0 h-full w-full text-center content-center backdrop-blur'>Loading...</div>
          )}
          <button
            className='absolute top-2 right-2 !rounded-full aspect-square'
            onClick={() => dialogRef.current?.close()}
          >
            ✖
          </button>
          <button disabled={isPending} onClick={handleGoogleSignIn}>
            Sign in with Google
          </button>
          <form className='my-2' onSubmit={handlePWSignUp}>
            <fieldset className='flex flex-col gap-1 border rounded p-2' disabled={isPending}>
              <legend className='leading-12'>Sign up</legend>
              <label htmlFor='usernameSu'>Username</label>
              <input type='text' name='usernameSu' id='usernameSu' className='border py-2 px-3 rounded' />
              <label htmlFor='emailSu'>Email</label>
              <input type='emailSu' name='emailSu' id='emailSu' className='border py-2 px-3 rounded' />
              <label htmlFor='passwordSu'>Password</label>
              <input type='password' name='passwordSu' id='passwordSu' className='border py-2 px-3 rounded' />
              <button className='my-2'>Sign in</button>
            </fieldset>
          </form>
          <div className='text-center '>or</div>
          <hr />
          <form onSubmit={handlePWSignIn}>
            <fieldset className='flex flex-col gap-1 border rounded p-2' disabled={isPending}>
              <legend className='leading-12'>Sign in</legend>

              <label htmlFor='emailSi'>Email</label>
              <input type='emailSi' name='emailSi' id='emailSi' className='border py-2 px-3 rounded' />
              <label htmlFor='passwordSi'>Password</label>
              <input type='password' name='passwordSi' id='passwordSi' className='border py-2 px-3 rounded' />
              <button className='my-2'>Sign in</button>
            </fieldset>
          </form>
        </dialog>
      )}
    </>
  );
};

export default Navbar;
