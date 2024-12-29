import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import { useAuth } from "../context/AuthContext.jsx";

// Función dedicada para realizar un logout del sistema
function Logout() {
    const { logout } = useAuth();

    // Llama a logout y redirige al usuario
    React.useEffect(() => {
        logout();
    }, [logout]);

    return <Navigate to="/" replace />;
}

function AppRouter() {
    const { isAuthenticated} = useAuth();

    return (
        <Routes>
        {isAuthenticated ? (
            // Rutas accesibles solo si el usuario está autenticado
            <>
            <Route path="/dashboard" element={<Dashboard />} />
            {/* <Route path="/subscriptions" element={<Subscriptions />} /> */}
            <Route path="/logout" element={<Logout />}/>
            </>
        ) : (
            // Rutas accesibles solo si el usuario no está autenticado
            <>
            <Route path="/" element={<Login />} />
            <Route path="*" element={<Navigate to="/" replace />} />
            </>
        )}
        </Routes>
    );
}

export default AppRouter;
