import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { AppContext } from "../layout";
import { BrowserRouter, Route, Routes, Link, useNavigate } from "react-router-dom";

export const MyPayments = () => {

    const { store, actions } = useContext(Context);
    const { currentUser, myProperties, setMyProperties,
        setCurrentUser, token, setToken, role, setRole,
        myListings, setMyListings, filterListings, setFilterListings

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
                // let newArray = [...responseAsJson];
                // let finalProperty = [];

                // newArray.forEach((el) => {
                //     let each_property = {};
                //     // let all_img = el.img.split("  ");
                //     // console.log(all_img)
                //     each_property = el;
                //     // each_property.image1 = all_img[0];
                //     // each_property.image2 = all_img[1];
                //     // each_property.image3 = all_img[2];
                //     finalProperty.push(each_property);
            })



            .catch(error => console.log(error));

    }, []);


    const handlePayment = (idl) => {
        var fetchedListings = []

        fetch(process.env.BACKEND_URL + `api/user/${currentUser.id}/listing/${idl}/paid`, {
            method: 'PUT', // or 'POST'
            // body: JSON.stringify(data), // data can be a 'string' or an {object} which comes from somewhere further above in our application
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
                    responseAsJson.my_listings.map((elm) => fetchedListings.push(elm))
            }
            )
            .then(() => setMyListings(fetchedListings))
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

    const needsPayment = listingArray.filter((elm) => elm.status == "Scheduled");
    console.log("filter results:")
    console.log(needsPayment)


    return (
        <div>
            <div className="row">
                <div className="col-12">
                    {
                        needsPayment.length >= 1 ?
                            needsPayment.map((elm, index) => {
                                return (
                                    <ul key={index}>
                                        <li >
                                            <div className="payments_div mt-2">
                                                <div className="row">
                                                    <div className="col-3">
                                                        <img src={elm.image1} className="img_payments" />
                                                    </div>
                                                    <div className="col-9">
                                                        <div className="row">
                                                            <div className="col-6 pt-1 text-start">
                                                                <h4>{elm.city}</h4>
                                                            </div>
                                                            <div className="col-6 pt-1">
                                                                <span>Scheduled Date: {elm.date_needed}</span>
                                                            </div>
                                                            <div className="col-6 pt-2 fs-3 text-start" >
                                                                {elm.name}</div>
                                                            <div className="col-6 pt-2 fs-3">
                                                                <button className="button-24 payment_button"
                                                                    onClick={() => {
                                                                        handlePayment(elm.listing_id)
                                                                    }}>
                                                                    Pay ${elm.rate}</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul >

                                )
                            }) : <div>There are no payments due</div>

                    }
                </div>
            </div>
        </div >
    )
}