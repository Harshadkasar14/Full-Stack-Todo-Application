import axios from "axios";
import { createContext, useContext, useState } from "react";

//1.Create a context
export const AuthContext=createContext()

export const useAuth=()=>useContext(AuthContext)


//2.share the created context with other components
export default function AuthProvider({children}){

    //3.put some state in the context
    const [isAuthenticated, setAuthenticated]=useState(false);

    const [username, setUsername]=useState(null)

    const API='http://localhost:8080/api/users'
    
   async function login(username, password) {
    try {
      const response = await axios.post(`${API}/login`, { username, password });
      setAuthenticated(true);
      setUsername(username);
      return { success: true };
    } catch (error) {
      setAuthenticated(false);
      setUsername(null);

      if (error.response?.status === 404) {
        return { success: false, message: "User not found. Please sign up." };
      } else if (error.response?.status === 401) {
        return { success: false, message: "Incorrect username or password." };
      } else {
        return { success: false, message: "Login failed. Try again later." };
      }
    }
  }

   function logout(){
      setAuthenticated(false)
      setUsername(null)
   }


    return(
        <AuthContext.Provider value={ {isAuthenticated, login, logout, username} }>
            {children}
        </AuthContext.Provider>
    )
}












