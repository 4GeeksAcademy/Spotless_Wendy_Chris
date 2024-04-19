import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { AppContext } from "../layout";
import { BrowserRouter, Route, Routes, Link, useNavigate } from "react-router-dom";
import { Ratings } from "./ratings";
import { StaticRating } from "./staticrating";

export const HHistory = () => {

    const [localRating, setLocalRating] = useState(0)

    const { store, actions } = useContext(Context);
    const { currentUser, myProperties, setMyProperties,
        setCurrentUser, token, setToken, role, setRole,
        myListings, setMyListings, filterListings, setFilterListings,
    } = useContext(AppContext);

    const [hHistory, setHHistory] = useState([""]);


    const navigate = useNavigate();

    // fetch and set all properties to myProperties on load below
    useEffect(() => {

        fetch(process.env.BACKEND_URL + "api/user/" + currentUser.id + "/property/all")
            .then(res => {
                if (!res.ok) throw Error(res.statusText);
                return res.json();
            })
            .then(response => {
                console.log("Property all fetch response:")
                console.log(response)
                let newArray = [...response];
                let finalProperty = [];

                newArray.forEach((el) => {
                    let each_property = {};
                    let all_img = el.img.split("  ");

                    each_property = { ...el };
                    each_property.image1 = all_img[0];
                    each_property.image2 = all_img[1];
                    each_property.image3 = all_img[2];
                    finalProperty.push(each_property);
                })
                setMyProperties(finalProperty);
            })
            .catch(error => console.log(error));
    }, []);


    //   fetch all listings via schedule and store in hHistory below 
    useEffect(() => {

        fetch(process.env.BACKEND_URL + `api/user/${currentUser.id}/schedule/history`)
            .then(res => {
                if (!res.ok) throw Error(res.statusText);
                return res.json();
            })
            .then(responseAsJson => {
                let newArray = [...responseAsJson];
                let formatted_schedule = [];

                newArray.forEach((el) => {
                    let each_schedule = {};
                    each_schedule = el;
                    let all_img = el.img.split("  ");
                    each_schedule.image1 = all_img[0];
                    formatted_schedule.push(each_schedule);

                })

                console.log("HHistory response for schedule from backend:")

                setHHistory(formatted_schedule)

            })


            .catch(error => console.log(error));

    }, []);


    const getHostHistory = () => {
        fetch(process.env.BACKEND_URL + `api/user/${currentUser.id}/schedule/history`)
            .then(res => {
                if (!res.ok) throw Error(res.statusText);
                return res.json();
            })
            .then(responseAsJson => {
                let newArray = [...responseAsJson];
                let formatted_schedule = [];

                newArray.forEach((el) => {
                    let each_schedule = {};
                    each_schedule = el;
                    let all_img = el.img.split("  ");
                    each_schedule.image1 = all_img[0];
                    formatted_schedule.push(each_schedule);

                })

                setHHistory(formatted_schedule);
                console.log("HHistory response for host from backend: ")
                setHHistory(formatted_schedule);

            })


            .catch(error => console.log(error));

    }


    // submit rating below

    const handleSubmitRating = (id, worker_id) => {

        fetch(process.env.BACKEND_URL + `api/schedule/${id}/review/new`, {
            method: 'PUT',
            body: JSON.stringify(
                {
                    "worker_id": worker_id,
                    "score": localRating
                }

            ), // data can be a 'string' or an {object} which comes from somewhere further above in our application
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (!res.ok) throw Error(res.statusText);
                return res.json();
            })
            .then(response => {
                console.log('Success:', response);

            })
            .then(() => getHostHistory())
            .then(() => setLocalRating(0))

            .catch(error => console.error(error));


    }



    // Match property_id from myListingslistings with property Ids from myProperties and create new array of objects
    // for listings below




    return (
        <div>
            <div className="row mt-2 mb-5">
                <div className="col-12">

                    {
                        hHistory.length >= 1 ?
                            hHistory.map((elm, index) => {
                                return (
                                    <div key={elm.id}>
                                        <div className="payments_div mt-2">
                                            <div className="row d-flex  justify-content-between">
                                                <div className="col-2">
                                                    <img src={elm.image1} className="img_payments" />
                                                </div>
                                                <div className="col-10">
                                                    <div className="row">
                                                        <div className="col-4 pt-2 fs-5">
                                                            <h4>{elm.name}</h4>
                                                        </div>
                                                        <div className="col-5 pt-1 text-center">
                                                            <span>Date: {elm.date_needed}</span>
                                                        </div>
                                                        <div className="col-3 pt-1">
                                                            <h4>Paid ${elm.rate} in full</h4>
                                                        </div>
                                                        <div className="row pt-3"
                                                            style={elm.review <= 0 ? { display: "block" }
                                                                : { display: "none" }}
                                                        >
                                                            <div className="col-12 text-center">
                                                                <Ratings
                                                                    setLocalRating={setLocalRating}
                                                                    localRating={localRating} />
                                                                <span className="button-24 ms-5"
                                                                    onClick={() => {
                                                                        handleSubmitRating(elm.id,
                                                                            elm.worker_id
                                                                        )
                                                                    }}
                                                                >Submit Rating</span>
                                                            </div>
                                                        </div>
                                                        <div className="row pt-3 text-light text-center"
                                                            style={elm.review >= 1 ? { display: "block" }
                                                                : { display: "none" }}
                                                        >
                                                            <div className="col-12 fs-3">
                                                                You rated this job: <StaticRating
                                                                    rating={elm.review}
                                                                />
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) : <div>You have no listing history</div>


                    }

                </div>
            </div>
        </div >
    )
}