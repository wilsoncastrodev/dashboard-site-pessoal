import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ExperienceRequestType, ExperienceStateType } from "../../types/experienceType";
import { axiosErrorHandler } from "../../utils/errors";
import ExperienceService from "../../services/experienceService";

export const getAllProfileExperience = createAsyncThunk("experience/getAllProfileExperience", async (profileId: string, { rejectWithValue }) => {
        try {
            const response = await ExperienceService.getAllProfileExperience(profileId);
            return response.data;
        } catch (err) {
            const error = axiosErrorHandler(err);
            return rejectWithValue(error);
        }
    }
);

export const createExperience = createAsyncThunk("experience/createExperience", async (payload: ExperienceRequestType, { rejectWithValue }) => {
    try {
        const response = await ExperienceService.createExperience(payload);
        return response.data;
    } catch (err) {
        const error = axiosErrorHandler(err)
        return rejectWithValue(error);
    }
});

export const updateExperience = createAsyncThunk("experience/updateExperience", async (payload: ExperienceRequestType, { rejectWithValue }) => {
    try {
        const response = await ExperienceService.updateExperience(payload);
        return response.data;
    } catch (err) {
        const error = axiosErrorHandler(err)
        return rejectWithValue(error);
    }
});

export const deleteExperience = createAsyncThunk("experience/deleteExperience", async (id: string, { rejectWithValue }) => {
    try {
        const response = await ExperienceService.deleteExperience(id);
        return response;
    } catch (err) {
        const error = axiosErrorHandler(err)
        return rejectWithValue(error);
    }
});

const initialState: ExperienceStateType = {
    experience: null,
    errors: null,
    isLoading: false,
};

export const experienceSlice = createSlice({
    name: "experience",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllProfileExperience.pending, (state) => {
            state.experience = null;
            state.isLoading = true;
        });
        builder.addCase(getAllProfileExperience.fulfilled, (state, action) => {
            state.experience = action.payload;
            state.errors = null;
        });
        builder.addCase(getAllProfileExperience.rejected, (state, action) => {
            state.errors = action.payload;
        });
        builder.addCase(createExperience.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(createExperience.fulfilled, (state, action) => {
            state.experience = action.payload;
            state.isLoading = false;
            state.errors = null;
        });
        builder.addCase(createExperience.rejected, (state, action) => {
            state.errors = action.payload;
        });
        builder.addCase(updateExperience.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updateExperience.fulfilled, (state, action) => {
            state.experience = action.payload;
            state.isLoading = false;
            state.errors = null;
        });
        builder.addCase(updateExperience.rejected, (state, action) => {
            state.errors = action.payload;
        });
        builder.addCase(deleteExperience.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteExperience.fulfilled, (state) => {
            state.isLoading = false;
            state.errors = null;
        });
        builder.addCase(deleteExperience.rejected, (state, action) => {
            state.errors = action.payload;
        });
    },
});

export default experienceSlice.reducer;
