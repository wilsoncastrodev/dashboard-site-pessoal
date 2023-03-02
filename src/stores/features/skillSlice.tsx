import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SkillRequestType, SkillStateType } from "../../types/skillType";
import { axiosErrorHandler } from "../../utils/errors";
import SkillService from "../../services/skillService";

export const getAllProfileSkill = createAsyncThunk("skill/getAllProfileSkill", async (profileId: string, {dispatch, rejectWithValue }) => {
        try {
            const response = await SkillService.getAllProfileSkill(profileId);
            return response.data;
        } catch (err) {
            const error = axiosErrorHandler(err);
            return rejectWithValue(error);
        }
    }
);

export const createSkill = createAsyncThunk("skill/createSkill", async (payload: SkillRequestType, { rejectWithValue }) => {
    try {
        const response = await SkillService.createSkill(payload);
        return response.data;
    } catch (err) {
        const error = axiosErrorHandler(err)
        return rejectWithValue(error);
    }
});

export const updateSkill = createAsyncThunk("skill/updateSkill", async (payload: SkillRequestType, { rejectWithValue }) => {
    try {
        const response = await SkillService.updateSkill(payload);
        return response.data;
    } catch (err) {
        const error = axiosErrorHandler(err)
        return rejectWithValue(error);
    }
});

export const deleteSkill = createAsyncThunk("skill/deleteSkill", async (id: string, { rejectWithValue }) => {
    try {
        const response = await SkillService.deleteSkill(id);
        return response;
    } catch (err) {
        const error = axiosErrorHandler(err)
        return rejectWithValue(error);
    }
});

const initialState: SkillStateType = {
    skill: null,
    errors: null,
    isLoading: false,
};

export const skillSlice = createSlice({
    name: "skill",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllProfileSkill.pending, (state) => {
            state.skill = null;
            state.isLoading = true;
        });
        builder.addCase(getAllProfileSkill.fulfilled, (state, action) => {
            state.skill = action.payload;
            state.errors = null;
        });
        builder.addCase(getAllProfileSkill.rejected, (state, action) => {
            state.errors = action.payload;
        });
        builder.addCase(createSkill.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(createSkill.fulfilled, (state, action) => {
            state.skill = action.payload;
            state.isLoading = false;
            state.errors = null;
        });
        builder.addCase(createSkill.rejected, (state, action) => {
            state.errors = action.payload;
        });
        builder.addCase(updateSkill.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updateSkill.fulfilled, (state, action) => {
            state.skill = action.payload;
            state.isLoading = false;
            state.errors = null;
        });
        builder.addCase(updateSkill.rejected, (state, action) => {
            state.errors = action.payload;
        });
        builder.addCase(deleteSkill.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteSkill.fulfilled, (state) => {
            state.isLoading = false;
            state.errors = null;
        });
        builder.addCase(deleteSkill.rejected, (state, action) => {
            state.errors = action.payload;
        });
    },
});

export default skillSlice.reducer;
