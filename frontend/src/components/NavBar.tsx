import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow">
      <div className="max-w-4xl mx-auto flex justify-between">
        <Link to="/" className="font-bold text-lg">Register X</Link>
        <div className="space-x-4">
          <Link to="/programs">Programs</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>
      </div>
    </nav>
  );
}