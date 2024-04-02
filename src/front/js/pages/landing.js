import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

import { useNavigate } from "react-router-dom";
import { AppContext } from "../layout";





export const Landing = () => {
    const { user, setUser, token, setToken } = useContext(AppContext);

    const navigate = useNavigate();



    const { store, actions } = useContext(Context);
    const [userU, setUserU] = useState('')
    const [userE, setUserE] = useState('')
    const [userP, setUserP] = useState('')
    const [signupEffect, setSignupEffect] = useState('')




    function login_function() {


        // if (userE.length > 5 && userP.length >5) {

        let log_info = {
            email: userE,
            password: userP
        }

        fetch('https://crispy-computing-machine-x99vw9x6gvjf94v-3001.app.github.dev/token', {
            method: 'POST',
            body: JSON.stringify(log_info),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (!res.ok) console.log(res.statusText);
                return res.json();
            })
            .then(responseAsJson => {
                //context.setCurrentUser(response);
                // navigate('/home')
                console.log("This is the login response:")
                console.log(responseAsJson)
                setUser(responseAsJson)
                var token = responseAsJson.token
                setToken(token)

            })
            .then(() => {
                navigate('/')
            })
            .catch(error => console.log(error));

        // }

        // else {
        //     alert('Please enter a valid username and/or password')
        //     setUserE('')
        //     setUserP('')
        // }


    }


    function get_username(val) {
        let test = val.target.value;
        setUserU(test)
    }

    function get_email(val) {
        let test = val.target.value;
        setUserE(test)
    }

    function get_password(val) {
        let test = val.target.value;
        setUserP(test)
    }


    function sign_up_function() {
        const sign_up_panel = document.getElementById('container');
        sign_up_panel.classList.add('right-panel-active')
    }

    function sign_in_function() {
        const sign_in_panel = document.getElementById('container');
        sign_in_panel.classList.remove('right-panel-active');
    }

    if (user) {
        var trunc_email = user.email.split("@")
        var name = trunc_email[0]
    }


    return (
        <>
            <div className="row d-flex align-content-center pt-5">
                <h3>Hello {name}!</h3>
            </div>

        </>
    );
};