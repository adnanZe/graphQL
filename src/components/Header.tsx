import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className="flex pal justify-between nowrap orange">
      <div className="flex flex-fixed blank">
        <Link to="/" className="no-underline black">
          <div className="fw7 mr1">Hacker News</div>
        </Link>
        <Link to="/" className="no-underline black">
          new
        </Link>
        <div className="ml1">|</div>
        <Link to="/create" className="ml1 no-underline black">
          submit
        </Link>
      </div>
    </div>
  );
}
