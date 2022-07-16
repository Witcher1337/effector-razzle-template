import { Home } from "./Home";
import { News } from "./News";
import { NewsDetails } from "./News/NewsDetails";

export const routes = [
  {
    path: "/",
    element: Home,
  },
  {
    path: "/news",
    element: News,
  },
  {
    path: "/news/:id",
    exact: true,
    element: NewsDetails,
  },
];
