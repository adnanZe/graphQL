import { Link, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import AUTH_TOKEN from '../model/constants';

export default function Header() {
  const navigate = useNavigate();
  const authToken = localStorage.getItem(AUTH_TOKEN);

  const handleLogout = useCallback(() => {
    localStorage.removeItem(AUTH_TOKEN);
    navigate('/');
  }, [navigate]);

  return (
    <div className="flex pa1 justify-between nowrap orange">
      <div className="flex flex-fixed blank">
        <Link to="/" className="no-underline black">
          <div className="fw7 mr1">Hacker News</div>
        </Link>
        <Link to="/" className="no-underline black">
          new
        </Link>
        <div className="ml1">|</div>
        <Link to="/search" className="ml1 no-underline black">
          search
        </Link>
        <div className="ml1">|</div>
        {authToken && (
          <div className="flex">
            <div className="ml1">|</div>
            <Link to="/create" className="ml1 no-underline black">
              submit
            </Link>
          </div>
        )}
      </div>
      <div className="flex flex-fixed">
        {authToken ? (
          <button
            className="ml1 pointer black"
            type="button"
            onClick={handleLogout}
          >
            logout
          </button>
        ) : (
          <Link to="/login" className="ml1 no-underline black">
            login
          </Link>
        )}
      </div>
    </div>
  );
}
