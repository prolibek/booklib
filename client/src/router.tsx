import AdminPage from "./pages/AdminPages/AdminPage";
import HomePage from "./pages/HomePage/HomePages";

export const adminRoutes = [
    { path: "/admin", element: <AdminPage/> },
];

export const publicRoutes = [
    { path: "/", element: <HomePage/> },
]