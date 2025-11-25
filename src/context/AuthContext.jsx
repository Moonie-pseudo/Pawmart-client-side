import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const authInfo = { user, setUser };
  return (
  <AuthContext value={authInfo}>
    {children}
  </AuthContext>
);

}
