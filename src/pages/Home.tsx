import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <Link to="/signin" className="font-semibold">
      시작하기
    </Link>
  );
}
