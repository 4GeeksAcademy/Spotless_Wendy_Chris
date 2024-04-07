
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { AppContext } from "../layout";
import { Link, useNavigate } from "react-router-dom";

export const Ratings = () => {

    const { store, actions } = useContext(Context);
    const { currentUser, myProperties, setMyProperties, setCurrentUser, token, setToken, role, setRole } = useContext(AppContext);

    const navigate = useNavigate();
    const [listingNote, setListingNote] = useState('');
    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(0)


    return (
        <div className="block">
            <div class="row style-alt">
                <div class="col-sm-6 col-md-4">
                    <span className="text-left fs-5">
                        Rating<span className="">
                            <i className="fa-solid fa-star ps-2 fs-4 starRating"
                                style={rating < 1 && hover < 1 ? { display: "inline" } :
                                    { display: "none" }}
                                onClick={() => setRating(1)}
                                onMouseEnter={() => setHover(1)}
                                onMouseLeave={() => setHover(0)}
                            ></i>
                            <i className="fa-solid fa-star ps-2 fs-4 star"
                                style={
                                    rating >= 1 || hover >= 1 ? { display: "inline" } :
                                        { display: "none" }}
                                onClick={() => setRating(1)}
                                onMouseEnter={() => setHover(1)}
                                onMouseLeave={() => setHover(0)}
                            ></i>
                            <i className="fa-solid fa-star ps-2 fs-4 starRating"
                                style={rating < 2 && hover < 2 ? { display: "inline" } :
                                    { display: "none" }}
                                onClick={() => setRating(2)}
                                onMouseEnter={() => setHover(2)}
                                onMouseLeave={() => setHover(0)}
                            ></i>
                            <i className="fa-solid fa-star ps-2 fs-4 star"
                                style={
                                    rating >= 2 || hover >= 2 ? { display: "inline" } :
                                        { display: "none" }}
                                onClick={() => setRating(2)}
                                onMouseEnter={() => setHover(2)}
                                onMouseLeave={() => setHover(0)}
                            ></i>
                            <i className="fa-solid fa-star ps-2 fs-4 starRating"
                                style={rating < 3 && hover < 3 ? { display: "inline" } :
                                    { display: "none" }}
                                onClick={() => setRating(3)}
                                onMouseEnter={() => setHover(3)}
                                onMouseLeave={() => setHover(0)}
                            ></i>
                            <i className="fa-solid fa-star ps-2 fs-4 star"
                                style={
                                    rating >= 3 || hover >= 3 ? { display: "inline" } :
                                        { display: "none" }}
                                onClick={() => setRating(3)}
                                onMouseEnter={() => setHover(3)}
                                onMouseLeave={() => setHover(0)}
                            ></i>
                            <i className="fa-solid fa-star ps-2 fs-4 starRating"
                                style={rating < 4 && hover < 4 ? { display: "inline" } :
                                    { display: "none" }}
                                onClick={() => setRating(4)}
                                onMouseEnter={() => setHover(4)}
                                onMouseLeave={() => setHover(0)}
                            ></i>
                            <i className="fa-solid fa-star ps-2 fs-4 star"
                                style={
                                    rating >= 4 || hover >= 4 ? { display: "inline" } :
                                        { display: "none" }}
                                onClick={() => setRating(4)}
                                onMouseEnter={() => setHover(4)}
                                onMouseLeave={() => setHover(0)}
                            ></i>
                            <i className="fa-solid fa-star ps-2 fs-4 starRating"
                                style={rating < 5 && hover < 5 ? { display: "inline" } :
                                    { display: "none" }}
                                onClick={() => setRating(5)}
                                onMouseEnter={() => setHover(5)}
                                onMouseLeave={() => setHover(0)}
                            ></i>
                            <i className="fa-solid fa-star ps-2 fs-4 star"
                                style={
                                    rating >= 5 || hover >= 5 ? { display: "inline" } :
                                        { display: "none" }}
                                onClick={() => setRating(5)}
                                onMouseEnter={() => setHover(5)}
                                onMouseLeave={() => setHover(0)}
                            ></i>

                            {rating}
                        </span>
                    </span>
                </div>
            </div>
        </div>
    );
};