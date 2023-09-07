import "./directory-item.styles.scss";

function DirectoryItem({ category }) {
    const { imageUrl, title } = category;

    return (
        <div className="directory-item-container">
            <div
                className="background-image"
                style={{ backgroundImage: `url(${imageUrl})` }}
            />
            <div className="directory-item-body">
                <h2>{title.toUpperCase()}</h2>
                <p>Shop Now</p>
            </div>
        </div>
    );
}

export default DirectoryItem;
