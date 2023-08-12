import AdminPage from "./pages/AdminPages/AdminPage";
import GenreAddPage from "./pages/AdminPages/GenreAddPage/GenreAddPage";
import HomePage from "./pages/HomePage/HomePages";

export const adminRoutes = [
    { path: "/admin", element: <AdminPage/> },
    { path: "/admin/genres/genre-add", element: <GenreAddPage/> }
];

export const publicRoutes = [
    { path: "/", element: <HomePage/> },
]