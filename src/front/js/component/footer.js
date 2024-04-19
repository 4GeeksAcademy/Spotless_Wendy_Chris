import React, { Component } from "react";
import "../../styles/footer.css";
import { Navigate, useNavigate } from "react-router-dom";


export const Footer = () => {
const navigate = useNavigate();
	return (
		<footer className="footer">

		 <div className="row pad_div pt-3">
			
		   <div className="footer-col">
			 <h4>Spotless</h4>
			 <ul>
			   <li><span>about us</span></li>
			   <li><span>our services</span></li>
			   <li><span>privacy policy</span></li>
			
			 </ul>
		   </div>
		   <div className="footer-col">
			 <h4>get help</h4>
			 <ul>
			   <li><span onClick={()=> navigate("/faq")}>FAQ</span></li>
			   <li><span >How to apply?</span></li>
			   <li><span >Requirements</span></li>
			   <li><span >Requirements</span></li>
			   
			 </ul>
		   </div>
		
		   <div className="footer-col">
			 <h4>follow us</h4>
			 <div className="social-links">
			   <span><i className="fab fa-facebook-f"></i></span>
			   <span><i className="fab fa-twitter"></i></span>
			   <span><i className="fab fa-instagram"></i></span>
			   
			  
			 </div>
		   </div>
		 </div>

	
	
	 </footer>
	 
	)
};
