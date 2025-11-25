import React from "react";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import PetsSupplies from "../pages/pets/PetsSupplies";
import ErrorPage from "../pages/error/ErrorPage";

// Private pages
import AddListing from "../pages/listings/AddListing.jsx";
import MyListings from "../pages/myListings/MyListings";
import MyOrders from "../pages/myOrders/MyOrders";
import PrivateRoute from "./PrivateRoute";
import ListingDetails from "../pages/listingDetails/ListingDetails.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/pets-supplies", element: <PetsSupplies /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      {
        path: "/listing-details/:id",
        element: (
          <PrivateRoute>
            <ListingDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-listing",
        element: (
          <PrivateRoute>
            <AddListing />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-listings",
        element: (
          <PrivateRoute>
            <MyListings />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-orders",
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
