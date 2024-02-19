import React from 'react';
import App from '/src/App.jsx';
import {Routes, Route, Link} from 'react-router-dom';
import Login from '../views/Login';
import Register from '../views/Register';
import Account from '../views/Account';
import Reservar from '../views/ReservarFullcalendar';


class Router extends React.Component{
    render()
    {
        return (
            <Routes>

                <Route
                    path='/'
                    element={<App />}
                />
                <Route
                    path='/Login'
                    element={<Login />}
                />
                <Route
                    path='/Register'
                    element={<Register />}
                />
                 <Route
                    path='/Reservar'
                    element={<Reservar />}
                />
                <Route
                    path='/Cuenta'
                    element={<Account />}
                />
            </Routes>
        );
    }
}
export default Router;