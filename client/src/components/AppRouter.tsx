import { useSelector, RootState } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { adminRoutes, publicRoutes } from "../router";


const AppRouter = () => {
    const authState = useSelector((state: RootState) => state.auth);

    return (
        <Routes>
            {
                publicRoutes.map((route) =>
                    <Route
                        path={route.path}
                        element={route.element}
                        key={route.path}
                    />
                )
            }
            {
                authState.isAuthenticated &&
                authState.isAdmin &&
                adminRoutes.map((route) =>
                    <Route
                        path={route.path}
                        element={route.element}
                        key={route.path}
                    />
                )
            }
        </Routes>
    )
}

export default AppRouter;