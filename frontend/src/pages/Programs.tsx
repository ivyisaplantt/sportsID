import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Programs() {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/programs')
      .then((res) => res.json())
      .then(setPrograms);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Available Programs</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {programs.map((p: any) => (
          <div key={p.id} className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold text-lg">{p.name}</h3>
            <p className="text-sm text-gray-600">Ages: {p.ageRange}</p>
            <p className="text-sm">Location: {p.location}</p>
            <p className="text-sm mb-2">Price: ${p.price}</p>
            <Link to={`/programs/${p.id}`} className="text-blue-600 underline">
              Register →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}