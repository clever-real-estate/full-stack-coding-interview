// TODO make the Logo better below
import { Link } from 'react-router-dom';

import Logo from '@/assets/logo.svg';
import { useAuth } from '@/hooks/useAuth';

const Header = () => {
  const { user, logout } = useAuth();
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      <Link to="/">
        <img src={Logo}
          alt="Clever logo"
          className="h-8 w-auto"
          fetchPriority="high"
        />
      </Link>
      {user && (
        <div className="flex items-center gap-4">
          <span>{user.username}</span>
          <button onClick={logout} className="font-semibold text-rose-600">Logout</button>
        </div>
      )}
    </header>
  );
};
export default Header;
