import { createBrowserRouter } from "react-router-dom";
import Home from "../components/home";
import Calculator from "../components/calculator";
export const Allroutes = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },{
        path: "/calculator",
        element: <Calculator />
    },
])