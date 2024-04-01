import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [testApi, setTestApi]= useState([]);
	const [cityR, setCityR]=useState(['Chicago', 'Miami', 'Boston', "Houston", 'Hollywood', 'Mobile','Orlando']);


	// useEffect(() => {

	// }, []);
	
function fetch_listing(){

 let test_url='https://airbnb13.p.rapidapi.com/search-location?location=Miami&checkin=2024-04-02&checkout=2024-04-30&adults=1&children=0&infants=0&pets=0&page=1&currency=USD';
		fetch(test_url,
		{
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': 'b7d8c24116msh18d47855c91a4c6p129b19jsn25ca23c193e6',
				'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
			}
		
		
	})
			.then(res => {
				if (!res.ok) throw Error(res.statusText);
				return res.json();
			})
			.then(response => {
				//setTestApi(response);
				let test= [... response.results]
				let test2=[]
				let each_house={}
				test.forEach((el)=>{

					each_house.name=el.name,
					each_house.baths=el.bathrooms,
					each_house.bed=el.beds,
					each_house.city= cityR[Math.floor(Math.random()*5)],
					each_house.address=el.address,
					each_house.images= el.images[0]+'   '+ el.images[1]+'  '+el.images[2]
					test2.push(each_house)

				})

				console.log('Test starts here')
				console.log(test2)
				console.log('Test ends here')
				
						
			})
	
			.catch(error => console.log(error));
	
}



	return (

<div className="container">
	<h1>test</h1>
	<button type="button" className="btn btn-secondary" onClick={()=>fetch_listing()}>Fetch api</button>

</div>


	);
};
