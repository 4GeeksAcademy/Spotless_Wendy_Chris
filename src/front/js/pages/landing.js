import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import logo from "../../img/logo_1.png";
import "../../styles/home.css";
import "../../styles/colortest.css";
import "../../styles/index.css"

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
import { PaymentHistory } from "../component/paymenthistory";
import { WHistory } from "./whistory";
import { HostHistory } from "../component/hosthistory";
import { WorkerProfile } from "../component/workerprofile";
import { HHistory } from "../component/hhistory";
import { Header } from "../component/header";
import { Footer } from "../component/footer";

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

            {/* The div below conditionally renders the "User" dashboard */}
            <div className=" landing_user_o" style={role == "User" ? { display: "block" } : { display: "none" }}>
                <div className="row d-flex justify-content-center pt-3">
                    <div className="col-2 text-center">
                        <div className="row">
                            {/* <div className="col-12 border-bottom border-dark activeMenu ">
                                <img src={logo} class="logo1" />
                            </div> */}
                            <div className={`col-12 border-bottom border-dark activeMenu'
                            ${menu == "listings" ? "activeMenu" : "myMenu2"}`}
                                onClick={() => {
                                    setMenu("listings");
                                    setDisplay("listings");
                                    setFilterListings("Active");
                                }}
                            >
                                {/* <i class="fa-solid fa-house"></i> */}
                                <img src={logo} class="logo1" />

                            </div>
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
                            <div className={`col-12 border-bottom border-dark mt-5 mb-5 myMenu`}
                                onClick={() => {
                                    localStorage.clear();
                                    setCurrentUser({});
                                    setDisplay("");
                                    setMenu("listings");
                                    navigate("/")
                                }}
                            >Logout
                                <span clasname>
                                    <i class="fa-solid fa-arrow-right-from-bracket rotate ms-3"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* End left navigation for "User" start main body of landing dashboard for "User" */}
                    {/* Listings Body below  */}
                    <div className="col-10 text-center dashComponents fs-3 pt-3"
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
                                    <i className="fa-solid fa-bell fa-shake px-1 fs-3 text-light"></i>
                                    <span className="supTest">{scheduledPaymentDue.length}</span>
                                </span>
                            </div>
                            <div className="col-6"
                            ><h3>My Listings</h3></div>
                            <div className="col-3">
                                {/* <div className="dropdown">
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
                                </div> */}


                            </div>
                        </div>
                        <div className="col-12"><Header /></div>
                        <div className="col-12">
                            <MyListings />
                        </div>
                    </div>
                    {/* Properties body for "User" below  */}
                    <div className="col-10 text-center dashComponents fs-3 pt-3"
                        style={menu == "properties" ? { display: "block" } : { display: "none" }}
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
                                    <i className="fa-solid fa-bell fa-shake px-1 fs-3 text-light"></i>
                                    <span className="supTest">{scheduledPaymentDue.length}</span>
                                </span>
                            </div>
                            <div className="col-6"><h2>My Properties</h2></div>
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
                            <div className="col-12 pt-3"
                                style={display == "propMain" ? { display: "block" } : { display: "none" }}
                            ><Dashboard /></div>
                        </div>
                    </div>

                    {/* Profile Body for "User" below  */}
                    <div className="col-10 text-center dashComponents fs-3 pt-3"
                        style={menu == "profile" ? { display: "block" } : { display: "none" }}
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
                                    <i className="fa-solid fa-bell fa-shake px-1 fs-3 text-light"></i>
                                    <span className="supTest">{scheduledPaymentDue.length}</span>
                                </span>
                            </div>
                            <div className="col-6"><h2>My Profile</h2></div>
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
                    <div className="col-10 text-center dashComponents fs-3 pt-3"
                        style={menu == "history" ? { display: "block" } : { display: "none" }}
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
                                    <i className="fa-solid fa-bell fa-shake px-1 fs-3 text-light"></i>
                                    <span className="supTest">{scheduledPaymentDue.length}</span>
                                </span>
                            </div>
                            <div className="col-6"><h2>My History</h2></div>
                            <div className="col-3"></div>
                        </div>
                        <div><HHistory /></div>

                    </div>

                    {/* Payments Body for "User" Below  */}
                    <div className="col-10 text-center dashComponents fs-3 pt-3"
                        style={menu == "payments" ? { display: "block" } : { display: "none" }}
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
                                    <i className="fa-solid fa-bell fa-shake px-1 fs-3 text-light"></i>
                                    <span className="supTest">{scheduledPaymentDue.length}</span>
                                </span>
                            </div>
                            <div className="col-6"><h2>My Payments</h2></div>
                            <div className="col-3"><span className="button-24 me-3 mt-1"
                                style={display == "payments" ? { display: "block" } : { display: "none" }}
                                onClick={() => setDisplay("paymentHistory")}
                            >Paymeny History</span>
                                <span className="button-24 me-3 mt-1"
                                    style={display == "paymentHistory" ? { display: "block" } : { display: "none" }}
                                    onClick={() => setDisplay("payments")}
                                >Make Payments</span></div>
                        </div>
                        <div
                            style={display == "payments" ? { display: "block" } : { display: "none" }}
                        ><MyPayments /></div>
                        <div
                            style={display == "paymentHistory" ? { display: "block" } : { display: "none" }}
                        ><PaymentHistory /></div>
                    </div>
                </div>
                <Footer />
            </div>

            {/* ///////////////////////////////////////////////////////////////////////////////////////////////////  */}
            {/*                         The div below conditionally renders the "Worker" dashboard          */}
            {/* ///////////////////////////////////////////////////////////////////////////////////////////////////  */}

            <div style={role == "Worker" ? { display: "block" } : { display: "none" }}>
                <div className="row d-flex justify-content-center pt-3">
                    <div className="col-2 text-center">
                        <div className="row">
                            <div className={`col-12 border-bottom border-dark activeMenu'
                            ${menu == "listings" ? "activeMenu" : "myMenu2"}`}
                                onClick={() => {
                                    setMenu("listings");
                                    setDisplay("listings");
                                    setFilterListings("Active");
                                }}
                            >
                                {/* <i class="fa-solid fa-house"></i> */}
                                <img src={logo} class="logo1" />

                            </div>

                            <div className={`col-12 border-bottom border-dark
                            ${menu == "myProfile" ? "activeMenu" : "myMenu"}`}
                                onClick={() => {
                                    setDisplay("myProfile")
                                    setMenu("myProfile")
                                }}
                            >My Profile</div>
                            <div className={`col-12 border-bottom border-dark
                            ${menu == "mySchedule" ? "activeMenu" : "myMenu"}`}
                                onClick={() => {
                                    setDisplay("mySchedule")
                                    setMenu("mySchedule")
                                }}
                            >My Schedule</div>
                            <div className={`col-12 border-bottom border-dark mb-3
                            ${menu == "history" ? "activeMenu" : "myMenu"}`}
                                onClick={() => {
                                    setDisplay("history")
                                    setMenu("history")
                                }}
                            >My Work History</div>
                            <div className={`col-12 border-bottom border-dark mt-5 mb-5 myMenu`}
                                onClick={() => {
                                    localStorage.clear();
                                    setCurrentUser({});
                                    setDisplay("");
                                    setMenu("listings");
                                    navigate("/")
                                }}
                            >Logout
                                <span clasname>
                                    <i class="fa-solid fa-arrow-right-from-bracket rotate ms-3"></i>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* End left navigation for "Worker" start main body of landing dashboard for "Worker" */}
                    {/* Listings Body "WorkerDashboard" below  */}
                    <div className="col-10 text-center dashComponents fs-3 pt-3"
                        style={menu == "listings" ? { display: "block" } : { display: "none" }}
                    >
                        <div className="row d-flex justify-content-center pt-1 mb-2">
                            <div className="col-3"></div>
                            <div className="col-6">Available Jobs</div>
                            <div className="col-3"></div>
                        </div>
                        <div
                            style={display == "listings" ? { display: "block" } : { display: "none" }}
                        >
                            {/* Add logic for when there are no avaible listings here or in WDashboard  */}
                            <WDashboard /></div>
                    </div>

                    {/* Worker Profile Body Below  */}
                    <div className="col-10 text-center dashComponents fs-3 pt-3"
                        style={menu == "myProfile" ? { display: "block" } : { display: "none" }}
                    >
                        <div className="row d-flex justify-content-center pt-1 mb-2">
                            <div className="col-3"></div>
                            <div className="col-6"><h2>My Profile</h2></div>
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


                    {/* Worker Schedule Body Below  */}
                    <div className="col-10 text-center dashComponents fs-3 pt-3"
                        style={menu == "mySchedule" ? { display: "block" } : { display: "none" }}
                    >
                        <div className="row d-flex justify-content-center pt-1 mb-2">
                            <div className="col-3"></div>
                            <div className="col-6"><h2>My Schedule</h2></div>
                            <div className="col-3"></div>
                        </div>
                        <div
                            style={display == "mySchedule" ? { display: "block" } : { display: "none" }}
                        ><WSchedule /></div>
                    </div>






                    {/* Worker History Body Below  */}
                    <div className="col-10 text-center dashComponents fs-3 pt-3"
                        style={menu == "history" ? { display: "block" } : { display: "none" }}                    >
                        <div className="row d-flex justify-content-center pt-1 mb-2">
                            <div className="col-3"></div>
                            <div className="col-6"><h2>My Work History</h2></div>
                            <div className="col-3">
                            </div>
                        </div>
                        <div><WHistory /></div>

                    </div>
                </div>
                <Footer />
            </div >

        </>
    );
};