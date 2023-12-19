import { createContext, useContext, useState, useEffect } from 'react';
import { getToken, removeToken, setToken } from '../utils/helper';
import { useNavigate } from 'react-router-dom';
import { useFrappeGetCall, useFrappeAuth } from 'frappe-react-sdk';


const userContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const {login : useLogin} = useFrappeAuth()



    const { mutate } = useFrappeGetCall('headless_e_commerce.api.get_profile', {}, 'user-profile', {
        isOnline: () => getToken(),
        onSuccess: (data) => {
            setUser(data.message)
        }
    })


    const login = async (usr, pwd) => {
        try {
                return useLogin(usr, pwd).then((response) => response.json()).then((data) => {
                    console.log(data)
                if (data.message.token) {
                    console.log(data.message.token)
                    // handle jwt
                    setToken(data.message.token);
                    // get user
                    mutate()
                }
                return data;
            })

        } catch (error) {
            return error;
        }
    };

    const logout = async () => {
        setUser(null);
        removeToken();
        navigate("/login");
    };

    return <userContext.Provider value={{
        user,
        login,
        logout
    }}>
        {children}
    </userContext.Provider>
}

export const useUser = () => useContext(userContext);