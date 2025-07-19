import React from 'react';
import useAuth from '../hooks/useAuth';
import Loading from '../pages/shared/Loading/Loading';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth();
    const location = useLocation();
    // console.log(location)

    if(loading){
        return <Loading></Loading>
    }

    if(!user){
        return <Navigate state={{from: location.pathname}} to='/login'></Navigate>
    }
    return children;
};

export default PrivateRoute;