import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { InterestRequestType, InterestStateType } from "../../types/interestType";
import { axiosErrorHandler } from "../../utils/errors";
import InterestService from "../../services/interestService";

export const getAllProfileInterest = createAsyncThunk("interest/getAllProfileInterest", async (profileId: string, { rejectWithValue }) => {
        try {
            const response = await InterestService.getAllProfileInterest(profileId);
            return response.data;
        } catch (err) {
            const error = axiosErrorHandler(err);
            return rejectWithValue(error);
        }
    }
);

export const createInterest = createAsyncThunk("interest/createInterest", async (payload: InterestRequestType, { rejectWithValue }) => {
    try {
        const response = await InterestService.createInterest(payload);
        return response.data;
    } catch (err) {
        const error = axiosErrorHandler(err)
        return rejectWithValue(error);
    }
});

export const updateInterest = createAsyncThunk("interest/updateInterest", async (payload: InterestRequestType, { rejectWithValue }) => {
    try {
        const response = await InterestService.updateInterest(payload);
        return response.data;
    } catch (err) {
        const error = axiosErrorHandler(err)
        return rejectWithValue(error);
    }
});

export const deleteInterest = createAsyncThunk("interest/deleteInterest", async (id: string, { rejectWithValue }) => {
    try {
        const response = await InterestService.deleteInterest(id);
        return response;
    } catch (err) {
        const error = axiosErrorHandler(err)
        return rejectWithValue(error);
    }
});

const initialState: InterestStateType = {
    interest: null,
    errors: null,
    isLoading: false,
};

export const interestSlice = createSlice({
    name: "interest",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllProfileInterest.pending, (state) => {
            state.interest = null;
            state.isLoading = true;
        });
        builder.addCase(getAllProfileInterest.fulfilled, (state, action) => {
            state.interest = action.payload;
            state.errors = null;
        });
        builder.addCase(getAllProfileInterest.rejected, (state, action) => {
            state.errors = action.payload;
        });
        builder.addCase(createInterest.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(createInterest.fulfilled, (state, action) => {
            state.interest = action.payload;
            state.isLoading = false;
            state.errors = null;
        });
        builder.addCase(createInterest.rejected, (state, action) => {
            state.errors = action.payload;
        });
        builder.addCase(updateInterest.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updateInterest.fulfilled, (state, action) => {
            state.interest = action.payload;
            state.isLoading = false;
            state.errors = null;
        });
        builder.addCase(updateInterest.rejected, (state, action) => {
            state.errors = action.payload;
        });
        builder.addCase(deleteInterest.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteInterest.fulfilled, (state) => {
            state.isLoading = false;
            state.errors = null;
        });
        builder.addCase(deleteInterest.rejected, (state, action) => {
            state.errors = action.payload;
        });
    },
});

export default interestSlice.reducer;
