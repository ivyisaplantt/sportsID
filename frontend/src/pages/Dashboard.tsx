import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [regs, setRegs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/registrations')
      .then((res) => res.json())
      .then(setRegs);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Registrations</h2>
      {regs.length === 0 ? (
        <p className="text-gray-600">No registrations yet.</p>
      ) : (
        <ul className="space-y-3">
          {regs.map((r: any, i) => (
            <li key={i} className="bg-white p-3 rounded shadow">
              <p className="font-semibold">{r.child}</p>
              <p className="text-sm">Parent: {r.name}</p>
              <p className="text-sm text-gray-600">Email: {r.email}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}