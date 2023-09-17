import { Fragment } from "react";
import { useSelector } from "react-redux";

import CategoryPreview from "../../components/category-preview/category-preview.component";
import {
    selectCategoriesMap,
    selectCategoriesIsLoading,
} from "../../store/categories/category.selector";
import Spinner from "../spinner/spinner.component";

function CategoriesPreview() {
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);

    return (
        <Fragment>
            {isLoading ? (
                <Spinner />
            ) : (
                Object.keys(categoriesMap).map((title) => (
                    <CategoryPreview
                        key={title}
                        title={title}
                        products={categoriesMap[title]}
                    />
                ))
            )}
        </Fragment>
    );
}

export default CategoriesPreview;
