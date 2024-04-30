import { FC, PropsWithChildren, useContext } from "react"

import {LoginPage} from "../Pages/Login"
import { UserContext } from "../hooks/userContext";

export const PrivateRoute: FC<PropsWithChildren> = ( {children} ) => {
  const {state} = useContext(UserContext)

  const getUsers = () => {
    const loggedUserJSON = window.localStorage.getItem('userLogged')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      return user
    }
  }

  if (state.user !== null || getUsers() !== undefined ) return children;
  else return <LoginPage />
}
