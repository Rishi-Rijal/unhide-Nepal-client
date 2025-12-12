import api from './axios.api.js';

export const getUsers = (params) => api.get('/api/v1/admin/users', { params });
export const updateUserRole = (id, body) => api.patch(`/api/v1/admin/users/${id}/role`, body);
export const deleteUser = (id) => api.delete(`/api/v1/admin/users/${id}`);

export const getListings = (params) => api.get('/api/v1/admin/listings', { params });
export const verifyListing = (id, body) => api.patch(`/api/v1/admin/listings/${id}/verify`, body);
export const deleteListing = (id) => api.delete(`/api/v1/admin/listings/${id}`);
export const createListingWithAgent = (body) => api.post('/api/v1/listing/agent', body);

export default {
  getUsers,
  updateUserRole,
  deleteUser,
  getListings,
  verifyListing,
  deleteListing,
  createListingWithAgent,
};
