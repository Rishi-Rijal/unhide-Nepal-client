import { useEffect, useState } from 'react';
import { getListings, verifyListing, deleteListing } from '../../api/admin.api.js';
import { useToast } from '../Shared/Toast';

const ListingsTable = () => {
  const [listings, setListings] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const { showToast } = useToast();

  const load = async () => {
    try {
      const res = await getListings({ page, limit: 20 });
      setListings(res.data.data.listings);
      setTotal(res.data.data.total);
    } catch (err) {
      showToast(err?.response?.data?.message || 'Failed to load listings', 'error');
    }
  };

  useEffect(() => { load(); }, [page]);

  const onVerify = async (l) => {
    try {
      await verifyListing(l._id, { isVerified: !l.isVerified });
      showToast('Listing updated', 'info');
      load();
    } catch (err) {
      showToast(err?.response?.data?.message || 'Failed to update listing', 'error');
    }
  };

  const onDelete = async (l) => {
    if (!confirm(`Delete listing ${l.name}? This cannot be undone.`)) return;
    try {
      await deleteListing(l._id);
      showToast('Listing deleted', 'info');
      load();
    } catch (err) {
      showToast(err?.response?.data?.message || 'Failed to delete listing', 'error');
    }
  };

  return (
    <div className="bg-white rounded shadow p-4">
      <table className="w-full text-left table-auto">
        <thead>
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Categories</th>
            <th className="p-2">Verified</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {listings.map((l) => (
            <tr key={l._id} className="border-t">
              <td className="p-2">{l.name}</td>
              <td className="p-2">{(l.categories || []).join(', ')}</td>
              <td className="p-2">{l.isVerified ? 'Yes' : 'No'}</td>
              <td className="p-2">
                <button className="px-3 py-1 mr-2 bg-green-600 text-white rounded" onClick={() => onVerify(l)}>{l.isVerified ? 'Unverify' : 'Verify'}</button>
                <button className="px-3 py-1 bg-red-600 text-white rounded" onClick={() => onDelete(l)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex items-center justify-between">
        <div>Total: {total}</div>
        <div>
          <button disabled={page<=1} onClick={() => setPage(p => Math.max(1, p-1))} className="px-3 py-1 mr-2 bg-gray-200 rounded">Prev</button>
          <button disabled={listings.length < 20} onClick={() => setPage(p => p+1)} className="px-3 py-1 bg-gray-200 rounded">Next</button>
        </div>
      </div>
    </div>
  );
};

export default ListingsTable;
