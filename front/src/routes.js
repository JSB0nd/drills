import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Drill } from "./business/Drill";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: ":chapterNumber/:drillNumber",
        element: <Drill />
    }
]);