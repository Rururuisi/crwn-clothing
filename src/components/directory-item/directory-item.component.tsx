import {
    DirectoryItemContainer,
    BackgroundImage,
    DirectoryItemBody,
} from "./directory-item.styles";
import { useNavigate } from "react-router-dom";

import { Category } from "../../store/categories/category.type";
import { FC } from "react";

type DirectoryItemProps = {
    category: Category & {route:string, id: number};
} 

const DirectoryItem: FC<DirectoryItemProps> = ({ category } ) => {
    const { imageUrl, title, route } = category;
    const navigate = useNavigate();

    const onNavigateHandler = () => navigate(route);

    return (
        <DirectoryItemContainer onClick={onNavigateHandler}>
            <BackgroundImage imageUrl={imageUrl} />
            <DirectoryItemBody>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </DirectoryItemBody>
        </DirectoryItemContainer>
    );
}

export default DirectoryItem;
