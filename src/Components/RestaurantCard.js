import { RESTAURANT_IMG_CDN_URL, RESTAURANT_LIST_API }  from "../Utils/constants.js";

const RestaurantCard = (props) => {
    const {name, cloudinaryImageId, locality, areaName, costForTwo, cuisines, avgRating, sla } = {...props.info};
    return (
        <div className="restaurant-card">
            <img src={RESTAURANT_IMG_CDN_URL + cloudinaryImageId} alt="Restaurant Image" />
            {console.log(`${RESTAURANT_IMG_CDN_URL + cloudinaryImageId}`)}
            <h3>{name}</h3>
            <h5>{cuisines.join(', ')}</h5>

            <div className="bottom-part">
                <h4>{avgRating}</h4>
                <h4>{areaName}</h4> 
                <h4>{costForTwo}</h4>
            </div>

        </div>
    )
}

export default RestaurantCard;