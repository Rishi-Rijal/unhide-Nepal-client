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
    limit,
    cursor
} = {}) => {
    try {
        const response = await api.get(`/${LISTINGS_API_BASE}/filter`, {
            params: {
                categories,
                tags,
                minRating,
                difficulty,
                verifiedOnly,
                sort,
                limit,
                cursor
            }
        });

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

const getListing = async(id)=>{
    try {
        const response = await api.get(`${LISTINGS_API_BASE}/${id}`);
        return response;
    } catch (error) {
        throw error
    }
}




export { getListings, getFilteredListings, createListing, getListing };