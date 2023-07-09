import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import baseUrl from '../../../utils/baseURL';

////////////////////////////////////////////////////////////////////////////////
// create post action                                                         //
////////////////////////////////////////////////////////////////////////////////
export const createpostAction = createAsyncThunk(
    "post/created", 
    async (post, { rejectWithValue, getState, dispatch}) => {
        console.log(post);
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
            const formData = new FormData();
            formData.append('title', post?.title);
            formData.append('description', post?.description);
            const { data } = await axios.post(`${baseUrl}/api/posts`, post, config);
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
        builder.addCase(createpostAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(createpostAction.fulfilled, (state, action) => {
            state.postCreated = action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(createpostAction.rejected, (state, action) => {
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