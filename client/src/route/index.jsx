import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import Home from "../pages/Home"
import SearchPage from "../pages/SearchPage"
import Login from "../pages/Login"
import Register from "../pages/Register"
import ForgotPassword from "../pages/ForgotPassword"
import OtpVerification from "../pages/OtpVerification"
import ResetPassword from "../pages/ResetPassword"
import UserMobileMenu from "../components/UserMobileMenu"
import Dashboard from "../components/layouts/Dashboard"
import Profile from "../pages/Profile"
import MyOrders from "../pages/MyOrders"
import Address from "../pages/Address"
import Category from "../pages/Category"
import SubCategory from "../pages/SubCategory"
import UploadProduct from "../pages/UploadProduct"
import ProductAdmin from "../pages/ProductAdmin"
import AdminPermissionHOC from "../components/layouts/AdminPermissionHOC"









const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App />,
            children: [
                {
                    path: "",
                    element: <Home />
                },
                {
                    path: "search",
                    element: <SearchPage />
                },
                {
                    path: "login",
                    element: <Login />
                },
                {
                    path: "register",
                    element: <Register />
                },
                {
                    path: "forgot-password",
                    element: <ForgotPassword />
                },
                {
                    path: "verification-otp",
                    element: <OtpVerification />
                },
                {
                    path: "reset-password",
                    element: <ResetPassword />
                },
                {
                    path: "user-mobile",
                    element: <UserMobileMenu />
                },
                {
                    path: "dashboard",
                    element: <Dashboard />,
                    children: [
                        {
                            path: "profile",
                            element: <Profile />,
                        },
                        {
                            path: "myorders",
                            element: <MyOrders />,
                        },
                        {
                            path: "address",
                            element: <Address />,
                        },
                        {
                            path: "category",
                            element: <AdminPermissionHOC><Category /></AdminPermissionHOC>,
                        },
                        {
                            path: "subcategory",
                            element: <AdminPermissionHOC><SubCategory /></AdminPermissionHOC>,
                        },
                        {
                            path: "upload-product",
                            element: <AdminPermissionHOC><UploadProduct /></AdminPermissionHOC>,
                        },
                        {
                            path: "product",
                            element: <AdminPermissionHOC><ProductAdmin /></AdminPermissionHOC>,
                        },
                    ]
                },
            ]
        },

    ]
)
export default router
