import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFoods } from "../meals/mealsThunk";
import {
  EditMealAdmin,
  deleteMealAdmin,
  postAddMeals,
} from "../../api/MealsService";

export const PostAdminMeals = createAsyncThunk(
  `admin/postAdminMeals`,
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const response = await postAddMeals(payload);
      console.log(response, "response");

      dispatch(getFoods());
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const DeleteAdminMeals = createAsyncThunk(
  `admin/deleteMealsAdmin`,
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await deleteMealAdmin(id);

      dispatch(getFoods());
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const EditodoMeal = createAsyncThunk(
  `admin/editMeals`,
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await EditMealAdmin(payload);
      dispatch(getFoods());

      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
