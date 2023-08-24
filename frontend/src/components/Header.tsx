import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './Router';

export default function Header() {
  const { user, logout } = useContext(UserContext);

  return (
    <header className="header flex">
      {!user && (
        <nav>
          <ul className="navbar flex">
            <>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          </ul>
        </nav>
      )}
      {user && (
        <>
          <h1>{user.name}</h1>
          {user.membership !== 'member' && <Link to='/membership'>Join the club</Link> }
          <button className="logout-btn" type="button" onClick={logout}>
            Logout
          </button>
        </>
      )}
    </header>
  );
}
