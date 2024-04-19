import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Login } from "./pages/login";
import { Single } from "./pages/single";
import { Landing } from "./pages/landing";
import { Dashboard } from "./pages/dashboard";
import { WSchedule } from "./pages/wschedule";
import { StaticProfile } from "./component/staticprofile";
import { Ratings } from "./component/ratings";
import { MyPayments } from "./component/mypayments";
import { HostHistory } from "./component/hosthistory";
import { HHistory } from "./component/hhistory";
import { StaticRating } from "./component/staticrating";
import { Header } from "./component/header";

import { ColorTest } from "./pages/colortest";

import { WDashboard } from "./pages/workerdashboard";
import { EditProfile } from "./pages/editprofile";

import { MyListings } from "./component/mylistings";
import { WHistory } from "./pages/whistory";


import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { useState } from "react";
import { AddProperty } from "./component/add_prop";
import { History } from "./component/history";
import { Faq } from "./pages/faq";
import "../styles/home.css";
import { TestSlide } from "./component/testslide";



export const AppContext = React.createContext(null);



//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";


    const [menu, setMenu] = useState('listings')
    const [myWHistory, setMyWHistory] = useState([]);
    const [myListings, setMyListings] = useState([])
    const [workerListings, setWorkerListings] = useState([])
    const [display, setDisplay] = useState("")
    const [myProperties, setMyProperties] = useState([])
    const [filterListings, setFilterListings] = useState("Active")
    const [mySchedule, setMySchedule] = useState([]);
    const [currentUser, setCurrentUser] = useState({})



    const [role, setRole] = useState("")

    const [token, setToken] = useState("")


    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (<>

        <div class='layout_div'>
            {/* Export global variables below */}
            <AppContext.Provider value={
                {
                    currentUser, setCurrentUser, token, setToken,
                    myListings, setMyListings, myProperties, setMyProperties,
                    role, setRole, display, setDisplay, filterListings, setFilterListings,
                    workerListings, setWorkerListings, menu, setMenu, mySchedule, setMySchedule,
                    myWHistory, setMyWHistory
                }
            }>
                <BrowserRouter basename={basename}>
                    <ScrollToTop>
                        <Routes>
                            <Route element={<Login />} path="/" />
                            <Route element={<Home />} path="/home" />
                            <Route element={<Faq />} path="/faq" />
                            <Route element={<Dashboard />} path="/dashboard" />
                            <Route element={<HHistory />} path="/hhistory" />
                            <Route element={<WDashboard />} path="/wdashboard" />
                            <Route element={<WSchedule />} path="/wschedule" />
                            <Route element={<TestSlide />} path="/testslide" />
                            <Route element={<EditProfile />} path="/editprofile" />
                            <Route element={<Landing />} path="/landing" />
                            <Route element={<Ratings />} path="ratings" />
                            <Route element={<StaticRating />} path="staticrating" />
                            <Route element={<WHistory />} path="/whistory" />
                            <Route element={<MyListings />} path="/mylistings" />
                            <Route element={<MyPayments />} path="/mypayments" />
                            <Route element={<AddProperty />} path="/addproperty" />
                            <Route element={<History />} path="/history" />
                            <Route element={<Demo />} path="/demo" />
                            <Route element={<Single />} path="/single/:theid" />
                            <Route element={<ColorTest />} path="/colortest" />
                            <Route element={<Header />} path="/header" />
                            <Route element={<h1>Not found!</h1>} />
                        </Routes>
                     
                    </ScrollToTop>
                </BrowserRouter>
            </AppContext.Provider>
        </div>
    </>
    );
};

export default injectContext(Layout);
