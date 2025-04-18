import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./_routes";

const router = createBrowserRouter(routes);

export default function App() {
  return <RouterProvider router={router} />;
}
