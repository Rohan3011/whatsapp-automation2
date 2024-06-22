import API from "@/lib/axios";
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type Auth = {
  token?: string;
};

const AuthContext = createContext<Auth>({});

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return authContext;
};

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [token, setToken] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      const resp = await API.get("/api/hello");
    };
  }, []);

  return (
    <AuthContext.Provider value={{ token }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
