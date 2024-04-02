import React, { createContext, useReducer, FC, PropsWithChildren } from "react";
import { User } from "../utils/fetchUsers";


// Definir el tipo de estado del usuario
type UserState = {
  user: User | null;
};

// Definir las acciones para modificar el estado del usuario
type UserAction = 
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' };

// Función reductora para modificar el estado del usuario
const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    default:
      return state;
  }
};

// Definir el contexto del usuario
export const UserContext = createContext<{ state: UserState; dispatch: React.Dispatch<UserAction> }>({ state: { user: null }, dispatch: () => null });

// Proveedor de contexto de usuario
export const UserProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, { user: null });

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};