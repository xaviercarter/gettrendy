//  sourcehttps://frontend.turing.edu/lessons/module-3/redux-i.html?ads_cmpid=6451354298&ads_adid=76255849919&ads_matchtype=&ads_network=g&ads_creative=517671727591&utm_term=&ads_targetid=dsa-19959388920&utm_campaign=&utm_source=adwords&utm_medium=ppc&ttv=2&gclid=EAIaIQobChMIpZmigsb7_wIV09aGCh0YcALkEAAYASAAEgKpx_D_BwE

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../../../utils/baseURL';


/////////////////////////////////////////////////////////////////////
// register a new user                                             //
/////////////////////////////////////////////////////////////////////

export const registerUserAction = createAsyncThunk(
    'users/register', 
    
    async (user, {rejectWithValue, getState, dispatch }) => {
        try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        // this is the http call 
        const { data } = await axios.post(
            `${baseURL}/api/users/register`,
            user, 
            config
        );
        return data;
        } catch (error) {
            if(!error?.response) {
                throw error;
            }
        return rejectWithValue(error?.response?.data);
        }
    }
);

////////////////////////////////////////////////////////////////////
// login                                                          //
////////////////////////////////////////////////////////////////////
//takes the payload from the login form and sends it to the server
export const loginUserAction = createAsyncThunk(
    'users/login',
    async (userData, {rejectWithValue, getState, dispatch}) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        try {
            // make http call to the server
            const { data } = await axios.post(
                `${baseURL}/api/users/login`,
                userData, 
                config
            );
            // add user to local storage
            localStorage.setItem('userInfo', JSON.stringify(data));
            return data;
        } catch (error) {
            if(!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    },
);  

// get user from local storage and place into store if theres a value in local storage use that otherwise null
const userLoginFromStorage = localStorage.getItem('userInfo')
? JSON.parse(localStorage.getItem('userInfo'))
: null;

////////////////////////////////////////////////////////////////////
// slices                                                         //
////////////////////////////////////////////////////////////////////

const usersSlices = createSlice({
    name: 'users',
    initialState: {
        userAuth: userLoginFromStorage,
    },
    extraReducers: builder => {
        // register
        builder.addCase(registerUserAction.pending, (state, action) => {
            state.loading = true;
            // state.appErr = undefined;
            // state.serverErr = undefined;
        });
        builder.addCase(registerUserAction.fulfilled, (state, action) => {
            state.loading = false;
            state.registered = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(registerUserAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
        // login
        builder.addCase(loginUserAction.pending, (state, action) => {
            state.loading = true;
            // state.appErr = undefined;
            // state.serverErr = undefined;
        });
        builder.addCase(loginUserAction.fulfilled, (state, action) => {
            state.userAuth = action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(loginUserAction.rejected, (state, action) => {
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
            state.loading = false;
        });
    },
});


////////////////////////////////////////////////////////////////////
// export slices                                                  //
////////////////////////////////////////////////////////////////////


export default usersSlices.reducer;