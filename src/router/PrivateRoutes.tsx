import { FC, PropsWithChildren, useContext } from "react"

import {LoginPage} from "../Pages/Login"
import { UserContext } from "../hooks/userContext";

export const PrivateRoute: FC<PropsWithChildren> = ( {children} ) => {
  const {state} = useContext(UserContext)
  if (state.user !== null) return children;
  else return <LoginPage />
}