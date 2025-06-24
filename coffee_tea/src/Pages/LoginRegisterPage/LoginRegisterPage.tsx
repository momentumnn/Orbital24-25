import React from "react";
import { useNavigate } from "react-router-dom";
import "./LoginRegisterPage.css"
import thumbnail from "../../Assets/LoginRegisterPageThumbnail.avif"
import ReviewCard from "../../Components/ReviewCard";


function LoginRegisterPage() {

    let navigate = useNavigate();

    const register = () => {
        let path = '/Register';
        navigate(path);
    }

    const login = () => {
        let path = '/Login';
        navigate(path);
    }


    return (

        <div className="landing-container">
            <div className="landing-hero">
                <div className="landing-hero-title">Cafe Planner</div>
            </div>
            <div className="landing-body">
                <div className="text-container">
                    <h1 > Don't have an account yet? </h1>
                    <div className="register">
                        <p>Join the Community!</p>
                        <button onClick={register}>Sign up NOW!</button>
                    </div>
                    <div className="login">
                        <p>Already have an account login </p>
                        <button onClick={login}>Login with us</button>
                    </div>
                </div>
                <div className="image-container">
                    <img className="img" src={thumbnail} alt="LoginRegisterPageThumbnail" />
                </div>
            </div>


        </div>

    );


}

export default LoginRegisterPage;