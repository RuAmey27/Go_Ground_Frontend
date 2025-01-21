// import {
//   FC,
//   useState,
//   useEffect,
//   createContext,
//   useContext,
//   Dispatch,
//   SetStateAction,
// } from "react";
// import { LayoutSplashScreen } from "../../../../_metronic/layout/core";
// import { AuthModel, UserModel } from "./_models";
// import * as authHelper from "./AuthHelpers";
// //import { getUserBySession} from "./_requests";
// import { WithChildren } from "../../../../_metronic/helpers";

// type AuthContextProps = {
//   auth: AuthModel | undefined;
//   saveAuth: (auth: AuthModel | undefined) => void;
//   currentUser: UserModel | undefined;
//   setCurrentUser: Dispatch<SetStateAction<UserModel | undefined>>;
//   logout: () => void;
// };

// const initAuthContextPropsState = {
//   auth: authHelper.getAuth(),
//   saveAuth: () => {},
//   currentUser: undefined,
//   setCurrentUser: () => {},
//   logout: () => {},
// };

// const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState);

// const useAuth = () => {
//   return useContext(AuthContext);
// };

// const AuthProvider: FC<WithChildren> = ({ children }) => {
//   const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth());
//   const [currentUser, setCurrentUser] = useState<UserModel | undefined>();

//   const saveAuth = (auth: AuthModel | undefined) => {
//     setAuth(auth);
//     if (auth) {
//       authHelper.setAuth(auth);
//     } else {
//       authHelper.removeAuth();
//     }
//   };

//   const logout = () => {
//     saveAuth(undefined);
//     setCurrentUser(undefined);
//   };

//   return (
//     <AuthContext.Provider
//       value={{ auth, saveAuth, currentUser, setCurrentUser, logout }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// const AuthInit: FC<WithChildren> = ({ children }) => {
//   const { auth, currentUser, logout, setCurrentUser } = useAuth();
//   const [showSplashScreen, setShowSplashScreen] = useState(true);

//   useEffect(() => {
//     setShowSplashScreen(false); // Skip token validation for immediate splash screen removal
//   }, []);

//   return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>;
// };

// export { AuthProvider, AuthInit, useAuth };

import {
  FC,
  useState,
  useEffect,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import { LayoutSplashScreen } from "../../../../_metronic/layout/core";
import { AuthModel, UserModel } from "./_models";
import * as authHelper from "./AuthHelpers";
import { WithChildren } from "../../../../_metronic/helpers";
import axios from "axios";
const API_URL = import.meta.env.VITE_APP_API_URL

type AuthContextProps = {
  auth: AuthModel | undefined;
  saveAuth: (auth: AuthModel | undefined) => void;
  currentUser: UserModel | undefined;
  setCurrentUser: Dispatch<SetStateAction<UserModel | undefined>>;
  logout: () => void;
};

const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  saveAuth: () => {},
  currentUser: undefined,
  setCurrentUser: () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState);

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider: FC<WithChildren> = ({ children }) => {
  const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth());
  const [currentUser, setCurrentUser] = useState<UserModel | undefined>();

  const saveAuth = (auth: AuthModel | undefined) => {
    setAuth(auth);
    if (auth) {
      authHelper.setAuth(auth);
    } else {
      authHelper.removeAuth();
    }
  };

  const logout = () => {
    axios.post(`${API_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });
    saveAuth(undefined);
    setCurrentUser(undefined);
  };

  return (
    <AuthContext.Provider
      value={{ auth, saveAuth, currentUser, setCurrentUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const AuthInit: FC<WithChildren> = ({ children }) => {
  const { logout, setCurrentUser } = useAuth();
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  useEffect(() => {
    // Replace with a session validation API call if needed
    setShowSplashScreen(false);
  }, [logout, setCurrentUser]);

  return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>;
};

export { AuthProvider, AuthInit, useAuth };
