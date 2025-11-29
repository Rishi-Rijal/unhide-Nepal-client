import api from "./axios.api.js"

const RATING_API_BASE = "api/v1/review";


const getRatingsByListingID = async (postId) => {
    const response = await api.get(`${RATING_API_BASE}/${postId}`);
    return response.data;
}

const addUserReview = async ({ postId, author, rating, text, authorId }) => {
    const response = await api.post(`${RATING_API_BASE}/${postId}`,
        {
            userName: author,
            rating,
            reviewMsg: text,
            authorId
        }
    );
    return response.data;
}

const updateReview = async (reviewId, { rating, reviewMsg }) => {
    const response = await api.patch(`${RATING_API_BASE}/${reviewId}`, { rating, reviewMsg });
    return response.data;
}

const deleteReview = async (reviewId) => {
    const response = await api.delete(`${RATING_API_BASE}/${reviewId}`);
    return response.data;
}

export { getRatingsByListingID, addUserReview, updateReview, deleteReview }