import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CategorySkillStateType } from "../../types/categorySkillType";
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
    },
});

export default categorySkillSlice.reducer;
