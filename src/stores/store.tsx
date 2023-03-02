import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import profileReducer from "./features/profileSlice";
import educationReducer from "./features/educationSlice";
import experienceReducer from "./features/experienceSlice";
import interestReducer from "./features/interestSlice";
import sourceKnowledgeReducer from "./features/sourceKnowledgeSlice";
import skillReducer from "./features/skillSlice";
import categorySkillReducer from "./features/categorySkillSlice";
import knowledgeReducer from "./features/knowledgeSlice";
import categoryKnowledgeReducer from "./features/categoryKnowledgeSlice";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        education: educationReducer,
        experience: experienceReducer,
        interest: interestReducer,
        sourceKnowledge: sourceKnowledgeReducer,
        skill: skillReducer,
        categorySkill: categorySkillReducer,
        knowledge: knowledgeReducer,
        categoryKnowledge: categoryKnowledgeReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
