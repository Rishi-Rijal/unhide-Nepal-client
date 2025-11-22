import api from "./axios.api.js"

const USER_API_BASE = "api/v1/user";

const getUserProfile = async () => {
    const response = await api.get(`${USER_API_BASE}/me`);
    return response.data;
}

const loginUser = async ({ email, password }) => {
    const response = await api.post(`${USER_API_BASE}/login`, { email, password });
    return response.data;
}

const registerUser = async ({ name, password, email }) => {
    const response = await api.post(`${USER_API_BASE}/register`, { name, password, email });
    return response.data;
}

const logoutUser = async () => {
    const response = await api.post(`${USER_API_BASE}/logout`);
    return response.data;
}

const changePassword = async ({ currentPassword, newPassword, confirmPassword }) => {
    const response = await api.post(`${USER_API_BASE}/change-password`, { currentPassword, newPassword, confirmPassword });
    return response.data;
}

const refreshAccessToken = async () => {
    const response = await api.get(`${USER_API_BASE}/refresh-token`);
    return response.data;
}

const verifyPasswordResetToken = async (id, token) => {
    const response = await api.get(`${USER_API_BASE}/reset-password/${id}/${token}`);
    return response.data;
}

const resetPassword = async ({ id, token, password, confirmPassword }) => {
    const response = await api.post(`${USER_API_BASE}/reset-password/${id}/${token}`, { password, confirmPassword });
    return response.data;
}

const requestPasswordReset = async (email) => {
    const response = await api.post(`${USER_API_BASE}/forgot-password`, { email });
    return response.data;
}



export {
    getUserProfile,
    loginUser,
    registerUser,
    logoutUser,
    changePassword,
    refreshAccessToken,
    verifyPasswordResetToken,
    resetPassword,
    requestPasswordReset
}
