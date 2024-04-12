import React from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../layout";

import { StaticRating } from "./staticrating";


export const WorkerProfile = () => {
    const { currentUser, setCurrentUser, token, setToken, role, setRole } = useContext(AppContext);
    const navigate = useNavigate();

    const [tempF, setTempF] = useState('');
    const [tempP, setTempP] = useState('');
    const [tempE, setTempE] = useState('');

    const [tempPA, setTempPA] = useState('');
    const [tempNPA, setTempNPA] = useState('');



    useEffect(() => {
        setTempE(currentUser.email);
        setTempF(currentUser.full_name);
        setTempP(currentUser.phone);

    }, []);



    function get_full_name(val) {

        setTempF(val.target.value);
    }

    function get_phone(val) {
        setTempP(val.target.value);
    }



    function get_email(val) {
        setTempE(val.target.value);
    }

    function get_current_password(val) {
        setTempPA(val.target.value);
    }

    function get_new_password(val) {
        setTempNPA(val.target.value);
    }



    function cancel_update_function() {
        setTempE('');
        setTempP('');
        setTempF('');
        setTempPA('');
        setTempNPA('');
    }

    function save_update_function() {
        let current_role = "user";
        //let current_role= currentUser.role;


        if (tempF.length > 5 && tempE.length > 5 && tempP.length > 8) {

            let testObj = {
                full_name: tempF,
                email: tempE,
                phone: tempP,
                role: current_role,
                password: tempPA,
                new_password: tempNPA

            }

            setTempE('');
            setTempP('');
            setTempF('');
            setTempPA('');
            setTempNPA('');

            let url_enpoint = "/api/update/profile/" + currentUser.id;

            fetch(process.env.BACKEND_URL + url_enpoint, {
                method: 'PUT',
                body: JSON.stringify(testObj),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    if (!res.ok) throw Error(res.statusText);
                    return res.json();
                })
                .then(response => console.log('This is the response from backend :', response))
                .catch(error => console.error(error));
        }

        else {
            alert('Something is missing');
        }

    }

    return (
        <div className="row my-5">
            <div className="col-7">
                <div className="row ms-2 mb-5">
                    <div className="col-12 text-start ps-1 pb-4">
                        Full Name:<span className="ps-3">{currentUser.full_name}</span>
                    </div>
                    <div className="col-12 text-start ps-1  pb-4">
                        Rating:<span className="ps-3">
                            <StaticRating
                                rating={currentUser.rating}
                            /></span>
                    </div>
                    <div className="col-12 text-start ps-1  pb-4">
                        Email: <span className="ps-3">{currentUser.email}</span>
                    </div>
                    <div className="col-12 text-start ps-1  pb-4">
                        Phone: <span className="ps-3">{currentUser.phone}</span>
                    </div>
                </div>
            </div>
            <div className="col-5">
                <div className="row d-flex justify-content-start">
                    <div className="col">
                        <img
                            className="profilePic"
                            src={`${currentUser.img}`} />
                    </div>
                </div>
            </div>
        </div>
    );
};