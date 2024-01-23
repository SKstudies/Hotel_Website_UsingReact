import { useEffect, useState } from "react";
import { RESTAURANT_IMG_CDN_URL, RESTAURANT_LIST_API }  from "../Utils/constants";
import { Link } from "react-router-dom";

import RestaurantCard from "./RestaurantCard.js";
import Shimmer from "./Shimmer.js"

const Body = () => {
    
    const[ allRestaurantsList , setAllRestaurantsList] = useState([]);
    const[ filteredRestaurantsList , setFilteredRestaurantsList] = useState([]);
    const[ searchText , setSearchText] = useState("");
    const[ errorMessage, setErrorMessage] = useState("");

    useEffect( () => {
        getRestaurantData();
    },[])

    async function findResturantsFromData(json) {
        let data = [];
        for( let i = 0; i < json?.data?.cards?.length; i++){
            console.log(json);
            //assign the restaurant array to the data if present else its value will be undefined.
            // data.cards[1].card.card.gridElements.infoWithStyle.restaurants
            
            let newData = json?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
            console.log(i); 
            console.log(data);
            console.log(`newdata= ${newData}`);
            // check if json data from API has resstaurant array or it is undefined then return null;
            console.log(`data?.length <= newData?.length = ${data?.length} <= ${newData?.length}`)
            if(data?.length <= newData?.length){
                data = newData;
                console.log(`inside the iffffieee ${data} aned ${newData}`);
            }

        }
        if(data !== undefined){
            return data;
        }else{
            return null;
        }
    }



    async function getRestaurantData (){
        try{
            const response = await fetch(RESTAURANT_LIST_API);
            console.log(`response`);
            console.log(response);
            const json = await response.json();
            console.log(`json`);
            console.log(json);



            const restaurantList = await findResturantsFromData(json);

            console.log(`resturantList ${restaurantList}`)

            setAllRestaurantsList(restaurantList);
            setFilteredRestaurantsList(restaurantList);
            
        }
        catch(error){
            console.log(`this catch ${error}`);
        }
    }


    async function searchRestaurant(searchText, allRestaurantsList) {
        if(searchText === ""){
            setFilteredRestaurantsList(allRestaurantsList);
            setErrorMessage("");
        }
        else if((searchText !== "")){
            // filter the allRestaurantsList
            const filteredRestaurants = allRestaurantsList.filter((restaurant) => { 
                return(
                    // traverse throuth allRestaurantsList that is an array and return array containing each (allRestaurantsList[i]  || restaurant) that has searchText in name  
                    restaurant?.info?.name.toLowerCase().includes(searchText.toLowerCase())
                );
            });
            setFilteredRestaurantsList(filteredRestaurants);
            setErrorMessage("");
            if(filteredRestaurants.length === 0){
                setErrorMessage(`Sorry, we couldn't find anything matching ${searchText}`);
            }
        }
    }


    
  // if allRestaurants is null don't render restaurants cards
  // from the findRestaurant function if we find the restaurant we update the array if we dont find res then we update val as  null. if allres is null then following condition is true and we return null.
  //![] is false and !null is true;
    if(!allRestaurantsList){
        console.log("inside null if")
        return null;
    }

    return(

        <div className="body">
            <div className="search">
                <input className="search-input" type="text" placeholder="search restaurant...." value={searchText} onChange={(e) => {setSearchText(e.target.value)}}    />
                <button className="search-button" onClick={() => { searchRestaurant(searchText, allRestaurantsList)}} >Search</button> 
            </div>
            
            {/* display error message if any that is no restaurant matches search text*/}
            {errorMessage && <div className="errorMessage">{errorMessage}</div>}

            {/* map each reaurant to the card component */}
            {allRestaurantsList.length === 0 ? (<Shimmer/>) : (
                <div className="cards-component">
                    {filteredRestaurantsList.map( (restaurant) => {
                        return (
                            <Link to={"/restaurant/" + restaurant?.info?.id} key={restaurant?.info?.id} className="link-style">
                                <RestaurantCard  key={restaurant?.info?.id} info={restaurant?.info}    />   
                            </Link>                                       
                        );
                    })}

                </div>

            )}

        </div>
    )
}



export default Body;