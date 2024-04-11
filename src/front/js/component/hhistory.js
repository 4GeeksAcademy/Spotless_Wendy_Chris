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
                    // console.log(all_img)
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
                console.log("response for listing from backend:")
                console.log(responseAsJson)
                setHHistory(responseAsJson)

            })


            .catch(error => console.log(error));

    }, []);

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
            .then(response => console.log('Success:', response))
            .catch(error => console.error(error));


    }



    // Match property_id from myListingslistings with property Ids from myProperties and create new array of objects
    // for listings below

    var listingArray = []

    myProperties.map((element) => {
        myListings.forEach((elm) => {
            if (elm.property_id == element.id) {
                let tempObj = { ...element };
                tempObj.special_note = elm.special_note;
                tempObj.date_needed = elm.date_needed;
                tempObj.status = elm.status;
                tempObj.rate = elm.rate
                tempObj.listing_id = elm.id
                listingArray.push(tempObj)
                console.log("tempObj", tempObj);
                console.log("the matching elements")
                console.log(listingArray)
            }
        })
    })

    const listingHistory = listingArray.filter((elm) => elm.status == "Completed");
    console.log("filter results:")
    console.log(listingHistory)


    return (
        <div>
            <div className="row">
                <div className="col-12">
                    {
                        hHistory.length >= 1 ?
                            hHistory.map((elm) => {
                                return (<>
                                    <ul>
                                        <li key={elm.id}>
                                            <div className="payments_div mt-2">
                                                <div className="row d-flex  justify-content-between">
                                                    <div className="col-2">
                                                        <img src={elm.property_img} className="img_payments" />
                                                    </div>
                                                    <div className="col-10">
                                                        <div className="row">
                                                            <div className="col-4 pt-2 fs-5">{elm.name}</div>
                                                            <div className="col-5 pt-1">
                                                                <span>Scheduled Date: {elm.date_needed}</span>
                                                            </div>
                                                            <div className="col-3 pt-1">
                                                                <h4>Paid ${elm.rate} in full</h4>
                                                            </div>
                                                            <div className="row pt-3"
                                                                style={elm.review <= 0 ? { display: "block" }
                                                                    : { display: "none" }}
                                                            >
                                                                <div className="col-9">
                                                                    <Ratings
                                                                        setLocalRating={setLocalRating}
                                                                        localRating={localRating} />
                                                                </div>
                                                                <div className="col-3">
                                                                    <span className="button-24"
                                                                        onClick={() => {
                                                                            handleSubmitRating(elm.id, elm.worker_id)
                                                                        }}
                                                                    >Submit Rating</span></div>
                                                            </div>
                                                            <div className="row pt-3 text-light text-center"
                                                                style={elm.review > 0 ? { display: "block" }
                                                                    : { display: "none" }}
                                                            >
                                                                <div className="col-12 fs-3">
                                                                    You rated this job: <StaticRating
                                                                        ratingValue={elm.review}
                                                                    />
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul >
                                </>
                                )
                            }) : <div>You have no listing history</div>

                    }
                </div>
            </div>
        </div >
    )
}