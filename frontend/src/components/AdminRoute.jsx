import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

import { useAuthStore } from '../store/useAuthStore.js'

const AdminRoute = () => {
    const {authUser, isCheckingAuth} = useAuthStore();
    if(isCheckingAuth) {
        return (<div className="min-h-screen flex justify-center items-center"><Loader2 className="animate-spin h-12 w-12 text-base-content"/></div>)
    }
    if(!authUser || authUser.role !== "ADMIN") {
        toast.error("Access Denied");
        <Navigate to="/"/>
    }
  return (
    <Outlet/>
  )
}

export default AdminRoute