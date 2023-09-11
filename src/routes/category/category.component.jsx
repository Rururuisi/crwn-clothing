import { CategoryContainer, CategoryTitle } from "./category.styles";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectCategoriesMap } from "../../store/categories/category.selector";
import ProductCard from "../../components/product-card/product-card.component";

function Category() {
    const { category } = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    console.log(categoriesMap);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <div>
            <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
            <CategoryContainer>
                {products?.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </CategoryContainer>
        </div>
    );
}

export default Category;
