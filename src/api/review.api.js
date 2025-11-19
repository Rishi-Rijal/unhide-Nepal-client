import api from "./axios.api.js"

const RATING_API_BASE = "api/v1/review";


const getRatingsByListingID = async (postId) => {
    try {
        const response = await api.get(`${RATING_API_BASE}/${postId}`)
        return response.data
    } catch (error) {
        throw error
    }
}

const addUserReview = async ({ postId, author, rating, text }) => {
    try {
        const response = await api.post(`${RATING_API_BASE}/${postId}`,
            {
                userName: author,
                rating,
                reviewMsg: text
            }
        );
        return response.data;
    } catch (error) {
        throw error
    }
}

const updateReview = async (reviewId, { rating, reviewMsg }) => {
    try {
        const response = await api.patch(`${RATING_API_BASE}/${reviewId}`, { rating, reviewMsg });
        return response.data;
    } catch (error) {
        throw error;
    }
}

const deleteReview = async (reviewId) => {
    try {
        const response = await api.delete(`${RATING_API_BASE}/${reviewId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export { getRatingsByListingID, addUserReview, updateReview, deleteReview }