import { diff } from "maplibre-gl";
import api from "./axios.api.js";

const LISTINGS_API_BASE = "api/v1/listing";

const getListings = async () => {
  try {
    const response = await api.get(`/${LISTINGS_API_BASE}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching listings:", error);
    throw error;
  }
}

const getFilteredListings = async ({
  categories = [],
  tags = [],
  minRating,
  difficulty,
  verifiedOnly,
  sort,
  lat,
  lng,
  distanceKm,
  limit,
  cursor,
} = {}) => {
  try {
    const params = new URLSearchParams();

    categories.forEach((c) => params.append("categories", c));
    tags.forEach((t) => params.append("tags", t));

    // Basic filters
    if (minRating !== undefined && minRating !== "any")
      params.append("minRating", Number(minRating));

    if (difficulty) params.append("difficulty", difficulty);
    if (verifiedOnly !== undefined)
      params.append("verifiedOnly", String(verifiedOnly));

    // Sorting / limit
    if (sort) params.append("sort", sort);
    if (limit) params.append("limit", Number(limit));

    // Cursor
    if (cursor) params.append("cursor", cursor);

    // Geo
    const hasLatLng = Number(lat) && Number(lng);

    if (hasLatLng) {
      params.append("lat", Number(lat));
      params.append("lng", Number(lng));
    }

    if (hasLatLng && distanceKm) {
      params.append("distanceKm", Number(distanceKm));
    }

    const url = `/${LISTINGS_API_BASE}/filter?${params.toString()}`;
    const response = await api.get(url);

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};


const createListing = async ({
  name,
  description,
  categories,
  tags,
  latitude,
  longitude,
  tips,
  photos,
}) => {
  try {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);

    categories.forEach((c) => formData.append("categories", c));
    tags.forEach((t) => formData.append("tags", t));

    formData.append("tipsPermits", tips.permits);
    formData.append("tipsBestSeason", tips.bestSeason);
    formData.append("tipsDifficulty", tips.difficulty);
    formData.append("tipsExtra", tips.extra);

    photos.forEach((file) => {
      formData.append("images", file);
    });

    const response = await api.post(`/${LISTINGS_API_BASE}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating listing:", error);
    throw error;
  }
};

const getListing = async (id) => {
  try {
    const response = await api.get(`${LISTINGS_API_BASE}/${id}`);
    return response;
  } catch (error) {
    throw error
  }
}

const addLike = async (id) => {
  try {
    const response = await api.post(`${LISTINGS_API_BASE}/${id}/like`);
    return response.data;

  } catch (error) {
    throw error;
  }
}

const removeLike = async (id) => {
  try {
    const response = await api.patch(`${LISTINGS_API_BASE}/${id}/like`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

const updateDescription = async (id, description) => {
  try {
    const response = await api.patch(`/${LISTINGS_API_BASE}/${id}/description`, { description });
    return response.data;
  } catch (error) {
    throw error;
  }
}

const updateTips = async (id, tips) => {
  try {
    const response = await api.patch(`/${LISTINGS_API_BASE}/${id}/tips`, tips);
    return response.data;
  } catch (error) {
    throw error;
  }
}

const updateTitle = async (id, title) => {
  try {
    const response = await api.patch(`/${LISTINGS_API_BASE}/${id}/title`, { title });
    return response.data;
  } catch (error) {
    throw error;
  }
}

const updateLocation = async (id, latitude, longitude) => {
  try {
    const response = await api.patch(`/${LISTINGS_API_BASE}/${id}/location`, { latitude, longitude });
    return response.data;
  } catch (error) {
    throw error;
  }
}

const updateListing = async (id, { name, description, categories = [], tags = [], latitude, longitude } = {}) => {
  try {
    const body = { name, description, categories, tags, latitude, longitude };
    const response = await api.patch(`/${LISTINGS_API_BASE}/${id}`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
}

const addImages = async (id, files) => {
  try {
    const formData = new FormData();
    files.forEach((f) => formData.append('images', f));
    const response = await api.post(`/${LISTINGS_API_BASE}/${id}/images`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    return response.data;
  } catch (error) {
    throw error;
  }
}

const removeImage = async (id, public_id) => {
  try {
    const response = await api.delete(`/${LISTINGS_API_BASE}/${id}/images`, { data: { public_id } });
    return response.data;
  } catch (error) {
    throw error;
  }
}

const deleteListing = async (id) => {
  try {
    const response = await api.delete(`/${LISTINGS_API_BASE}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

const updateTagsAndCategories = async (id, { categories = [], tags = [] } = {}) => {
  try {
    const response = await api.patch(`/${LISTINGS_API_BASE}/${id}/tags-categories`, { categories, tags });
    return response.data;
  } catch (error) {
    throw error;
  }
}
  
const sendSuggestion = async (id, { field, suggestion }) => {
  // try {
  //   const response = await api.post(`/${LISTINGS_API_BASE}/${id}/suggest`, { field, suggestion });  
  //   return response.data;
  // } catch (error) {
  //   throw error;
  // }
}

export {
  getListings,
  getFilteredListings,
  createListing,
  getListing,
  addLike,
  removeLike,
  updateDescription,
  updateTips,
  updateTitle,
  updateLocation,
  addImages,
  removeImage,
  deleteListing,
  updateListing,
  updateTagsAndCategories,
  sendSuggestion
};