import React, { useContext, useState, useEffect } from "react";
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
import { WSchedule } from "./wschedule";
import { MyPayments } from "../component/mypayments";
import { WHistory } from "./whistory";
import { HostHistory } from "../component/hosthistory";
import { WorkerProfile } from "../component/workerprofile";
import { HHistory } from "../component/hhistory";

export const Landing = () => {





    const { currentUser, setCurrentUser, token, setToken, role, setRole,
        myProperties, setMyProperties,
        display, setDisplay, filterListings, setFilterListings,
        menu, setMenu, myListings, setMyListings

    } = useContext(AppContext);

    const navigate = useNavigate();

    useEffect(() => {
        setRole(currentUser.role)
        setDisplay("listings")
    }, []);



    const { store, actions } = useContext(Context);
    const [userU, setUserU] = useState('')
    const [userE, setUserE] = useState('')
    const [userP, setUserP] = useState('')
    const [signupEffect, setSignupEffect] = useState('')




    if (currentUser) {
        if (currentUser.email.includes("@")) {
            var trunc_email = currentUser.email.split("@")
            var name = trunc_email[0]
        }
        else {
            var name = currentUser.email
        }

    }

    const handleUser = () => {
        setRole("User")

    }

    const handleWorker = () => {
        setRole("Worker")

    }


    const scheduledPaymentDue = myListings.filter((elm) => elm.status == "Scheduled");
    console.log("scheduledPayment Due filter results:")
    console.log(scheduledPaymentDue)
    console.log("Status result:")
    console.log(filterListings)





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
                                onClick={() => {
                                    setDisplay("payments")
                                    setMenu("payments")
                                }
                                }
                            >My Payments</div>
                        </div>
                    </div>
                    {/* End left navigation for "User" start main body of landing dashboard for "User" */}
                    {/* Listings Body below  */}
                    <div className="col-10 text-center dashComponents fs-3"
                        style={menu == "listings" ? { display: "block" } : { display: "none" }}
                    >
                        <div className="row d-flex justify-content-center pt-1 mb-2">
                            <div className="col-3 ps-5">
                                <span className="paymentAlert ms-5"
                                    style={scheduledPaymentDue.length >= 1 ? { display: "block" } : { display: "none" }}
                                    onClick={() => {
                                        setDisplay("payments")
                                        setMenu("payments")
                                    }
                                    }

                                >
                                    <i class="fa-solid fa-bell fa-shake px-1 fs-3"></i>{scheduledPaymentDue.length}
                                </span>
                            </div>
                            <div className="col-6"
                            >My Listings</div>
                            <div className="col-3">
                                <div className="dropdown">
                                    <button className="btn button-24 dropdown-toggle me-3 mt-1" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        Filter Listings
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li className="myListLink"
                                            onClick={() => setFilterListings("Active")}
                                        >Status Pairing</li>
                                        <li className="myListLink"
                                            onClick={() => setFilterListings("Scheduled")}
                                        >Status Scheduled</li>
                                        <li className="myListLink"
                                            onClick={() => setFilterListings("Complete")}
                                        >Status Complete</li>
                                    </ul>
                                </div>


                            </div>
                        </div>
                        <div className="col-12">
                            <MyListings />
                        </div>
                    </div>
                    {/* Properties body for "User" below  */}
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

                    {/* Profile Body for "User" below  */}
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

                    {/* History body for "User" Below  */}
                    <div className="col-10 text-center dashComponents fs-3"
                        style={menu == "history" ? { display: "block" } : { display: "none" }}
                    >
                        <div className="row d-flex justify-content-center pt-1 mb-2">
                            <div className="col-3"></div>
                            <div className="col-6">My History</div>
                            <div className="col-3"></div>
                        </div>
                        <div><HHistory /></div>

                    </div>

                    {/* Payments Body for "User" Below  */}
                    <div className="col-10 text-center dashComponents fs-3"
                        style={menu == "payments" ? { display: "block" } : { display: "none" }}
                    >
                        <div className="row d-flex justify-content-center pt-1 mb-2">
                            <div className="col-3"></div>
                            <div className="col-6">My Payments</div>
                            <div className="col-3"></div>
                        </div>
                        <div
                            style={display == "payments" ? { display: "block" } : { display: "none" }}
                        ><MyPayments /></div>
                        <div
                            style={display == "paymentHistory" ? { display: "block" } : { display: "none" }}
                        >Payment History Will Go Here</div>
                    </div>
                </div>
            </div>

            {/* ///////////////////////////////////////////////////////////////////////////////////////////////////  */}
            {/*                         The div below conditionally renders the "Worker" dashboard          */}
            {/* ///////////////////////////////////////////////////////////////////////////////////////////////////  */}

            <div style={role == "Worker" ? { display: "block" } : { display: "none" }}>
                <div className="row d-flex justify-content-center pt-3">
                    <div className="col-2 text-center">
                        <div className="row">
                            <div className={`col-12 border-bottom border-dark
                            ${menu == "listings" ? "activeMenu" : "myMenu"}`}
                                onClick={() => {
                                    setDisplay("listings")
                                    setMenu("listings")
                                }}
                            ><i class="fa-solid fa-house"></i></div>
                            <div className={`col-12 border-bottom border-dark
                            ${menu == "mySchedule" ? "activeMenu" : "myMenu"}`}
                                onClick={() => {
                                    setDisplay("mySchedule")
                                    setMenu("mySchedule")
                                }}
                            >My Schedule</div>
                            <div className={`col-12 border-bottom border-dark
                            ${menu == "myProfile" ? "activeMenu" : "myMenu"}`}
                                onClick={() => {
                                    setDisplay("myProfile")
                                    setMenu("myProfile")
                                }}
                            >My Profile</div>
                            <div className={`col-12 border-bottom border-dark
                            ${menu == "history" ? "activeMenu" : "myMenu"}`}
                                onClick={() => {
                                    setDisplay("history")
                                    setMenu("history")
                                }}
                            >My Work History</div>
                        </div>
                    </div>

                    {/* End left navigation for "Worker" start main body of landing dashboard for "Worker" */}
                    {/* Listings Body "WorkerDashboard" below  */}
                    <div className="col-10 text-center dashComponents fs-3"
                        style={menu == "listings" ? { display: "block" } : { display: "none" }}
                    >
                        <div className="row d-flex justify-content-center pt-1 mb-2">
                            <div className="col-3"></div>
                            <div className="col-6">Available Jobs</div>
                            <div className="col-3"></div>
                        </div>
                        <div
                            style={display == "listings" ? { display: "block" } : { display: "none" }}
                        ><WDashboard /></div>
                    </div>

                    {/* Worker Schedule Body Below  */}
                    <div className="col-10 text-center dashComponents fs-3"
                        style={menu == "mySchedule" ? { display: "block" } : { display: "none" }}
                    >
                        <div className="row d-flex justify-content-center pt-1 mb-2">
                            <div className="col-3"></div>
                            <div className="col-6">My Schedule</div>
                            <div className="col-3"></div>
                        </div>
                        <div
                            style={display == "mySchedule" ? { display: "block" } : { display: "none" }}
                        ><WSchedule /></div>
                    </div>




                    {/* Worker Profile Body Below  */}
                    <div className="col-10 text-center dashComponents fs-3"
                        style={menu == "myProfile" ? { display: "block" } : { display: "none" }}
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
                                >Back to My Profile</span></div>
                        </div>
                        <div
                            style={display == "editProfile" ? { display: "block" } : { display: "none" }}
                        ><EditProfile /></div>
                        <div
                            style={display == "myProfile" ? { display: "block" } : { display: "none" }}
                        ><WorkerProfile /></div>
                    </div>

                    {/* Worker History Body Below  */}
                    <div className="col-10 text-center dashComponents fs-3"
                        style={menu == "history" ? { display: "block" } : { display: "none" }}                    >
                        <div className="row d-flex justify-content-center pt-1 mb-2">
                            <div className="col-3"></div>
                            <div className="col-6">My Work History</div>
                            <div className="col-3">
                            </div>
                        </div>
                        <div><WHistory /></div>

                    </div>
                </div>
            </div >

        </>
    );
};