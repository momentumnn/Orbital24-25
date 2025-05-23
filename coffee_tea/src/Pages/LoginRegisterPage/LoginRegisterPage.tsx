import React from "react";
import { useNavigate } from "react-router-dom";
import "./LoginRegisterPage.css"
import thumbnail from "../../Assets/LoginRegisterPageThumbnail.avif"
import ReviewCard from "../../Components/ReviewCard";


function LoginRegisterPage(){

    let navigate = useNavigate();

    const register = ()=>{

        let path = '/Register';
        navigate(path);
    }
    
    const login=()=>{
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

            <div className="landing-reviews-section">
                <h2 className="landing-section-title">Recent Reviews</h2>
                <div className="landing-reviews-container">
                    <ReviewCard
                        reviewText="A terrific piece of praise"
                        reviewerName="Name"
                        reviewerDescription="Description"
                    />
                    <ReviewCard
                        reviewText="A fantastic bit of feedback"
                        reviewerName="Name"
                        reviewerDescription="Description"
                    />
                    <ReviewCard
                        reviewText="A genuinely glowing review"
                        reviewerName="Name"
                        reviewerDescription="Description"
                    />
                </div>
            </div>


            <footer className="landing-footer">
                <div className="landing-footer-content">
                    <div className="landing-footer-logo">Site name</div>

                    <div className="landing-footer-social">
                        <i className="ti ti-brand-facebook"></i>
                        <i className="ti ti-brand-linkedin"></i>
                        <i className="ti ti-brand-youtube"></i>
                        <i className="ti ti-brand-instagram"></i>
                    </div>

                    <div className="landing-footer-links">
                        <div className="landing-footer-column">
                            <div className="landing-footer-topic">Topic</div>
                            <div className="landing-footer-page">Page</div>
                            <div className="landing-footer-page">Page</div>
                            <div className="landing-footer-page">Page</div>
                        </div>
                        <div className="landing-footer-column">
                            <div className="landing-footer-topic">Topic</div>
                            <div className="landing-footer-page">Page</div>
                            <div className="landing-footer-page">Page</div>
                            <div className="landing-footer-page">Page</div>
                        </div>
                        <div className="landing-footer-column">
                            <div className="landing-footer-topic">Topic</div>
                            <div className="landing-footer-page">Page</div>
                            <div className="landing-footer-page">Page</div>
                            <div className="landing-footer-page">Page</div>
                        </div>
                    </div>
                </div>
            </footer>

        </div>

    );
        
    
}

export default LoginRegisterPage;