import {createBrowserRouter,} from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import Coverage from "../Components/Coverage";
import PrivateRoutes from "../routes/PrivateRoutes";
import SendParcel from "../Pages/SendParcel";
import PaymentPage from "../Pages/PaymentPage";
import DashboardLayout from "../Layouts/DashboardLayout";
import UserHomePage from "../Pages/UserHomePage";
import TrackingPage from "../Pages/TrackingPage";
import MyParcels from "../Pages/Dashboard/MyParcels";
import ParcelDetails from "../Pages/Dashboard/ParcelDetails";
import EditParcelPage from "../Pages/Dashboard/EditParcelPage";

export const router = createBrowserRouter([
  {
    path: "/",
   Component:MainLayout,
   children:[
    {
        index:true,
        Component:Home,
    },
    {
      path:'coverage',
      Component:Coverage,
    },
    {
      path:'/send-parcel',
      element:<PrivateRoutes><SendParcel></SendParcel></PrivateRoutes>
    },
    {
      path:'payment/:id',
      element:<PrivateRoutes><PaymentPage></PaymentPage></PrivateRoutes>
    }
   ]
  },
  {
    path:'/',
    Component:AuthLayout,
    children:[
      {
        path:'/login',
        Component:Login,
      },
      {
        path:'/register',
        Component: Register,
      }
    ]
  },
  {
  path: '/dashboard',
  element: <PrivateRoutes><DashboardLayout /></PrivateRoutes>,
  children: [
    {
      index: true, 
      element: <UserHomePage />,
    },
    {
      path: 'user-home', 
      element: <UserHomePage />,
    },
    {
      path:'my-parcels',
      element:<MyParcels></MyParcels>,
    },
    {
      path: 'parcel/:id',
      element:<ParcelDetails></ParcelDetails>,
    },
    {
      path: 'edit-parcel/:id',
      element:<PrivateRoutes><EditParcelPage></EditParcelPage></PrivateRoutes>,
    },
    {
      path: 'track/:id',
      element:<TrackingPage></TrackingPage>,
    },
    {
      path: 'tracking',
      element:<TrackingPage></TrackingPage>
    },
  ],
}
]);

