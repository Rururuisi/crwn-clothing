import {
    CategoryPreviewContainer,
    CategoryPreviewTitle,
    Preview,
} from "./category-preview.styles";
import { Link } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";

function CategoryPreview({ title, products }) {
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
