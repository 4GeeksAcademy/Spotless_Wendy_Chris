import React, { useContext, useState, useEffect } from "react";

import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/faq.css";
import { Link } from "react-router-dom";

export const Faq = () => {

	useEffect(() => {

	}, []);




	return (

		<>
		
		<div class="faq-header">Frequently Asked Questions</div>

<div class="faq-content">
  <div class="faq-question">
    <input id="q1" type="checkbox" class="panel"/>
    <div class="plus">+</div>
    <label for="q1" class="panel-title">What is the meaning of life?</label>
    <div class="panel-content"><p id="faq_answer">\d fgadg fggf ggndg qh tqhtrhthhew</p></div>
  </div>


{/*   
  <div class="faq-question">
    <input id="q2" type="checkbox" class="panel"/>
    <div class="plus">+</div>
    <label for="q2" class="panel-title">How much wood would a woodchuck chuck?</label>
    <div class="panel-content">A woodchuck would chuck all the wood he could chuck, if a woodchuck could chuck wood!</div>
  </div>
  
  <div class="faq-question">
    <input id="q3" type="checkbox" class="panel"/>
    <div class="plus">+</div>
    <label for="q3" class="panel-title">What happens if Pinocchio says, "my nose will grow now"?</label>
    <div class="panel-content">Certain questions are better left &nbsp; <a href="https://en.wikipedia.org/wiki/The_Unanswered_Question" target="_blank">unanswered</a></div>
  </div> */}
</div>
		</>


	);
};
