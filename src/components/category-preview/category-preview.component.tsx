import {
    CategoryPreviewContainer,
    CategoryPreviewTitle,
    Preview,
} from "./category-preview.styles";
import { Link } from "react-router-dom";

import { CategoryItem } from "../../store/categories/category.type";

import ProductCard from "../product-card/product-card.component";
import { FC } from "react";

type CategoryPreviewProps = {
    title: string;
    products: CategoryItem[];
}

const CategoryPreview:FC<CategoryPreviewProps> = ({ title, products }) => {
    return (
        <CategoryPreviewContainer>
            <Link to={`/shop/${title}`}>
                <CategoryPreviewTitle>
                    {title.toUpperCase()}
                </CategoryPreviewTitle>
            </Link>
            <Preview>
                {products
                    .filter((_, idx) => idx < 4)
                    .map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
            </Preview>
        </CategoryPreviewContainer>
    );
}

export default CategoryPreview;
