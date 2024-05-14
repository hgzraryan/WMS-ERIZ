import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || true);
    //console.log(auth);
    return (
        <AuthContext.Provider value={{ auth, setAuth, persist, setPersist  }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;