import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CategorySkillRequestType, CategorySkillStateType } from "../../types/categorySkillType";
import { axiosErrorHandler } from "../../utils/errors";
import CategorySkillService from "../../services/categorySkillService";

export const getAllCategorySkill = createAsyncThunk("categorySkill/getAllCategorySkill", async (_, { rejectWithValue }) => {
        try {
            const response = await CategorySkillService.getAllCategorySkill();
            return response.data;
        } catch (err) {
            const error = axiosErrorHandler(err);
            return rejectWithValue(error);
        }
    }
);

export const createCategorySkill = createAsyncThunk("categorySkill/createCategorySkill", async (payload: CategorySkillRequestType, { rejectWithValue }) => {
    try {
        const response = await CategorySkillService.createCategorySkill(payload);
        return response.data;
    } catch (err) {
        const error = axiosErrorHandler(err)
        return rejectWithValue(error);
    }
});

export const updateCategorySkill = createAsyncThunk("categorySkill/updateCategorySkill", async (payload: CategorySkillRequestType, { rejectWithValue }) => {
    try {
        const response = await CategorySkillService.updateCategorySkill(payload);
        return response.data;
    } catch (err) {
        const error = axiosErrorHandler(err)
        return rejectWithValue(error);
    }
});

export const deleteCategorySkill = createAsyncThunk("categorySkill/deleteCategorySkill", async (id: string, { rejectWithValue }) => {
    try {
        const response = await CategorySkillService.deleteCategorySkill(id);
        return response;
    } catch (err) {
        const error = axiosErrorHandler(err)
        return rejectWithValue(error);
    }
});

const initialState: CategorySkillStateType = {
    categorySkill: null,
    errors: null,
    isLoading: false,
};

export const categorySkillSlice = createSlice({
    name: "categorySkill",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCategorySkill.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAllCategorySkill.fulfilled, (state, action) => {
            state.categorySkill = action.payload;
            state.errors = null;
        });
        builder.addCase(getAllCategorySkill.rejected, (state, action) => {
            state.errors = action.payload;
        });
        builder.addCase(createCategorySkill.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(createCategorySkill.fulfilled, (state, action) => {
            state.categorySkill = action.payload;
            state.isLoading = false;
            state.errors = null;
        });
        builder.addCase(createCategorySkill.rejected, (state, action) => {
            state.errors = action.payload;
        });
        builder.addCase(updateCategorySkill.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updateCategorySkill.fulfilled, (state, action) => {
            state.categorySkill = action.payload;
            state.isLoading = false;
            state.errors = null;
        });
        builder.addCase(updateCategorySkill.rejected, (state, action) => {
            state.errors = action.payload;
        });
        builder.addCase(deleteCategorySkill.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteCategorySkill.fulfilled, (state) => {
            state.isLoading = false;
            state.errors = null;
        });
        builder.addCase(deleteCategorySkill.rejected, (state, action) => {
            state.errors = action.payload;
        });
    },
});

export default categorySkillSlice.reducer;
