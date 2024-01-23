    async function searchRestaurant(searchText, allRestaurantsList) {
        // filter the allRestaurantsList
        const filteredRestaurants = allRestaurantsList.filter((restaurant) => { 
            return(
                // traverse throuth allRestaurantsList that is an array and return array containing each (allRestaurantsList[i]  || restaurant) that has searchText in name  
                restaurant?.info?.name.toLowercase().includes(searchText.toLowercase())
            );
        });

        if(searchText === ""){
            setFilteredRestaurantsList(allRestaurantsList);
            setErrorMessage("");
        }
        else if((searchText !== "") && (filteredRestaurants?.length !== 0)){
            setFilteredRestaurantsList(filteredRestaurants);
            setErrorMessage("");
        }
        else {// (searchText !== "") && (filteredRestaurants?.length === 0)
            setErrorMessage(`Sorry, we couldn't find any results for ${searchText}`);
        }   
    }