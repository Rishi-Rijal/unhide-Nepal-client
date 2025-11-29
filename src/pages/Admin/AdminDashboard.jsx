import { useState } from 'react';
import {UsersTable} from '../../features/admin';
import {ListingsTable} from '../../features/admin';

const AdminDashboard = () => {
  const [tab, setTab] = useState('users');

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>

        <div className="mb-6">
          <button className={`px-4 py-2 mr-2 rounded ${tab==='users' ? 'bg-blue-600 text-white' : 'bg-white'}`} onClick={() => setTab('users')}>Users</button>
          <button className={`px-4 py-2 mr-2 rounded ${tab==='listings' ? 'bg-blue-600 text-white' : 'bg-white'}`} onClick={() => setTab('listings')}>Listings</button>
        </div>

        <div>
          {tab === 'users' && <UsersTable />}
          {tab === 'listings' && <ListingsTable />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
