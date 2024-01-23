import React from "react";
import ReactDOM  from "react-dom/client";
import { createBrowserRouter, RouterProvider,Outlet } from "react-router-dom";
// BrowserRouter to actually create the client side routing 
// RouterProvider to render the created router
// root.render(<RouterProvider router={appRouter} />); 
// above is the basic syntax render RouterProvider and use router as props and pass value appRouter
// import Outlet for dymaic routing
import Header from "./src/Components/Header";
import Footer from "./src/Components/Footer";
import Body from "./src/Components/Body";
import Contact from "./src/Components/Contact";
import About from "./src/Components/About";
import Filler from "./src/Components/Filler";
import RestaurantDetails from "./src/Components/RestaurantDetails";

const AppLayout = () => {
    return (
        <React.Fragment>
            <Header />
            <Outlet />    
            {/* outlet is the component which is dynamically updated according to the path from appRouter */}
            <Footer />
        </React.Fragment>
    )
}


// create the router 
const appRouter = createBrowserRouter([
    {
        path: "/",   // this is the router wher we should go.
        element: <AppLayout/>,  // at "/" we display body component
        children: [         // childer for this route that is "localhost:1234/'children'"
            // childer is array of objects which has path and respective element.
                {
                    path: "/",
                    element: <Body/>,
                },
                {
                    path: "/contact",
                    element: <Contact/>,
                },
                {
                    path: "/about",
                    element: <About/>,
                },
                {
                    path: "/filler",
                    element: <Filler/>,
                },
                {
                    path: "/restaurant/:resId",
                    element: <RestaurantDetails/>,
                },
        ],
    },

]);

const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<AppLayout />);  //this is how we render without router
root.render(<RouterProvider router={appRouter} />);
// RouterProvider is imported from react and we pass the router (appRouter) which we created as prop to the component like this = router={appRouter}
