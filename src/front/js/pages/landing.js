import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

import { useNavigate } from "react-router-dom";
import { AppContext } from "../layout";
import { AddProperty } from "../component/add_prop";





export const Landing = () => {
    const { currentUser, setCurrentUser, token, setToken, role, setRole } = useContext(AppContext);

    const navigate = useNavigate();



    const { store, actions } = useContext(Context);
    const [userU, setUserU] = useState('')
    const [userE, setUserE] = useState('')
    const [userP, setUserP] = useState('')
    const [signupEffect, setSignupEffect] = useState('')

    const [menu, setMenu] = useState('listings')

    const [displayAddProperty, setDisplayAddProperty] = useState(false)



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
                    <div className="col text-center fs-3 pt-2 border-bottom"
                        style={role == "User" ? { display: "block" } : { display: "none" }}
                    >Main User Dashboard</div>
                    <div className="col text-center fs-3 pt-2 border-bottom"
                        style={role == "Worker" ? { display: "block" } : { display: "none" }}
                    >Main Worker Dashboard</div>
                </div>
                {/* The div below conditionally renders the "User" dashboard */}
                <div style={role == "User" ? { display: "block" } : { display: "none" }}>
                    <div className="row d-flex justify-content-center pt-3">
                        <div className="col-2 text-center">
                            <div className="row">
                                <div className={`col-12 border-bottom border-dark
                            ${menu == "listings" ? "activeMenu" : "myMenu"}`}
                                    onClick={() => setMenu("listings")}
                                ><i class="fa-solid fa-house"></i></div>
                                <div className={`col-12 border-bottom border-dark
                            ${menu == "properties" ? "activeMenu" : "myMenu"}`}
                                    onClick={() => setMenu("properties")}
                                >My Properties</div>
                                <div className={`col-12 border-bottom border-dark
                            ${menu == "profile" ? "activeMenu" : "myMenu"}`}
                                    onClick={() => setMenu("profile")}
                                >My Profile</div>
                                <div className={`col-12 border-bottom border-dark
                            ${menu == "history" ? "activeMenu" : "myMenu"}`}
                                    onClick={() => setMenu("history")}
                                >My History</div>
                                <div className={`col-12 border-bottom border-dark
                            ${menu == "payments" ? "activeMenu" : "myMenu"}`}
                                    onClick={() => setMenu("payments")}
                                >My Payments</div>
                            </div>

                        </div>
                        <div className="col-10 text-center dashComponents fs-3"
                            style={menu == "listings" ? { display: "block" } : { display: "none" }}
                        >My Active Listings
                            <p>Map all active listings</p>
                            <p>Green = Listing has booked worker</p>
                            <p>Yellow = Listing is active and looking for worker</p>
                            <p>Red = Listing is about to run out of time and needs emergency boost</p>
                        </div>
                        <div className="col-10 text-center dashComponents fs-3"
                            style={menu == "properties" ? { display: "block" } : { display: "none" }}
                        >
                            <div className="row d-flex justify-content-center pt-1">
                                <div className="col-3"></div>
                                <div className="col-6">My Properties</div>
                                <div className="col-3"><span className="myButton2 me-3"
                                    style={displayAddProperty ? { display: "none" } : { display: "block" }}
                                    onClick={() => setDisplayAddProperty(!displayAddProperty)}
                                >Add new property</span>
                                    <span className="myButton2 me-3"
                                        style={displayAddProperty ? { display: "block" } : { display: "none" }}
                                        onClick={() => setDisplayAddProperty(!displayAddProperty)}
                                    >Back to properties</span></div>
                                <div className="col-12"
                                    style={displayAddProperty ? { display: "block" } : { display: "none" }}
                                ><AddProperty /></div>
                            </div>
                        </div>
                        <div className="col-10 text-center dashComponents fs-3"
                            style={menu == "profile" ? { display: "block" } : { display: "none" }}
                        >My Profile
                            <div>Email: {currentUser.email}</div>
                        </div>
                        <div className="col-10 text-center dashComponents fs-3"
                            style={menu == "history" ? { display: "block" } : { display: "none" }}
                        >My History
                        </div>
                        <div className="col-10 text-center dashComponents fs-3"
                            style={menu == "payments" ? { display: "block" } : { display: "none" }}
                        >My Payments
                        </div>


                    </div>
                </div>
                {/* The div below conditionally renders the "Worker" dashboard */}
                <div style={role == "Worker" ? { display: "block" } : { display: "none" }}>
                    <div className="row d-flex justify-content-center pt-3">
                        <div className="col-2 text-center">
                            <div className="row">
                                <div className={`col-12 border-bottom border-dark
                            ${menu == "listings" ? "activeMenu" : "myMenu"}`}
                                    onClick={() => setMenu("listings")}
                                ><i class="fa-solid fa-house"></i></div>
                                <div className={`col-12 border-bottom border-dark
                            ${menu == "properties" ? "activeMenu" : "myMenu"}`}
                                    onClick={() => setMenu("properties")}
                                >My Properties</div>
                                <div className={`col-12 border-bottom border-dark
                            ${menu == "profile" ? "activeMenu" : "myMenu"}`}
                                    onClick={() => setMenu("profile")}
                                >My Profile</div>
                                <div className={`col-12 border-bottom border-dark
                            ${menu == "history" ? "activeMenu" : "myMenu"}`}
                                    onClick={() => setMenu("history")}
                                >My History</div>
                                <div className={`col-12 border-bottom border-dark
                            ${menu == "payments" ? "activeMenu" : "myMenu"}`}
                                    onClick={() => setMenu("payments")}
                                >My Payments</div>
                            </div>

                        </div>
                        <div className="col-10 text-center dashComponents fs-3"
                            style={menu == "listings" ? { display: "block" } : { display: "none" }}
                        >Available listings will populate and filter below
                        </div>
                        <div className="col-10 text-center dashComponents fs-3"
                            style={menu == "properties" ? { display: "block" } : { display: "none" }}
                        >My Properties
                        </div>
                        <div className="col-10 text-center dashComponents fs-3"
                            style={menu == "profile" ? { display: "block" } : { display: "none" }}
                        >My Profile
                        </div>
                        <div className="col-10 text-center dashComponents fs-3"
                            style={menu == "history" ? { display: "block" } : { display: "none" }}
                        >My History
                        </div>
                        <div className="col-10 text-center dashComponents fs-3"
                            style={menu == "payments" ? { display: "block" } : { display: "none" }}
                        >My Payments
                        </div>
                    </div>
                </div>


            </div >

        </>
    );
};