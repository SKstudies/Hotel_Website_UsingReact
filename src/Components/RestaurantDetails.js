import React from 'react'
import { useParams } from 'react-router-dom'; 
import { RESTAURANT_IMG_CDN_URL,MENU_IMG_CDN_URL, MENU_ITEM_TYPE_KEY, RESTAURANT_TYPE_KEY,RESTAURANT_MENU_API} from '../Utils/constants.js'
import useRestaurantMenuData from '../Utils/useRestaurantMenuData.js';
// useParams is used to get the id passed to the router from the link .

const RestaurantDetails = () => {
    const { resId } = useParams();
    // this is how we get Id from the router 
    // we passed the id using link to router 
    const[restaurant, menuItem] = useRestaurantMenuData(MENU_ITEM_TYPE_KEY, RESTAURANT_TYPE_KEY, RESTAURANT_MENU_API, resId);
    // get the details of menu of the restaurant using a custom hook.

  return !restaurant ? (<div>shimmer component</div>) : (
    <div className='restaurant-details'>
      <div className='restaurant-summary'>
        <img className='restaurant-image' src={RESTAURANT_IMG_CDN_URL + restaurant?.cloudinaryImageId} alt={restaurant?.name} />
        <h2 className="restaurant-title">{restaurant?.name}</h2>
        <p className="restaurant-tags">{restaurant?.cuisines?.join(", ")}</p>
        <div className="restaurant-rating" style={{color: "black"}}>
            <span>{restaurant?.avgRating}</span>
        </div>
        <div className="restaurant-rating-slash">|</div>
        <div>{restaurant?.sla?.slaString}</div>
        <div className="restaurant-rating-slash">|</div>
        <div>{restaurant?.costForTwoMessage}</div>
      </div>

      <div className='restaurant-menu'>
        {menuItem.map((item) => {
          return(
            <div className='menu-card' key={item?.id}>
              <h3 className='item-name'>{item?.name}</h3>
              <p className='item-cost'>{item?.price ? item?.price/100 : ""}</p> 
              <p className='item-description'>{item?.description}</p>
              <div className='item-image-container'>{item?.imageId && <img className='item-image restaurant-image' src={MENU_IMG_CDN_URL + item?.imageId} alt={item?.name}/>} </div>
              <button className='item-add-btn'>Add</button>
            </div>
          )
        })}
      </div>      
    </div>
  )
}

export default RestaurantDetails;