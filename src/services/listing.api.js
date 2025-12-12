import api from "./axios.api.js";
import { getLocationFromLongLat } from "../utils/getLocation.js";

const LISTINGS_API_BASE = "api/v1/listing";

const getListings = async () => {
  const response = await api.get(`/${LISTINGS_API_BASE}`);
  return response.data;

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

    const normalizedCategories = Array.isArray(categories) ? categories : [categories].filter(Boolean);
    const normalizedTags = Array.isArray(tags) ? tags : [tags].filter(Boolean);
    normalizedCategories.forEach((c) => formData.append("categories", c));
    normalizedTags.forEach((t) => formData.append("tags", t));

    formData.append("permitsRequired", tips.permitsRequired);
    formData.append("permitsDescription", tips.permitsDescription);
    formData.append("bestSeason", tips.bestSeason);
    formData.append("difficulty", tips.difficulty);
    formData.append("extraAdvice", tips.extraAdvice);

    photos.forEach((file) => {
      formData.append("images", file);
    });

    const locationName = await getLocationFromLongLat(latitude, longitude);
    formData.append("physicalAddress",
      `${locationName?.city_district ||
      locationName?.road ||""
      } ${locationName?.county ||
      locationName?.state ||
      ""}, ${locationName?.country}`);

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
  const response = await api.get(`${LISTINGS_API_BASE}/${id}`);
  return response.data.data;
}

const addLike = async (id) => {
  const response = await api.post(`${LISTINGS_API_BASE}/${id}/like`);
  return response.data;

}

const removeLike = async (id) => {
  const response = await api.patch(`${LISTINGS_API_BASE}/${id}/like`);
  return response.data;
}

const updateDescription = async (id, description) => {
  const response = await api.patch(`/${LISTINGS_API_BASE}/${id}/description`, { description });
  return response.data;
}

const updateTips = async (id, tips) => {
  const response = await api.patch(`/${LISTINGS_API_BASE}/${id}/tips`, tips);
  return response.data;
}

const updateTitle = async (id, title) => {
  const response = await api.patch(`/${LISTINGS_API_BASE}/${id}/title`, { title });
  return response.data;
}

const updateLocation = async (id, latitude, longitude) => {
  const response = await api.patch(`/${LISTINGS_API_BASE}/${id}/location`, { latitude, longitude });
  return response.data;
}

const updateListing = async (id, { name, description, categories = [], tags = [], latitude, longitude } = {}) => {
  const body = { name, description, categories, tags, latitude, longitude };
  const response = await api.patch(`/${LISTINGS_API_BASE}/${id}`, body);
  return response.data;
}

const addImages = async (id, files) => {
  const formData = new FormData();
  files.forEach((f) => formData.append('images', f));
  const response = await api.post(`/${LISTINGS_API_BASE}/${id}/images`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
  return response.data;
}

const removeImage = async (id, public_id) => {
  const response = await api.delete(`/${LISTINGS_API_BASE}/${id}/images`, { data: { public_id } });
  return response.data;
}

const deleteListing = async (id) => {
  const response = await api.delete(`/${LISTINGS_API_BASE}/${id}`);
  return response.data;
}

const updateTagsAndCategories = async (id, { categories = [], tags = [] } = {}) => {  
  const response = await api.patch(`/${LISTINGS_API_BASE}/${id}/tags-categories`, { categories, tags });
  return response.data;
}

const sendSuggestion = async (id, { field, suggestion, name = "", email = "" }) => {
  const response = await api.post(`/${LISTINGS_API_BASE}/${id}/suggest`, { field, suggestion, name, email });
  return response;
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