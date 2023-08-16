import AdminPage from "./pages/AdminPages/AdminPage";
import GenreAddPage from "./pages/AdminPages/AddPages/GenreAddPage";
import GenreListPage from "./pages/AdminPages/ListPages/GenreListPage";
import HomePage from "./pages/HomePage/HomePages";
import GenreEditPage from "./pages/AdminPages/AddPages/GenreEditPage";

export const adminRoutes = [
    { path: "/admin", element: <AdminPage/> },
    { path: "/admin/genres/genre-add", element: <GenreAddPage/> },
    { path: "/admin/genres", element: <GenreListPage/> },
    { path: "/admin/genres/:id", element: <GenreEditPage/> },
];

export const publicRoutes = [
    { path: "/", element: <HomePage/> },
]