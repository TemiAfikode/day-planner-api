import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoute({ token, redirect = '/' }) {
    if (!token) return <Navigate to={redirect} replace />
    
  return  <Outlet />
}

export function ReversedRoute({ token, redirect = '/dashboard' }) {
if (token) return <Navigate to={redirect} replace />
    
  return  <Outlet />
}
