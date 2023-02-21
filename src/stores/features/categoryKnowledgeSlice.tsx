import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CategoryKnowledgeStateType } from "../../types/categoryKnowledgeType";
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
            state.isLoading = true;
        });
        builder.addCase(getAllCategoryKnowledge.fulfilled, (state, action) => {
            state.categoryKnowledge = action.payload;
            state.errors = null;
        });
        builder.addCase(getAllCategoryKnowledge.rejected, (state, action) => {
            state.errors = action.payload;
        });
    },
});

export default categoryKnowledgeSlice.reducer;
