import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { KnowledgeRequestType, KnowledgeStateType } from "../../types/knowledgeType";
import { axiosErrorHandler } from "../../utils/errors";
import KnowledgeService from "../../services/knowledgeService";

export const getAllProfileKnowledge = createAsyncThunk("knowledge/getAllProfileKnowledge", async (profileId: string, {dispatch, rejectWithValue }) => {
        try {
            const response = await KnowledgeService.getAllProfileKnowledge(profileId);
            return response.data;
        } catch (err) {
            const error = axiosErrorHandler(err);
            return rejectWithValue(error);
        }
    }
);

export const createKnowledge = createAsyncThunk("knowledge/createKnowledge", async (payload: KnowledgeRequestType, { rejectWithValue }) => {
    try {
        const response = await KnowledgeService.createKnowledge(payload);
        return response.data;
    } catch (err) {
        const error = axiosErrorHandler(err)
        return rejectWithValue(error);
    }
});

export const updateKnowledge = createAsyncThunk("knowledge/updateKnowledge", async (payload: KnowledgeRequestType, { rejectWithValue }) => {
    try {
        const response = await KnowledgeService.updateKnowledge(payload);
        return response.data;
    } catch (err) {
        const error = axiosErrorHandler(err)
        return rejectWithValue(error);
    }
});

export const deleteKnowledge = createAsyncThunk("knowledge/deleteKnowledge", async (id: string, { rejectWithValue }) => {
    try {
        const response = await KnowledgeService.deleteKnowledge(id);
        return response;
    } catch (err) {
        const error = axiosErrorHandler(err)
        return rejectWithValue(error);
    }
});

export const sortKnowledge = createAsyncThunk("skill/sortKnowledge", async (payload: KnowledgeRequestType, { rejectWithValue }) => {
    try {
        const response = await KnowledgeService.sortKnowledge(payload);
        return response;
    } catch (err) {
        const error = axiosErrorHandler(err)
        return rejectWithValue(error);
    }
});

const initialState: KnowledgeStateType = {
    knowledge: null,
    errors: null,
    isLoading: false,
};

export const knowledgeSlice = createSlice({
    name: "knowledge",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllProfileKnowledge.pending, (state) => {
            state.knowledge = null;
            state.isLoading = true;
        });
        builder.addCase(getAllProfileKnowledge.fulfilled, (state, action) => {
            state.knowledge = action.payload;
            state.errors = null;
        });
        builder.addCase(getAllProfileKnowledge.rejected, (state, action) => {
            state.errors = action.payload;
        });
        builder.addCase(createKnowledge.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(createKnowledge.fulfilled, (state, action) => {
            state.knowledge = action.payload;
            state.isLoading = false;
            state.errors = null;
        });
        builder.addCase(createKnowledge.rejected, (state, action) => {
            state.errors = action.payload;
        });
        builder.addCase(updateKnowledge.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updateKnowledge.fulfilled, (state, action) => {
            state.knowledge = action.payload;
            state.isLoading = false;
            state.errors = null;
        });
        builder.addCase(updateKnowledge.rejected, (state, action) => {
            state.errors = action.payload;
        });
        builder.addCase(deleteKnowledge.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteKnowledge.fulfilled, (state) => {
            state.isLoading = false;
            state.errors = null;
        });
        builder.addCase(deleteKnowledge.rejected, (state, action) => {
            state.errors = action.payload;
        });
        builder.addCase(sortKnowledge.fulfilled, (state) => {
            state.isLoading = false;
        });
    },
});

export default knowledgeSlice.reducer;
