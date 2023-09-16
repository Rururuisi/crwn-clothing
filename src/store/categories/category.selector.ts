import { createSelector } from "reselect";
import { CategoriesState } from "./category.reducer";
import { CategoriesMap } from "./category.type";
import { RootState } from "../store";

const selectCategoryReducer = (state: RootState): CategoriesState =>
    state.categories;

export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories): CategoriesMap =>
        categories.reduce((acc, category) => {
            const { title, items } = category;
            acc[title.toLowerCase()] = items;
            return acc;
        }, {} as CategoriesMap)
);

export const selectCategoriesIsLoading = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.isLoading
);
