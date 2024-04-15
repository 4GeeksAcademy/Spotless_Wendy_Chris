import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

import { useNavigate } from "react-router-dom";
import { AppContext } from "../layout";


export const Login = () => {
	const { currentUser, setCurrentUser, token, setToken, role, setRole } = useContext(AppContext);

	const navigate = useNavigate();

	const [valid, setValid] = useState("is-valid");

	const { store, actions } = useContext(Context);
	const [userU, setUserU] = useState('')
	const [userE, setUserE] = useState('')
	const [userP, setUserP] = useState('')
	const [signupEffect, setSignupEffect] = useState('')

	const [userEmail, setUserEmail] = useState('')
	const [userFullName, setUserFullName] = useState('')
	const [userPassword, setUserPassword] = useState('')
	const [userPhone, setUserPhone] = useState('')

	const [localRole, setLocalRole] = useState('')




	function login_function() {


		// if (userE.length > 5 && userP.length >5) {

		let log_info = {
			email: userE,
			password: userP
		}

		fetch(process.env.BACKEND_URL + 'token', {
			method: 'POST',
			body: JSON.stringify(log_info),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => {
				if (!res.ok) {
					setValid("is-invalid")
					throw Error(res.statusText);
				}

				return res.json();
			})
			.then(responseAsJson => {
				//context.setCurrentUser(response);
				// navigate('/home')
				console.log("This is the login response:")
				console.log(responseAsJson)
				setCurrentUser(responseAsJson)
				var token = responseAsJson.token
				setToken(token);
				navigate('/landing');

			})
			.catch(error => console.log(error));
	}

	function get_username(val) {
		let test = val.target.value;
		setUserU(test)
	}

	function get_email(val) {
		let test = val.target.value;
		setUserE(test)
	}

	function get_password(val) {
		let test = val.target.value;
		setUserP(test)
	}


	function sign_up_function() {
		const sign_up_panel = document.getElementById('container');
		sign_up_panel.classList.add('right-panel-active')
	}

	function sign_in_function() {
		const sign_in_panel = document.getElementById('container');
		sign_in_panel.classList.remove('right-panel-active');
	}

	const handleSignUp = () => {
		let name = userFullName
		let email = userEmail
		let password = userPassword
		let phone = userPhone

		if (localRole == "Host" && userEmail && userPassword && userPhone && userFullName) {
			fetch(process.env.BACKEND_URL + "/user/new/load", {
				method: 'POST', // or 'PUT'
				body: JSON.stringify(
					[
						{
							"name": name,
							"email": email,
							"password": password,
							"phone": phone,
							"address": ""
						}
					]
				), // data can be a 'string' or an {object} which comes from somewhere further above in our application
				headers: {
					'Content-Type': 'application/json'
				}
			})
				.then(res => {
					if (!res.ok) console.log(res.statusText);
					return res.json();
				})
				.then(response => console.log('Success:', response))
				.catch(error => console.error(error));
		}
		else if (localRole == "Worker" && userEmail && userPassword && userPhone && userFullName) {
			console.log("worker role signup")
			fetch(process.env.BACKEND_URL + "/worker/new/load", {
				method: 'POST', // or 'PUT'
				body: JSON.stringify(
					[
						{
							"name": name,
							"email": email,
							"password": password,
							"phone": phone,
							"address": "",
							"img": "https://cdn.pixabay.com/photo/2012/02/23/09/11/brush-15931_1280.jpg"
						}
					]
				), // data can be a 'string' or an {object} which comes from somewhere further above in our application
				headers: {
					'Content-Type': 'application/json'
				}
			})
				.then(res => {
					if (!res.ok) console.log(res.statusText);
					return res.json();
				})
				.then(response => console.log('Success:', response))
				.catch(error => console.error(error));
		}
	}






	return (
		<>
			<div className="container" id='container'>
				<div className="form-container sign-up-container">
					<form>
						<h2 style={localRole == "" ? { display: "block" } : { display: "none" }}>Time to Choose!</h2>
						<h2 style={localRole == "Host" ? { display: "block" } :
							localRole == "Worker" ? { display: "block" } :
								{ display: "none" }}>Create Account</h2>
						<div className="rolePath"
							style={localRole == "Host" ? { display: "none" } :
								localRole == "Worker" ? { display: "none" } :
									{ display: "block" }
							}
						>
							<p>I am looking for on demand cleaning services for my short term rental</p>
							<button
								onClick={(event) => {
									event.preventDefault();
									setLocalRole("Host")
								}
								}
							>I am a Host</button>
							<p className="border-top border-bottom"></p>
							<p>I am looking to provide on demand cleaning services for short term rentals</p>
							<button
								onClick={(event) => {
									event.preventDefault();
									setLocalRole("Worker")
								}
								}
							>I am a Worker</button>
						</div>
						<div className="signUpForm"
							style={localRole == "Host" ? { display: "block" } :
								localRole == "Worker" ? { display: "block" } :
									{ display: "none" }}>
							<input type="text" placeholder="Full Name"
								onChange={e => setUserFullName(e.target.value)} value={userFullName} />
							<input type="email" placeholder="Email"
								onChange={e => setUserEmail(e.target.value)} value={userEmail} />
							<input type="number" placeholder="(123) 456-7890"
								onChange={e => setUserPhone(e.target.value)} value={userPhone} />
							<input type="password" placeholder="Password"
								onChange={e => setUserPassword(e.target.value)} value={userPassword} />
							<button
								onClick={(event) => {
									event.preventDefault();
									handleSignUp();
									sign_in_function()
								}
								}
							>Sign Up</button>
						</div>

					</form>
				</div >
				<div className="form-container sign-in-container">
					<form>
						<h1 className="pb-3">Sign in</h1>
						<input type="email" placeholder="Email" value={userE} onChange={(e) => get_email(e)} />
						<input
							id="validationpassword" className={valid}
							type="password" placeholder="Password" value={userP} onChange={(e) => get_password(e)} />
						<div id="validationpassword" className="invalid-feedback fs-3">
							Incorrect Password or email
						</div>
						<a href="#">Forgot your password?</a>
						<button onClick={(event) => {
							event.preventDefault();
							login_function()
						}
						}>Sign In</button>
					</form>
				</div>
				<div className="overlay-container">
					<div className="overlay">
						<div className="overlay-panel overlay-left">
							<h1 className="pb-3">Already have an account?</h1>
							<button className="ghost" id="signIn" onClick={() => sign_in_function()}>Sign In</button>
						</div>
						<div className="overlay-panel overlay-right">
							<h1>Welcome to Spotless!</h1>
							<p>Start your on demand cleaning journey today!</p>
							<button className="ghost" id="signUp" onClick={() => sign_up_function()}>Sign Up</button>
						</div>
					</div>
				</div>
			</div >
		</>
	);
};
