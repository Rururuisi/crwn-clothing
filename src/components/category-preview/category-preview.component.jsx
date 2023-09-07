import "./category-preview.styles.scss";
import { Link } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";

function CategoryPreview({ title, products }) {
    return (
        <div className="category-preview-container">
            <Link to={`/shop/${title}`}>
                <h2 className="title">{title.toUpperCase()}</h2>
            </Link>
            <div className="preview">
                {products
                    .filter((_, idx) => idx < 4)
                    .map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
            </div>
        </div>
    );
}

export default CategoryPreview;
