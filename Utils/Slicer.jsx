import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const accessToken = Cookies.get('AccessToken')
console.log('access token at slicer', accessToken)

const AuthSlice = createSlice({
    name: 'authSlicer',
    initialState: {
        isAuthenticated: !!accessToken,
        accessToken: accessToken || null
    },
    reducers: {
        setIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload,
            state.accessToken = !!action.payload
        }
    }
})

const LikeSlice = createSlice({
    name: 'Like',
    initialState: {
        isLiked: false
    },
    reducers: {
        setIsLiked: (state, action) => {
            state.isLiked = action.payload
        }
    }
})

export const { setIsAuthenticated, setAccessToken } = AuthSlice.actions
export const { setIsLiked } = LikeSlice.actions
export const authReducer = AuthSlice.reducer
export const likeReducer = LikeSlice.reducer