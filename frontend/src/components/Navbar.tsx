import { NavLink } from 'react-router';

const Navbar = ({ user, handleSignIn, handleSignOut }: NavbarProps) => {
  return (
    <nav className='flex justify-end p-2 gap-2'>
      {!user && <button onClick={handleSignIn}>Sign In with Google</button>}
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
  );
};

export default Navbar;
