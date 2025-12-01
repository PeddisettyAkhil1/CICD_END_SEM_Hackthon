import { createContext , useContext , useEffect , useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { checkAuthAPI } from "../apis/User/userApi";


export const AuthContext = createContext();
export const AuthProvider = ( { children } )=>{
    const [ isAuthenticated , setIsAuthenticated ] = useState(false);
    const [ userRole , setUserRole ] = useState("");
    const { isError , data , isSuccess , error } = useQuery({ queryFn : checkAuthAPI , queryKey : ["checkAuth"] });
    useEffect(()=>{
        if(isSuccess){
            setIsAuthenticated(data?.isAuth);
            setUserRole(data?.role);
        }
    },[ data , isSuccess ]);

    const login = (role)=>{
        setIsAuthenticated(true);
        setUserRole(role);
    }

    const logout = ()=>{
        setIsAuthenticated(false);
        setUserRole("");
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated , login , logout , userRole , isError , error }}>
            { children }
        </AuthContext.Provider>
    );
};

export const useAuth = ()=>{
    return useContext(AuthContext);
}