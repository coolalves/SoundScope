import React from "react"
import { Route, Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth()

  return (
    <Route
      {...rest}
      render={props => {
        return currentUser ? <Component {...props} /> : <Route path="/" element={<Navigate to='/login' replace />} />
      }}
    ></Route>
  )
}
