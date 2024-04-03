import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

export const AddListing = () => {
	const { store, actions } = useContext(Context);
	const [testApi, setTestApi] = useState([]);
	


	useEffect(() => {

	}, []);

	function add_listing_function() {

		fetch('',
			{
				method: 'GET'
            })
			.then(res => {
				if (!res.ok) throw Error(res.statusText);
				return res.json();
			})
			.then(response => {

			console.log(response)

				})

				
		

			.catch(error => console.log(error));


	}

	
	return (

<div className="container">

<h1>test</h1>

	
    <Link to='/'>
	<button type="button" className="btn btn-secondary">Home</button>
</Link>


		</div>


	);
};
