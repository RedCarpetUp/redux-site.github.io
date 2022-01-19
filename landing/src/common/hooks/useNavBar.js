import { useState, useContext, createContext } from "react";
import { useCookies } from "react-cookie";

const NavBarContext = createContext();

export const useNavBar = () => {
    const context = useContext(NavBarContext);
    if (context === undefined) {
        throw new Error('useNavBar must be used within a NavBarContext')
    };
    return context;
};

export const navbar = () => {
    const [cookies] = useCookies();
    const [isLoggedIn, setIsLoggedIn] = useState(!!(
        (cookies.phone && cookies.accessToken) ||
        (cookies.mi_phone && cookies.mi_accessToken) ||
        (cookies.store_phone && cookies.store_accessToken)
    ));
    return {
        isLoggedIn,
        setIsLoggedIn
    }
};

export const NavBarProvider = ({ children }) => {
    return (
        <NavBarContext.Provider value={navbar()}>
            {children}
        </NavBarContext.Provider>
    );
};

export default NavBarContext;
