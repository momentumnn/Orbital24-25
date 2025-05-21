import React from "react";
import { Link } from "react-router-dom";


function LoginRegisterPage(){
    return (
        <>
        <div> This tempo to navigate between the login and register pages</div>
        <Link to = "/Login">Login</Link>
        
        <Link to = "/Register">Register</Link>
        </>
    );
        
    
}

export default LoginRegisterPage;