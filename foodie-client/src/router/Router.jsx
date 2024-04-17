import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home"
import Menu from "../pages/shop/Menu";
import Signup from "../components/Signup";
import PrivateRouter from "../PrivateRouter/PrivateRouter";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import CartPage from "../pages/shop/CartPage";
import Dashboardlayout from "../layout/Dashboardlayout";
import Dashboard from "../pages/dashboard/admin/Dashboard";
import Users from "../pages/dashboard/admin/Users";
import Login from "../components/Login";
import Addmenu from "../pages/dashboard/admin/Addmenu";
import ManageItems from "../pages/dashboard/admin/ManageItems";
import UpdateMenu from "../pages/dashboard/admin/UpdateMenu";
import UserProfile from "../pages/dashboard/admin/UserProfile";
import Payment from "../pages/shop/Payment";
import Order from "../pages/dashboard/Order";



const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children:[
        {
          path:"/",
          element:<Home/>
        },
        {
          path:"/menu",
          element:<Menu/>
        },
        {
          path: "/order",
          element:<PrivateRouter><Order/></PrivateRouter>
        },
        {
          path:"/checkout",
          element:<Payment/>
    
        },
        {
          path: "/update-profile",
          element: <UserProfile/>
        },
        {
          path:"/cart-page",
          element:<CartPage/>
        },
       
        {
          path:"/update-profile",
          element:<UpdateProfile/>
        },
        
      ],

    },
   
    {
      path:"/signup",
      element:<Signup/>

    },
    {
      path: "/login",
      element: <Login/>
    },
    //admin routes
    {
      path:"/dashboard",
      element:<PrivateRouter><Dashboardlayout/></PrivateRouter>,
      children:[
        {
          path:'',
          element:<Dashboard/>
        },
        {
          path: 'users', 
          element: <Users/>
        },
        {
          path: 'add-menu',
          element: <Addmenu/>
        }, 
        {
          path: "manage-items",
          element: <ManageItems/>
        },
        {
          path: "update-menu/:id",
          element: <UpdateMenu/>,
          loader: ({params}) => fetch(`http://localhost:6001/menu/${params.id}`)
        }
      ]
    }
]);
export default router;