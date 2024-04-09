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
                            needsPayment.map((elm) => {
                                return (<>
                                    <ul>
                                        <li key={elm.id}>
                                            <div className="listing_div">
                                                <div className="d-flex  justify-content-between ">
                                                    <img src={elm.image1} className="img_listing" />
                                                    <div className="">
                                                        <h4>{elm.city}</h4>
                                                        <span> {elm.address}</span>
                                                    </div>
                                                    <div className="">
                                                        <span>{elm.date_needed}</span>
                                                    </div>
                                                    <div className="">
                                                        <button className="button-24" onClick={() => { }}>Pay ${elm.rate}</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </li></ul>
                                </>
                                )
                            }) : <div>There are no payments due</div>

                    }
                </div>
            </div>
        </div>
    )
}