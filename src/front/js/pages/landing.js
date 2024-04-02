import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

import { useNavigate } from "react-router-dom";
import { AppContext } from "../layout";





export const Landing = () => {
    const { currentUser, setCurrentUser, token, setToken, role, setRole } = useContext(AppContext);

    const navigate = useNavigate();



    const { store, actions } = useContext(Context);
    const [userU, setUserU] = useState('')
    const [userE, setUserE] = useState('')
    const [userP, setUserP] = useState('')
    const [signupEffect, setSignupEffect] = useState('')



    if (currentUser) {
        var trunc_email = currentUser.email.split("@")
        var name = trunc_email[0]
    }

    const handleUser = () => {
        setRole("User")

    }

    const handleWorker = () => {
        setRole("Worker")

    }




    return (
        <>
            <div className="row d-flex justify-content-center py-3">
                <div className="col text-center">
                    <h3>Hello {name}!</h3>
                </div>
            </div>
            <div className="row d-flex justify-content-around pt-3">
                <div className="col-6">
                    <span className="myButton1 text-center fs-7"
                        onClick={() => handleUser()}
                    >Click to be User</span>
                </div>
                <div className="col-6">
                    <span className="myButton1 text-center fs-7"
                        onClick={() => handleWorker()}
                    >Click to be Worker</span>
                </div>
                <div className="row d-flex justify-content-center pt-3">
                    <div className="col-7 text-center fs-3 pt-2"
                        style={role == "User" ? { display: "block" } : { display: "none" }}
                    >Welcome User!</div>
                    <div className="col-7 text-center fs-3 pt-2"
                        style={role == "Worker" ? { display: "block" } : { display: "none" }}
                    >Welcome Worker!</div>
                </div>


            </div>

        </>
    );
};