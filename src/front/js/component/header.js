import React, { Component } from "react";
import rigo from "../../img/maid1.jpg";
import rigo2 from "../../img/maid2.jpeg";
import rigo3 from "../../img/maid3.jpg";
import rigo4 from "../../img/maid4.png";
import "../../styles/slideshow.css";


export const Header = () => {

    return (
       
       
       <div id="slideshow_div">
        <div class="slide-wrapper_div">
 
      
 
            <div class="slide_div">
                <img class="slide-number img_slide"  src={rigo} />
                  
             
            </div>
            <div class="slide_div">
            <img class="slide-number img_slide"  src={rigo2} />
               
            </div>
            <div class="slide_div">
            <img class="slide-number img_slide"  src={rigo3} />
               
            </div>
            <div class="slide_div">
            <img class="slide-number img_slide"  src={rigo4} />
               
            </div>
        </div>
    </div>




    )
};