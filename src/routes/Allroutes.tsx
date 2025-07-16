import { createBrowserRouter } from "react-router-dom";
import Home from "../components/home";
import Limbus from "../components/limbus";
export const Allroutes = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },{
        path: "/limbus",
        element: <Limbus />
    },
])