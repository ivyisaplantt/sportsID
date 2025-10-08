import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ProgramDetail() {
  const { id } = useParams();
  const [program, setProgram] = useState<any>(null);
  const [form, setForm] = useState({ name: '', child: '', email: '' });

  useEffect(() => {
    fetch(`http://localhost:5000/api/programs/${id}`)
      .then((res) => res.json())
      .then(setProgram);
  }, [id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, programId: id })
    });
    alert('Registration submitted!');
  };

  if (!program) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">{program.name}</h2>
      <p className="text-gray-600 mb-4">Location: {program.location}</p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="border p-2 w-full"
          placeholder="Parent Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="border p-2 w-full"
          placeholder="Child Name"
          value={form.child}
          onChange={(e) => setForm({ ...form, child: e.target.value })}
        />
        <input
          className="border p-2 w-full"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}