import Home from "./index";
import Contact from "./contact";
import BlogPost from "./blog/[slug]";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/contact", element: <Contact /> },
  { path: "/blog/:slug", element: <BlogPost /> },
];

export default routes;
