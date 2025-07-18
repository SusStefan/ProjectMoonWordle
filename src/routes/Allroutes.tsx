import { createBrowserRouter } from "react-router-dom";
import Home from "../components/home";
import Limbus from "../components/limbus";
import Link from "../components/link";
export const Allroutes = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },{
        path: "/limbus",
        element: <Limbus />
    },{
        path: "/link",
        element: <Link />
    },
])