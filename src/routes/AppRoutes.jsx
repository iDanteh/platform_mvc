import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login.jsx';
import Dashboard from '../pages/Dashboard.jsx';

function AppRouter() {
    return (
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='dashboard' element={<Dashboard />}/>
            {/* <Route path='/register' element={<Register />} /> */}
        </Routes>
    );
}

export default AppRouter;