import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import CategoriesPreview from "../../components/categories-preview/categories-preview.component";
import Category from "../category/category.component";
import { fetchCategoriesStart } from "../../store/categories/category.action";

function Shop() {
    const dispatch = useDispatch();

    useEffect(() => {
        const getCategoryMap = async () => {
            dispatch(fetchCategoriesStart());
        };
        getCategoryMap();
    }, [dispatch]);

    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=":category" element={<Category />} />
        </Routes>
    );
}

export default Shop;
