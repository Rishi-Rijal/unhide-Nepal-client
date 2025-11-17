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

export { getRatingsByListingID, addUserReview }

