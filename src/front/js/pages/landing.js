import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

import { useNavigate } from "react-router-dom";
import { AppContext } from "../layout";
import { AddProperty } from "../component/add_prop";
import { Dashboard } from "./dashboard";
import { MyListings } from "../component/mylistings";
import { EditProfile } from "./editprofile";
import { StaticProfile } from "../component/staticprofile";
import { WDashboard } from "./workerdashboard";





export const Landing = () => {
    const { currentUser, setCurrentUser, token, setToken, role, setRole,
        display, setDisplay, filterListings, setFilterListings
    } = useContext(AppContext);

    const navigate = useNavigate();



    const { store, actions } = useContext(Context);
    const [userU, setUserU] = useState('')
    const [userE, setUserE] = useState('')
    const [userP, setUserP] = useState('')
    const [signupEffect, setSignupEffect] = useState('')

    const [menu, setMenu] = useState('listings')


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

                <div className="col-2">
                    <span className="myButton1 text-center fs-7"
                        onClick={() => handleUser()}
                    >Click to be User</span>
                </div>
                <div className="col-8 text-center">
                    <h3>Hello {name}!</h3>
                </div>
                <div className="col-2">
                    <span className="myButton1 text-center fs-7"
                        onClick={() => handleWorker()}
                    >Click to be Worker</span>
                </div>
            </div>
            <div className="row d-flex justify-content-center pt-3">
                <div className="col text-center border-bottom"
                    style={role == "User" ? { display: "block" } : { display: "none" }}
                >Main User Dashboard</div>
                <div className="col text-center border-bottom"
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
                                onClick={() => {
                                    setDisplay("propMain")
                                    setMenu("properties")
                                }
                                }
                            >My Properties</div>
                            <div className={`col-12 border-bottom border-dark
                            ${menu == "profile" ? "activeMenu" : "myMenu"}`}
                                onClick={() => {
                                    setDisplay("myProfile")
                                    setMenu("profile")
                                }
                                }
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
                    >
                        <div className="row d-flex justify-content-center pt-1 mb-2">
                            <div className="col-3"></div>
                            <div className="col-6"
                                style={filterListings == true ? { display: "block" } : { display: "none" }}
                            >My Pairing Listings</div>
                            <div className="col-6"
                                style={filterListings == false ? { display: "block" } : { display: "none" }}
                            >My Scheduled Listings</div>
                            <div className="col-6"
                                style={filterListings == "warning" ? { display: "block" } : { display: "none" }}
                            >My URGENT Listings</div>
                            <div className="col-3">
                                <div className="dropdown">
                                    <button className="btn button-24 dropdown-toggle me-3 mt-1" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        Filter Listings
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li className="myListLink"
                                            onClick={() => setFilterListings(true)}
                                        >Status Pairing</li>
                                        <li className="myListLink"
                                            onClick={() => setFilterListings(false)}
                                        >Status Scheduled</li>
                                        <li className="myListLink"
                                            onClick={() => setFilterListings("warning")}
                                        >Status Warning!</li>
                                    </ul>
                                </div>


                            </div>
                        </div>
                        <div className="col-12">
                            <MyListings />
                        </div>
                    </div>
                    <div className="col-10 text-center dashComponents fs-3"
                        style={menu == "properties" ? { display: "block" } : { display: "none" }}
                    >
                        <div className="row d-flex justify-content-center pt-1 mb-2">
                            <div className="col-3"></div>
                            <div className="col-6">My Properties</div>
                            <div className="col-3"><span className="button-24 me-3 mt-1"
                                style={display == "addProp" ? { display: "none" } : { display: "block" }}
                                onClick={() => setDisplay("addProp")}
                            >Add new property</span>
                                <span className="button-24 me-3 mt-1"
                                    style={display == "addProp" ? { display: "block" } : { display: "none" }}
                                    onClick={() => setDisplay("propMain")}
                                >Back to properties</span></div>
                            <div className="col-12"
                                style={display == "addProp" ? { display: "block" } : { display: "none" }}
                            ><AddProperty /></div>
                            <div className="col-12"
                                style={display == "propMain" ? { display: "block" } : { display: "none" }}
                            ><Dashboard /></div>
                        </div>
                    </div>
                    <div className="col-10 text-center dashComponents fs-3"
                        style={menu == "profile" ? { display: "block" } : { display: "none" }}
                    >
                        <div className="row d-flex justify-content-center pt-1 mb-2">
                            <div className="col-3"></div>
                            <div className="col-6">My Profile</div>
                            <div className="col-3"><span className="button-24 me-3 mt-1"
                                style={display == "myProfile" ? { display: "block" } : { display: "none" }}
                                onClick={() => setDisplay("editProfile")}
                            >Edit Profile</span>
                                <span className="button-24 me-3 mt-1"
                                    style={display == "editProfile" ? { display: "block" } : { display: "none" }}
                                    onClick={() => setDisplay("myProfile")}
                                >My Profile</span></div>
                        </div>
                        <div
                            style={display == "editProfile" ? { display: "block" } : { display: "none" }}
                        ><EditProfile /></div>
                        <div
                            style={display == "myProfile" ? { display: "block" } : { display: "none" }}
                        ><StaticProfile /></div>
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
                    ><WDashboard />
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

        </>
    );
};