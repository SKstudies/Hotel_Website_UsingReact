import React from 'react'
import { useParams } from 'react-router-dom';  
// useParams is used to get the id passed to the router from the link .

const RestaurantDetails = () => {
    const { resId } = useParams();
    // this is how we get Id from the router 
    // we passed the id using link to router 

  return (
    <div className='restaurant-details'>RestaurantDetails</div>
  )
}

export default RestaurantDetails;