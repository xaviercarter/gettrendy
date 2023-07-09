import {createAsyncThunk, createSlice, createAction} from '@reduxjs/toolkit';
import axios from 'axios';
import baseUrl from '../../../utils/baseURL';


const resetPost = createAction('post/resetEdit');

////////////////////////////////////////////////////////////////////////////////
// create post action                                                         //
////////////////////////////////////////////////////////////////////////////////
export const createpostAction = createAsyncThunk(
    "post/created", 
    async (post, { rejectWithValue, getState, dispatch}) => {
    
        // get user token
        const user = getState()?.users;
        const { userAuth } = user;
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`,
            },
        };
        try {
            // http call , destructure response coming from the await
            const { data } = await axios.post(`${baseUrl}/api/posts`, post, config);
            
            // dispatch action
            dispatch(resetPost());
            return data;
        } catch (error) {
            if (!error?.response) throw error;
            return rejectWithValue(error?.response?.data);
        }
    }
);








////////////////////////////////////////////////////////////////////////////////
// fetch all posts                                                            //
////////////////////////////////////////////////////////////////////////////////
export const fetchPostsAction = createAsyncThunk(
    "post/list", 
    async (post, { rejectWithValue, getState, dispatch}) => {
        try {
            // http call , destructure response coming from the await
            const { data } = await axios.get(`${baseUrl}/api/posts`);
            
            return data;
        } catch (error) {
            if (!error?.response) throw error;
            return rejectWithValue(error?.response?.data);
        }
    }
);

////////////////////////////////////////////////////////////////////////////////
// create slice                                                               //
////////////////////////////////////////////////////////////////////////////////

const postSlice = createSlice({
    name: 'post',
    initialState: {},
    extraReducers: builder => {
        // create post 
        builder.addCase(createpostAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(resetPost, (state, action) => {
            state.isCreated = true;
        });

        builder.addCase(createpostAction.fulfilled, (state, action) => {
            state.postCreated = action?.payload;
            state.loading = false;
            state.isCreated = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(createpostAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });

        // fetch all posts
            builder.addCase(fetchPostsAction.pending, (state, action) => {
                state.loading = true;
            });
    
            builder.addCase(fetchPostsAction.fulfilled, (state, action) => {
                state.postList = action?.payload;
                state.loading = false;
                state.appErr = undefined;
                state.serverErr = undefined;
            });
            builder.addCase(fetchPostsAction.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.serverErr = action?.error?.message;
            });
    },
});


////////////////////////////////////////////////////////////////////////////////
// export                                                                     //
////////////////////////////////////////////////////////////////////////////////

export default postSlice.reducer;