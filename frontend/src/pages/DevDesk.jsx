import { useEffect, useState } from 'react';
import { getUsers } from '../services/api';
import Navbar from '../components/Navbar';

const DevDesk = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        setMessage({ type: 'error', text: err.message });
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
    <Navbar />
    <div className="p-4">
      {message && <div className={`message ${message.type}`}>{message.text}</div>}
      <h1 className="text-3xl font-bold mb-4">DevDesk</h1>
      <p className="mb-4">Registrierte Nutzer</p>
      <ul className="space-y-2">
        {users.map(user => (
          <li key={user._id} className="p-2 bg-gray-100 rounded shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{user.username} ({user.email})</p>
                <p>Team: {user.team}</p>
              </div>
              <div>
                <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Bearbeiten</button>
                <button className="bg-red-500 text-white px-2 py-1 rounded">Löschen</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
            </>
  );
};

export default DevDesk;