import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import rigo from "../../img/maid1.jpg";
import rigo2 from "../../img/maid2.jpeg";
import rigo3 from "../../img/maid3.jpg";
import rigo4 from "../../img/image_480.png";
import "../../styles/testslide.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

export const TestSlide = () => {
	const { store, actions } = useContext(Context);
	





	return (

        
  <div className="slideshow3">
       
                <img class=" img_sl2" src={rigo} />
          
        
                
                <img class=" img_sl2" src={rigo2} />
        
      
               
                <img class=" img_sl2" src={rigo3} />
        
              
                <img class=" img_sl2" src={rigo4} />

                <img class="img_sl2" src={rigo} />
       

            
        </div>





/* 
        <div class="slide-wrapper3">
 
         
 
            <div class="slide3">
              
                <img class="slide-number3 img_sl2" src={rigo} />
            </div>
            <div class="slide3">
                
                <img class="slide-number3 img_sl2" src={rigo2} />
            </div>
            <div class="slide3">
               
                <img class="slide-number3 img_sl2" src={rigo3} />
            </div>
            <div class="slide3">
              
                <img class="slide-number img_sl2" src={rigo4} />
            </div>

            
        </div> */
    

	);
};
