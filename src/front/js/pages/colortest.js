import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import "../../styles/colortest.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

export const ColorTest = () => {

    return (
        <>

            <div className="row d-flex justify-content-center">
                <div className="col-6 mainColor testDiv text-center">
                    <div className="row">
                        <div className="col-4"><p className="mt-5 fs-1 textOne">Text 1</p>
                            <p className="mt-5 fs-1 textTwo">Text 2</p>
                            <p className="mt-5 fs-1 textThree">Text 3</p>
                            <p className="mt-5 fs-1 textFour">Text 4</p></div>
                        <div className="col-4 ">
                            <p className="mt-5"><span className="buttonOne fs-5">Button One</span></p>
                            <p className="mt-5"><span className="buttonTwo fs-5">Button Two</span></p>
                            <p className="mt-5"><span className="buttonThree fs-5">Button Thr</span></p>
                            <p className="mt-5"><span className="buttonFour fs-5">Button Four</span></p>
                        </div>
                        <div className="col-4">
                            <p className="mt-5 fs-1 textFive">Text 5</p>
                            <p className="mt-5 fs-1 textsix">Text 6</p>
                            <p className="mt-5 fs-1 textSeven">Text 7</p>
                            <p className="mt-5 fs-1 textEight">Text 8</p></div>
                    </div>
                </div>
                <div className="col-6 gradientOne testDiv text-center">
                    <div className="row">
                        <div className="col-4"><p className="mt-5 fs-1 textOne">Text 1</p>
                            <p className="mt-5 fs-1 textTwo">Text 2</p>
                            <p className="mt-5 fs-1 textThree">Text 3</p>
                            <p className="mt-5 fs-1 textFour">Text 4</p></div>
                        <div className="col-4 ">
                            <p className="mt-5"><span className="buttonOne fs-5">Button One</span></p>
                            <p className="mt-5"><span className="buttonTwo fs-5">Button Two</span></p>
                            <p className="mt-5"><span className="buttonThree fs-5">Button Thr</span></p>
                            <p className="mt-5"><span className="buttonFour fs-5">Button Four</span></p>
                        </div>
                        <div className="col-4">
                            <p className="mt-5 fs-1 textFive">Text 5</p>
                            <p className="mt-5 fs-1 textsix">Text 6</p>
                            <p className="mt-5 fs-1 textSeven">Text 7</p>
                            <p className="mt-5 fs-1 textEight">Text 8</p></div>
                    </div>
                </div>
                <div className="col-6 gradientTwo testDiv text-center">
                    <div className="row">
                        <div className="col-4"><p className="mt-5 fs-1 textOne">Text 1</p>
                            <p className="mt-5 fs-1 textTwo">Text 2</p>
                            <p className="mt-5 fs-1 textThree">Text 3</p>
                            <p className="mt-5 fs-1 textFour">Text 4</p></div>
                        <div className="col-4 ">
                            <p className="mt-5"><span className="buttonOne fs-5">Button One</span></p>
                            <p className="mt-5"><span className="buttonTwo fs-5">Button Two</span></p>
                            <p className="mt-5"><span className="buttonThree fs-5">Button Thr</span></p>
                            <p className="mt-5"><span className="buttonFour fs-5">Button Four</span></p>
                        </div>
                        <div className="col-4">
                            <p className="mt-5 fs-1 textFive">Text 5</p>
                            <p className="mt-5 fs-1 textsix">Text 6</p>
                            <p className="mt-5 fs-1 textSeven">Text 7</p>
                            <p className="mt-5 fs-1 textEight">Text 8</p></div>
                    </div>
                </div>
                <div className="col-6 gradientThree testDiv text-center">
                    <div className="row">
                        <div className="col-4"><p className="mt-5 fs-1 textOne">Text 1</p>
                            <p className="mt-5 fs-1 textTwo">Text 2</p>
                            <p className="mt-5 fs-1 textThree">Text 3</p>
                            <p className="mt-5 fs-1 textFour">Text 4</p></div>
                        <div className="col-4 ">
                            <p className="mt-5"><span className="buttonOne fs-5">Button One</span></p>
                            <p className="mt-5"><span className="buttonTwo fs-5">Button Two</span></p>
                            <p className="mt-5"><span className="buttonThree fs-5">Button Thr</span></p>
                            <p className="mt-5"><span className="buttonFour fs-5">Button Four</span></p>
                        </div>
                        <div className="col-4">
                            <p className="mt-5 fs-1 textFive">Text 5</p>
                            <p className="mt-5 fs-1 textsix">Text 6</p>
                            <p className="mt-5 fs-1 textSeven">Text 7</p>
                            <p className="mt-5 fs-1 textEight">Text 8</p></div>
                    </div>
                </div>
                <div className="col-6 gradientFour testDiv text-center">
                    <div className="row">
                        <div className="col-4"><p className="mt-5 fs-1 textOne">Text 1</p>
                            <p className="mt-5 fs-1 textTwo">Text 2</p>
                            <p className="mt-5 fs-1 textThree">Text 3</p>
                            <p className="mt-5 fs-1 textFour">Text 4</p></div>
                        <div className="col-4 ">
                            <p className="mt-5"><span className="buttonOne fs-5">Button One</span></p>
                            <p className="mt-5"><span className="buttonTwo fs-5">Button Two</span></p>
                            <p className="mt-5"><span className="buttonThree fs-5">Button Thr</span></p>
                            <p className="mt-5"><span className="buttonFour fs-5">Button Four</span></p>
                        </div>
                        <div className="col-4">
                            <p className="mt-5 fs-1 textFive">Text 5</p>
                            <p className="mt-5 fs-1 textsix">Text 6</p>
                            <p className="mt-5 fs-1 textSeven">Text 7</p>
                            <p className="mt-5 fs-1 textEight">Text 8</p></div>
                    </div>
                </div>
                <div className="col-6 gradientFive testDiv text-center">
                    <div className="row">
                        <div className="col-4"><p className="mt-5 fs-1 textOne">Text 1</p>
                            <p className="mt-5 fs-1 textTwo">Text 2</p>
                            <p className="mt-5 fs-1 textThree">Text 3</p>
                            <p className="mt-5 fs-1 textFour">Text 4</p></div>
                        <div className="col-4 ">
                            <p className="mt-5"><span className="buttonOne fs-5">Button One</span></p>
                            <p className="mt-5"><span className="buttonTwo fs-5">Button Two</span></p>
                            <p className="mt-5"><span className="buttonThree fs-5">Button Thr</span></p>
                            <p className="mt-5"><span className="buttonFour fs-5">Button Four</span></p>
                        </div>
                        <div className="col-4">
                            <p className="mt-5 fs-1 textFive">Text 5</p>
                            <p className="mt-5 fs-1 textsix">Text 6</p>
                            <p className="mt-5 fs-1 textSeven">Text 7</p>
                            <p className="mt-5 fs-1 textEight">Text 8</p></div>
                    </div>
                </div>
            </div>
        </>
    );
};