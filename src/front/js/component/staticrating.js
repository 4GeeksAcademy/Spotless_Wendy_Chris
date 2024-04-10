
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { AppContext } from "../layout";
import { Link, useNavigate } from "react-router-dom";

export const StaticRating = () => {

    const { store, actions } = useContext(Context);
    const { currentUser, myProperties, setMyProperties, setCurrentUser, token, setToken, role, setRole,

    } = useContext(AppContext);

    const navigate = useNavigate();
    const [listingNote, setListingNote] = useState('');
    const [rating, setRating] = useState(4)


    var currentRating = 0
    const setCurrentRating = (value) => {
        currentRating = value
        console.log("rating updated:")
        console.log(currentRating)
    }




    return (
        <>
            <div class="row">
                <div class="col">
                    <span className="fs-5">
                        Current Rating:<span className="">
                            <i className="fa-solid fa-star ps-2 fs-4 staticStar"
                                style={
                                    rating >= 1 ? { display: "inline" } :
                                        { display: "none" }}
                            ></i>
                            <i className="fa-solid fa-star ps-2 fs-4 starRating"
                                style={rating < 2 ? { display: "inline" } :
                                    { display: "none" }}
                            ></i>
                            <i className="fa-solid fa-star ps-2 fs-4 staticStar"
                                style={
                                    rating >= 2 ? { display: "inline" } :
                                        { display: "none" }}
                            ></i>
                            <i className="fa-solid fa-star ps-2 fs-4 starRating"
                                style={rating < 3 ? { display: "inline" } :
                                    { display: "none" }}
                            ></i>
                            <i className="fa-solid fa-star ps-2 fs-4 staticStar"
                                style={
                                    rating >= 3 ? { display: "inline" } :
                                        { display: "none" }}
                            ></i>
                            <i className="fa-solid fa-star ps-2 fs-4 starRating"
                                style={rating < 4 ? { display: "inline" } :
                                    { display: "none" }}
                            ></i>
                            <i className="fa-solid fa-star ps-2 fs-4 staticStar"
                                style={
                                    rating >= 4 ? { display: "inline" } :
                                        { display: "none" }}
                            ></i>
                            <i className="fa-solid fa-star ps-2 fs-4 starRating"
                                style={rating < 5 ? { display: "inline" } :
                                    { display: "none" }}
                            ></i>
                            <i className="fa-solid fa-star ps-2 fs-4 staticStar"
                                style={
                                    rating >= 5 ? { display: "inline" } :
                                        { display: "none" }}
                            ></i>
                            {rating}
                        </span>
                    </span>
                </div>
            </div>
        </>
    );
};