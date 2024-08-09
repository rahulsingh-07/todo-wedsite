import { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
const [user,setUser] =useState("")

    const storeTokenInLS = (serverToken) => {
       
        setToken(serverToken); // Update the state with the new token
        return  localStorage.setItem('token', serverToken);
    };

    // to toggle login and logout 
    const isLoggedIn = !!token;

    // tracking logout functionality
    const LogoutUser = () => {
        setToken('');
        setUser('')
        localStorage.removeItem('token');
    };

//JWT authentication -to get the current logged user data
  const userAuthentication=async()=>{
    try {
        const response=await fetch('http://localhost:8000/api/auth/user',{
            method:"GET",
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        if(response.ok){
            const data=await response.json();
           // console.log("user data",data.userData)
            setUser(data.userData)
        }
    } catch (error) {
        console.log("error fetching user data",error)
    }
  }

  useEffect(()=>{
    if (token) {
        userAuthentication();
      }
    }, [token]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, LogoutUser, storeTokenInLS, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
