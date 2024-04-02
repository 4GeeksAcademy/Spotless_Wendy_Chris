import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [testApi, setTestApi]= useState([]);
	const [cityR, setCityR]=useState(['Chicago', 'Miami', 'Boston', "Houston", 'Hollywood', 'Mobile','Orlando']);
	const [stateR, setStateR]=useState(['Texas', 'Florida', 'Georgia', 'New York', 'Indiana','California', 'Utah']);



	useEffect(() => {
		
	}, []);
	
function fetch_listing(){

 let test_url='https://airbnb13.p.rapidapi.com/search-location?location=Miami&checkin=2024-04-02&checkout=2024-04-30&adults=1&children=0&infants=0&pets=0&page=1&currency=USD';
		fetch(test_url,
		{
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': ' insert key here ',
				'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
			}
		
		
	})
			.then(res => {
				if (!res.ok) throw Error(res.statusText);
				return res.json();
			})
			.then(response => {
			
				let test= [... response.results];
				console.log(test);
				console.log('above is what we got');
  
				let test2=[];
				

				test.forEach((el)=>{
					let each_house={};

					let r=Math.floor(Math.random()*6);
					let u=Math.floor(Math.random()*11)+1;
					let b=Math.floor(Math.random()*4)+1;
					let be=Math.floor(Math.random()*5)+1;
				
                    each_house.user_id=u;
					each_house.name=el.name;
					each_house.bath=b;
					each_house.beds=be;
					each_house.city= cityR[r];
					each_house.state= stateR[r];
					each_house.address=el.address;
					each_house.images= el.images[0]+'   '+ el.images[1]+'  '+el.images[2]+' '+el.images[3]+" "+el.images[4];

					test2.push(each_house);
				
				})
				
				let string_list = JSON.stringify(test2)
				localStorage.setItem('property_list',string_list);	
				})
	
			.catch(error => console.log(error));
	
}

function load_property(){
	
	let test = JSON.parse(localStorage.getItem('property_list'));
	let test2 =localStorage.getItem('property_list');
	
	console.log('the thing below is my local storage : ');
	console.log(test);

	fetch(process.env.BACKEND_URL + "/api/property/new/load",
		{
			method: 'POST',
			body: test2,
            headers: {
                'Content-Type': 'application/json'
			}
		})
			.then(res => {
				if (!res.ok) console.log(res.statusText);
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
	<button type="button" className="btn btn-secondary" onClick={()=>fetch_listing()}>Fetch api</button><br/><br/><br/>
	<button type="button" className="btn btn-secondary" onClick={()=>load_property()}>Test property</button>

</div>


	);
};
