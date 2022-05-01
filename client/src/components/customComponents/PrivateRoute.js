import { useEffect, useState } from 'react'
import { Navigate } from 'react-router'
import { useContext } from 'react'
import {AuthContext} from '../context/AuthContext'

export default function PrivateRoute({ children }) {
 
  const {user} = useContext(AuthContext);
  
  return <> {user && user.isLogged ? children : <Navigate to={'/login'} />}</>
}
