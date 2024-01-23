import ReactFoodAppLogo from "../../public/images/Food Circle Logo-PhotoRoom.png";
import { Link } from "react-router-dom";
// link is used to link the components i mean to provide the path we use Link to update the component dynamically instead of href.

const Header =  () => {
    return (
        <div className="header">
            <div className="logo-image">  
                <a href="/"><img className="logo" src={ReactFoodAppLogo} alt="React-FoodApp-Logo" /></a> 
            
            </div>

            <div className="nav-items">    
                <ul>
                    <li> <Link to="/" className="nav-link" >Home </Link></li>
                    <li> <Link to="/about" className="nav-link" >About </Link> </li>
                    <li> <Link to="/contact" className="nav-link" >Contact </Link> </li>
                    <li> <Link to="/filler" className="nav-link" >Filler </Link></li>
                </ul>
            </div>
            
        </div>
    )
}


export default Header;