import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";

import "../../styles/home.css";
import { AppContext } from "../layout";
import { BrowserRouter, Route, Routes, Link, useNavigate } from "react-router-dom";
import { BackendURL } from "./backendURL";

export const MyListings = () => {

    const { store, actions } = useContext(Context);
    const { currentUser, myProperties, setMyProperties,
        setCurrentUser, token, setToken, role, setRole,
        myListings, setMyListings, filterListings, setFilterListings,
        setMenu, setDisplay

    } = useContext(AppContext);


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


    //   fetch all listings and store in myListings below 
    useEffect(() => {

        fetch(process.env.BACKEND_URL + `api/user/${currentUser.id}/listing`)
            .then(res => {
                if (!res.ok) throw Error(res.statusText);
                return res.json();
            })
            .then(responseAsJson => {
                console.log("response for listing from backend:")
                console.log(responseAsJson)
                setMyListings(responseAsJson)
            })

            .catch(error => console.log(error));

    }, []);

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
                tempObj.listing_id = elm.id;
                listingArray.push(tempObj)
                // console.log("tempObj", tempObj);
                // console.log("the matching elements")
                // console.log(listingArray)
            }
        })
    })

    var results = listingArray.filter((elm) => elm.status == filterListings);
    console.log("filter results:")
    console.log(results)
    // console.log("Status result:")
    // console.log(filterListings)

    var scheduledPaymentDue = myListings.filter((elm) => elm.status == "Scheduled");


    const cancelListing = (idl) => {

        var fetchedListings = []

        fetch(process.env.BACKEND_URL + `api/user/${currentUser.id}/cancel/listing/${idl}`, {
            method: 'PUT', // or 'POST'
            //   body: JSON.stringify(data), // data can be a 'string' or an {object} which comes from somewhere further above in our application
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (!res.ok) throw Error(res.statusText);
                return res.json();
            })
            .then(responseAsJson => {
                console.log('Success:', responseAsJson),
                    responseAsJson.map((elm) => fetchedListings.push(elm))
            }
            )
            .then(() => setMyListings(fetchedListings))
        console.log("these are my fetched listings", fetchedListings)
            .catch(error => console.error(error));
    }




    return (
        <div>
            <div className="product-list-container">{
                results.length > 0 ?
                    results.map((element, index) => {
                        console.log("results", results);
                        return (
                            <div className="card text-secondary mb-3" style={{ width: "18rem" }} key={index}>
                                <div id="carouselExampleSlidesOnly" className="carousel slide h-50" data-bs-ride="carousel">
                                    <div className="carousel-inner" style={{ height: "10rem" }}>
                                        <div>
                                            <p className="card-text card_p_fix" style={element.status == "Active" ? { display: "block" } : { display: "none" }}>
                                                <i className="fa-solid fa-circle text-warning fs-5"></i> Pairing with Cleaner
                                            </p>
                                            <p className="card-text" style={element.status == "Scheduled" ? { display: "block" } : { display: "none" }}>
                                                <i className="fa-solid fa-circle text-success fs-5"></i> Cleaning Scheduled
                                            </p>
                                            <p className="card-text" style={element.status == "Complete" ? { display: "block" } : { display: "none" }}>
                                                <i className="fa-solid fa-circle text-secondary fs-5"></i> Complete
                                            </p>
                                        </div>
                                        <div className="">
                                            <img src={element.image1} className="d-block listing_img" alt="..." />
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <p className="card-title fs-5">{element.name}</p>
                                    <p className="card-text"><u>Date Needed:</u><br />
                                        {element.date_needed}</p>
                                    <p className="card-text"><u>Special Instructions:</u><br />
                                        {element.special_note}</p>
                                    <div className="card-text">
                                        <span className="button-24"
                                            onClick={() => cancelListing(element.listing_id)}
                                        >Cancel Cleaning</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })

                    : scheduledPaymentDue.length > 0 ?
                        <div> You have payments due!
                            <div ><span className="button-24 mt-5"
                                onClick={() => {
                                    setDisplay("payments");
                                    setMenu("payments")
                                }}

                            >Go to My Payments</span></div>

                        </div>

                        :

                        <div>You have no {filterListings} listings
                            <div><span className="button-24 my-5"
                                onClick={() => {
                                    setDisplay("propMain")
                                    setMenu("properties")
                                }
                                }
                            >Go To My Properties</span></div>
                            <div>To Add Properties or Create A Listing</div>
                        </div>

            }
            </div>
        </div>
    )
}


// tempArray = [...element]
// newArray = []
// myProperties.forEach((el) => {
//     newArray.push(el)
// })
// console.log("new array below")
// console.log(newArray)

// return (<div>{element.image1}</div>)









