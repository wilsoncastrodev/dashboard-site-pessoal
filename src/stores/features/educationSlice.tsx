import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EducationRequestType, EducationStateType } from "../../types/educationType";
import { axiosErrorHandler } from "../../utils/errors";
import EducationService from "../../services/educationService";

export const getAllProfileEducation = createAsyncThunk("education/getAllProfileEducation", async (profileId: string, { rejectWithValue }) => {
        try {
            const response = await EducationService.getAllProfileEducation(profileId);
            return response.data;
        } catch (err) {
            const error = axiosErrorHandler(err);
            return rejectWithValue(error);
        }
    }
);

export const createEducation = createAsyncThunk("education/createEducation", async (payload: EducationRequestType, { rejectWithValue }) => {
    try {
        const response = await EducationService.createEducation(payload);
        return response.data;
    } catch (err) {
        const error = axiosErrorHandler(err)
        return rejectWithValue(error);
    }
});

export const updateEducation = createAsyncThunk("education/updateEducation", async (payload: EducationRequestType, { rejectWithValue }) => {
    try {
        const response = await EducationService.updateEducation(payload);
        return response.data;
    } catch (err) {
        const error = axiosErrorHandler(err)
        return rejectWithValue(error);
    }
});

export const deleteEducation = createAsyncThunk("education/deleteEducation", async (id: string, { rejectWithValue }) => {
    try {
        const response = await EducationService.deleteEducation(id);
        return response;
    } catch (err) {
        const error = axiosErrorHandler(err)
        return rejectWithValue(error);
    }
});

const initialState: EducationStateType = {
    education: null,
    errors: null,
    isLoading: false,
};

export const educationSlice = createSlice({
    name: "education",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllProfileEducation.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAllProfileEducation.fulfilled, (state, action) => {
            state.education = action.payload;
            state.errors = null;
        });
        builder.addCase(getAllProfileEducation.rejected, (state, action) => {
            state.errors = action.payload;
        });
        builder.addCase(createEducation.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(createEducation.fulfilled, (state, action) => {
            state.education = action.payload;
            state.isLoading = false;
            state.errors = null;
        });
        builder.addCase(createEducation.rejected, (state, action) => {
            state.errors = action.payload;
        });
        builder.addCase(updateEducation.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updateEducation.fulfilled, (state, action) => {
            state.education = action.payload;
            state.isLoading = false;
            state.errors = null;
        });
        builder.addCase(updateEducation.rejected, (state, action) => {
            state.errors = action.payload;
        });
        builder.addCase(deleteEducation.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteEducation.fulfilled, (state) => {
            state.isLoading = false;
            state.errors = null;
        });
        builder.addCase(deleteEducation.rejected, (state, action) => {
            state.errors = action.payload;
        });
    },
});

export default educationSlice.reducer;
