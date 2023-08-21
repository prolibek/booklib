import AdminPage from "./pages/AdminPages/AdminPage";
import GenreAddPage from "./pages/AdminPages/AddPages/GenreAddPage";
import GenreListPage from "./pages/AdminPages/ListPages/GenreListPage";
import HomePage from "./pages/HomePage/HomePages";
import GenreEditPage from "./pages/AdminPages/AddPages/GenreEditPage";
import AuthorAddPage from "./pages/AdminPages/AddPages/AuthorAddPage";
import AuthorListPage from "./pages/AdminPages/ListPages/AuthorListPage";
import AuthorEditPage from "./pages/AdminPages/AddPages/AuthorEditPage";

export const adminRoutes = [
    { path: "/admin", element: <AdminPage/> },
    { path: "/admin/genres", element: <GenreListPage/> },
    { path: "/admin/genres/add", element: <GenreAddPage/> },
    { path: "/admin/genres/:id", element: <GenreEditPage/> },
    { path: "/admin/authors", element: <AuthorListPage/> },
    { path: "/admin/authors/add", element: <AuthorAddPage/>},
    { path: "/admin/authors/:id", element: <AuthorEditPage/> }
];

export const publicRoutes = [
    { path: "/", element: <HomePage/> },
]