import React, { createContext, useReducer, FC, PropsWithChildren, useEffect } from "react";
import { DislikedUsers, LikedUsers, User } from "../interfaces/userInterface";

// Definir el tipo de estado del usuario
type UserState = {
  user: User | null;
};

// Definir las acciones para modificar el estado del usuario
type UserAction = 
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_LIKED_USERS'; payload: LikedUsers }
  | { type: 'UPDATE_DISLIKED_USERS'; payload: DislikedUsers };


// Función reductora para modificar el estado del usuario
const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem('userLogged', JSON.stringify(action.payload));
      return { ...state, user: action.payload };
    case 'LOGOUT':
      localStorage.removeItem('userLogged');
      return { ...state, user: null };
    case 'UPDATE_LIKED_USERS':
      if (state.user) {
        const updatedUser = {
          ...state.user,
          likedUsers: [...(state.user.likedUsers || []), action.payload]
        };
        localStorage.setItem('userLogged', JSON.stringify(updatedUser));
        return { ...state, user: updatedUser };
      }
      return state;
    case 'UPDATE_DISLIKED_USERS':
      if (state.user) {
        const updatedUser = {
          ...state.user,
          dislikedUsers: [...(state.user.dislikedUsers || []), action.payload]
        };
        localStorage.setItem('userLogged', JSON.stringify(updatedUser));
        return { ...state, user: updatedUser };
      }
      return state;
    default:
      return state;
  }
};

// Definir el contexto del usuario
export const UserContext = createContext<{ state: UserState; dispatch: React.Dispatch<UserAction> }>({ state: { user: null }, dispatch: () => null });

// Proveedor de contexto de usuario
export const UserProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  // Inicializar el estado desde localStorage
  const [state, dispatch] = useReducer(userReducer, { user: JSON.parse(localStorage.getItem('userLogged') || 'null') });

  // useEffect para sincronizar el estado con localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('userLogged');
    if (storedUser) {
      dispatch({ type: 'LOGIN', payload: JSON.parse(storedUser) });
    }
  }, []);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
