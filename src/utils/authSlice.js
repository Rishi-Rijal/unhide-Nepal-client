import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    // `undefined` means "not yet loaded". After we fetch, the value will
    // be either `null` (not authenticated) or a user object.
    user: undefined
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
        }
    }
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;