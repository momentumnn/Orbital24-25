import React,{Children, useEffect, useState} from "react";
import { useLocation } from "react-router-dom";


{/* note: the children property refers to the <Header /> aka the navbar */}
const MaybeShowNavBar = ({children} : {children:React.ReactNode}) =>{
    const location = useLocation();

    const[showNavBar, setShowNavBar] = useState(false)

    useEffect(() => {
        console.log("location:", location)
        if(location.pathname === '/login' 
         || location.pathname === '/register'){
         setShowNavBar(false)
         }
        else{
            setShowNavBar(true)
        }
    }, [location])

    return(
        <div>{showNavBar && children}</div>
    )


}

export default MaybeShowNavBar;

