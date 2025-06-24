import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router';

const PrivateRoutes = ({children}) => {
    const {user, loading}=useAuth();
    if(loading){
        return <p>Loading....</p>
    }
    if(!user){
        <Navigate to='/login'></Navigate>
    }
    return  children;
};

export default PrivateRoutes;