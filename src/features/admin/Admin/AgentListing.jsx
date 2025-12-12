import { useState } from 'react';
import { createListingWithAgent } from '../../../services/admin.api.js';
import { useToast } from '../../../components';

const AgentListing = () => {
  const [place, setPlace] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const { addToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!place.trim()) {
      addToast('Please enter a place name', 'error');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await createListingWithAgent({ place: place.trim() });
      setResult(res.data);
      addToast('Listing created successfully with AI agent!', 'success');
      setPlace('');
    } catch (err) {
      addToast(err?.response?.data?.message || 'Failed to create listing', 'error');
      console.error('Agent error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Create Listing with AI Agent</h2>
      <p className="text-gray-600 mb-6">
        Enter a place name in Nepal, and our AI agent will automatically research and create a complete listing with description, categories, tags, location, and more.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="place" className="block text-sm font-medium text-gray-700 mb-2">
            Place Name
          </label>
          <input
            type="text"
            id="place"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            placeholder="e.g., Phewa Lake, Annapurna Base Camp, Chitwan National Park"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
            loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Creating Listing with AI...
            </span>
          ) : (
            'Create Listing with AI'
          )}
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2">Success!</h3>
          <p className="text-green-700 text-sm">
            {result.message}
          </p>
          {result.data && (
            <pre className="mt-2 text-xs bg-white p-2 rounded overflow-auto max-h-40">
              {result.data}
            </pre>
          )}
        </div>
      )}
    </div>
  );
};

export default AgentListing;
