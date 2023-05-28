import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Users from "./views/Users";
import Dashboard from "./views/Dashboard";
import NotFound from "./views/NotFound";
import AppLayout from "./components/layouts/AppLayout";
import GuestLayout from "./components/layouts/GuestLayout";
import UserCreateForm from "./views/UserCreateForm";
import UserEditForm from "./views/UserEditForm";
import Services from "./views/Services";
import ServiceCreateForm from "./views/ServiceCreateForm";
const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/dashboard" /> 
            },
            {
                path: '/dashboard',
                element: <Dashboard /> 
            },
            {
                path: '/users',
                element: <Users />
            },
            {
                path: '/user/create',
                element: <UserCreateForm />
            },
            {
                path: '/user/edit/:id',
                element: <UserEditForm />
            },
            {
                path: '/services',
                element: <Services />
            },
            {
                path: '/service/create',
                element: <ServiceCreateForm />
            },
        ]
    },
    {
        path:'/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            },
        ]
    },
    {
        path: '*',
        element: <NotFound />
    },


])
export default router;