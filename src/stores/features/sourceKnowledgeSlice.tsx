import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SourceKnowledgeRequestType, SourceKnowledgeStateType } from "../../types/sourceKnowledgeType";
import { axiosErrorHandler } from "../../utils/errors";
import SourceKnowledgeService from "../../services/sourceKnowledgeService";

export const getAllProfileSourceKnowledge = createAsyncThunk("sourceKnowledge/getAllProfileSourceKnowledge", async (profileId: string, { rejectWithValue }) => {
        try {
            const response = await SourceKnowledgeService.getAllProfileSourceKnowledge(profileId);
            return response.data;
        } catch (err) {
            const error = axiosErrorHandler(err);
            return rejectWithValue(error);
        }
    }
);

export const createSourceKnowledge = createAsyncThunk("sourceKnowledge/createSourceKnowledge", async (payload: SourceKnowledgeRequestType, { rejectWithValue }) => {
    try {
        const response = await SourceKnowledgeService.createSourceKnowledge(payload);
        return response.data;
    } catch (err) {
        const error = axiosErrorHandler(err)
        return rejectWithValue(error);
    }
});

export const updateSourceKnowledge = createAsyncThunk("sourceKnowledge/updateSourceKnowledge", async (payload: SourceKnowledgeRequestType, { rejectWithValue }) => {
    try {
        const response = await SourceKnowledgeService.updateSourceKnowledge(payload);
        return response.data;
    } catch (err) {
        const error = axiosErrorHandler(err)
        return rejectWithValue(error);
    }
});

export const deleteSourceKnowledge = createAsyncThunk("sourceKnowledge/deleteSourceKnowledge", async (id: string, { rejectWithValue }) => {
    try {
        const response = await SourceKnowledgeService.deleteSourceKnowledge(id);
        return response;
    } catch (err) {
        const error = axiosErrorHandler(err)
        return rejectWithValue(error);
    }
});

const initialState: SourceKnowledgeStateType = {
    sourceKnowledge: null,
    errors: null,
    isLoading: false,
};

export const sourceKnowledgeSlice = createSlice({
    name: "sourceKnowledge",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllProfileSourceKnowledge.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAllProfileSourceKnowledge.fulfilled, (state, action) => {
            state.sourceKnowledge = action.payload;
            state.errors = null;
        });
        builder.addCase(getAllProfileSourceKnowledge.rejected, (state, action) => {
            state.errors = action.payload;
        });
        builder.addCase(createSourceKnowledge.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(createSourceKnowledge.fulfilled, (state, action) => {
            console.log(action.payload);

            state.sourceKnowledge = action.payload;
            state.isLoading = false;
            state.errors = null;
        });
        builder.addCase(createSourceKnowledge.rejected, (state, action) => {
            state.errors = action.payload;
        });
        builder.addCase(updateSourceKnowledge.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updateSourceKnowledge.fulfilled, (state, action) => {
            state.sourceKnowledge = action.payload;
            state.isLoading = false;
            state.errors = null;
        });
        builder.addCase(updateSourceKnowledge.rejected, (state, action) => {
            state.errors = action.payload;
        });
        builder.addCase(deleteSourceKnowledge.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteSourceKnowledge.fulfilled, (state) => {
            state.isLoading = false;
            state.errors = null;
        });
        builder.addCase(deleteSourceKnowledge.rejected, (state, action) => {
            state.errors = action.payload;
        });
    },
});

export default sourceKnowledgeSlice.reducer;
