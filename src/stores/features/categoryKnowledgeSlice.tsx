import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CategoryKnowledgeRequestType, CategoryKnowledgeStateType } from "../../types/categoryKnowledgeType";
import { axiosErrorHandler } from "../../utils/errors";
import CategoryKnowledgeService from "../../services/categoryKnowledgeService";

export const getAllCategoryKnowledge = createAsyncThunk("categoryKnowledge/getAllCategoryKnowledge", async (_, { rejectWithValue }) => {
        try {
            const response = await CategoryKnowledgeService.getAllCategoryKnowledge();
            return response.data;
        } catch (err) {
            const error = axiosErrorHandler(err);
            return rejectWithValue(error);
        }
    }
);

export const createCategoryKnowledge = createAsyncThunk("categoryKnowledge/createCategoryKnowledge", async (payload: CategoryKnowledgeRequestType, { rejectWithValue }) => {
    try {
        const response = await CategoryKnowledgeService.createCategoryKnowledge(payload);
        return response.data;
    } catch (err) {
        const error = axiosErrorHandler(err)
        return rejectWithValue(error);
    }
});

export const updateCategoryKnowledge = createAsyncThunk("categoryKnowledge/updateCategoryKnowledge", async (payload: CategoryKnowledgeRequestType, { rejectWithValue }) => {
    try {
        const response = await CategoryKnowledgeService.updateCategoryKnowledge(payload);
        return response.data;
    } catch (err) {
        const error = axiosErrorHandler(err)
        return rejectWithValue(error);
    }
});

export const deleteCategoryKnowledge = createAsyncThunk("categoryKnowledge/deleteCategoryKnowledge", async (id: string, { rejectWithValue }) => {
    try {
        const response = await CategoryKnowledgeService.deleteCategoryKnowledge(id);
        return response;
    } catch (err) {
        const error = axiosErrorHandler(err)
        return rejectWithValue(error);
    }
});

const initialState: CategoryKnowledgeStateType = {
    categoryKnowledge: null,
    errors: null,
    isLoading: false,
};

export const categoryKnowledgeSlice = createSlice({
    name: "categoryKnowledge",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCategoryKnowledge.pending, (state) => {
            state.categoryKnowledge = null;
            state.isLoading = true;
        });
        builder.addCase(getAllCategoryKnowledge.fulfilled, (state, action) => {
            state.categoryKnowledge = action.payload;
            state.errors = null;
        });
        builder.addCase(getAllCategoryKnowledge.rejected, (state, action) => {
            state.errors = action.payload;
        });
        builder.addCase(createCategoryKnowledge.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(createCategoryKnowledge.fulfilled, (state, action) => {
            state.categoryKnowledge = action.payload;
            state.isLoading = false;
            state.errors = null;
        });
        builder.addCase(createCategoryKnowledge.rejected, (state, action) => {
            state.errors = action.payload;
        });
        builder.addCase(updateCategoryKnowledge.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updateCategoryKnowledge.fulfilled, (state, action) => {
            state.categoryKnowledge = action.payload;
            state.isLoading = false;
            state.errors = null;
        });
        builder.addCase(updateCategoryKnowledge.rejected, (state, action) => {
            state.errors = action.payload;
        });
        builder.addCase(deleteCategoryKnowledge.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteCategoryKnowledge.fulfilled, (state) => {
            state.isLoading = false;
            state.errors = null;
        });
        builder.addCase(deleteCategoryKnowledge.rejected, (state, action) => {
            state.errors = action.payload;
        });
    },
});

export default categoryKnowledgeSlice.reducer;
