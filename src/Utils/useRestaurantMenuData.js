import React, { useEffect, useState } from 'react'

const useRestaurantMenuData = (MENU_ITEM_TYPE_KEY, RESTAURANT_TYPE_KEY, RESTAURANT_MENU_API, resId) => {
    
    const [restaurant, setRestaurant] = useState(null);
    const [menuArray, setMenuArray] = useState([]);

    useEffect(() => {
        getRestaurantMunu();
    }, []);

    async function getRestaurantMunu() {
        console.log(RESTAURANT_MENU_API + resId);
        try{
            // get the restaurant menu
           const response = await fetch( RESTAURANT_MENU_API + resId);
            // check the status of the response 
            if(!response.ok){
                const err = response.status;
                throw new Error(err);
            }
            else{
                const json = await response.json();
            
                                                                                                                    
                //get the data about sspecific restaurant                                                          card.@type will not work as it includes a special Character
                const restaurantInfo = json?.data?.cards?.map((card) => card.card).find((card) => {return( card && card.card['@type'] === RESTAURANT_TYPE_KEY);})?.card?.info || null;
                console.log(restaurantInfo);
                setRestaurant(restaurantInfo);
                

                //get the Menu(cards) of the restaurant   find return the first object, which has grpupedCard property                return the array of objects             filter the array to get an array of objects where they have following prop,  map will return the array of info(obj) from the parrent array                                                                                         
                const restaurantMenuInfo = json?.data?.cards?.find((card) => card?.groupedCard)?.groupedCard?.cardGroupMap?.REGULAR?.cards?.map((card) => {return(card.card?.card)})?.filter((card) => {return(card && card['@type'] == MENU_ITEM_TYPE_KEY)})?.map((card) => {return(card.itemCards)})?.flat().map((card) => card.card?.info) || [];
                //                                                                                                                                                                                                                                                                                  .flat will merge parent and child arrays        
                console.log(restaurantMenuInfo);
                // we have the info we will use it to create the restaurant Menu
                const restaurantMenu = [];
                //traverse over the info array 
                restaurantMenuInfo.forEach((item) => {
                    //check if empty array has the element if it does not have then push it in empty array 
                    if(!restaurantMenu.find((ifitem) => {return(ifitem?.id === item.id)})){
                        restaurantMenu.push(item);
                    }
                })
                //finally set the main Menu array.
                setMenuArray(restaurantMenu);
            }
        }catch(err){
            setRestaurant(null);
            setMenuArray([]);
            console.log("Error in the catch block of useRestaurantMenuData");
            console.error(err);
        }
    }
  return [restaurant,menuArray];
}

export default useRestaurantMenuData;