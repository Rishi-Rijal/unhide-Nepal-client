import { diff } from "maplibre-gl";
import api from "./axios.api.js";

// export const getUser = () => api.get("/user");
// export const loginUser = (data) => api.post("/auth/login", data);
// export const updateUser = (data) => api.put("/user/update", data);

const LISTINGS_API_BASE = "api/v1/listing";

const getListings = async () => {
    try {
        const response = await api.get(`/${LISTINGS_API_BASE}/all`);
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

        const response = await api.post(`${LISTINGS_API_BASE}/all`, formData, {
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




export { getListings, getFilteredListings, createListing, getListing };