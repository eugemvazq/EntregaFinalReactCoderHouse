import React from "react";
import ReactDOM from "react-dom/client";
//import App from "./App.jsx";
import "./scss/styles.scss";
// eslint-disable-next-line no-unused-vars
import * as bootstrap from "bootstrap";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ItemListContainer from "./components/ItemListContainer.jsx";
import ItemDetailContainer from "./components/ItemDetailContainer.jsx";
import Checkout from "./components/Checkout.jsx";
import App from "./App.jsx";
import { CustomProvider } from "@CartContext";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <>
            <ItemListContainer />
          </>
        ),
      },
      {
        path: "/category/:categoryId",
        element: (
          <>
            <ItemListContainer />
          </>
        ),
      },
      {
        path: "/item/:itemId",
        element: (
          <>
            <ItemDetailContainer />
          </>
        ),
      },
      {
        path: "/cart",
        element: (
          <>
            <Checkout />
          </>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CustomProvider>
      <RouterProvider router={router} />
    </CustomProvider>
  </React.StrictMode>
);
