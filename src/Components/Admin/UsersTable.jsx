import { useEffect, useState } from 'react';
import { getUsers, updateUserRole, deleteUser } from '../../api/admin.api.js';
import { useToast } from '../Shared/Toast';

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const { showToast } = useToast();

  const load = async () => {
    try {
      const res = await getUsers({ page, limit: 20 });
      setUsers(res.data.data.users);
      setTotal(res.data.data.total);
    } catch (err) {
      showToast(err?.response?.data?.message || 'Failed to load users', 'error');
    }
  };

  useEffect(() => { load(); }, [page]);

  const onToggleAdmin = async (u) => {
    try {
      await updateUserRole(u._id, { isAdmin: !u.isAdmin });
      showToast('User role updated', 'info');
      load();
    } catch (err) {
      showToast(err?.response?.data?.message || 'Failed to update role', 'error');
    }
  };

  const onDelete = async (u) => {
    if (!confirm(`Delete user ${u.email}? This cannot be undone.`)) return;
    try {
      await deleteUser(u._id);
      showToast('User deleted', 'info');
      load();
    } catch (err) {
      showToast(err?.response?.data?.message || 'Failed to delete user', 'error');
    }
  };

  return (
    <div className="bg-white rounded shadow p-4">
      <table className="w-full text-left table-auto">
        <thead>
          <tr>
            <th className="p-2">Email</th>
            <th className="p-2">Full name</th>
            <th className="p-2">Admin</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="border-t">
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.fullName}</td>
              <td className="p-2">{u.isAdmin ? 'Yes' : 'No'}</td>
              <td className="p-2">
                <button className="px-3 py-1 mr-2 bg-indigo-600 text-white rounded" onClick={() => onToggleAdmin(u)}>{u.isAdmin ? 'Demote' : 'Promote'}</button>
                <button className="px-3 py-1 bg-red-600 text-white rounded" onClick={() => onDelete(u)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex items-center justify-between">
        <div>Total: {total}</div>
        <div>
          <button disabled={page<=1} onClick={() => setPage(p => Math.max(1, p-1))} className="px-3 py-1 mr-2 bg-gray-200 rounded">Prev</button>
          <button disabled={users.length < 20} onClick={() => setPage(p => p+1)} className="px-3 py-1 bg-gray-200 rounded">Next</button>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;
