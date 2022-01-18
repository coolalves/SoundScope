<<<<<<< HEAD
import React from "react"
import {Navigate} from "react-router-dom"
import { useAuth } from "../authentication/AuthContext"

export default function PrivateRoute({children}) {
  const { currentUser } = useAuth()

    return  currentUser ? children : <Navigate to='/login' replace />
=======
import React from "react"
import {Navigate} from "react-router-dom"
import { useAuth } from "../authentication/AuthContext"

export default function PrivateRoute({children}) {
  const { currentUser } = useAuth()

    return  currentUser ? children : <Navigate to='/login' replace />
>>>>>>> 88117470d8615e72de22020c5d130ce085464e11
}