import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

import { useNavigate } from "react-router-dom";
import { AppContext } from "../layout";





export const Login = () => {
	const { currentUser, setCurrentUser, token, setToken } = useContext(AppContext);

	const navigate = useNavigate();



	const { store, actions } = useContext(Context);
	const [userU, setUserU] = useState('')
	const [userE, setUserE] = useState('')
	const [userP, setUserP] = useState('')
	const [signupEffect, setSignupEffect] = useState('')




	function login_function() {


		// if (userE.length > 5 && userP.length >5) {

		let log_info = {
			email: userE,
			password: userP
		}

		fetch('https://crispy-computing-machine-x99vw9x6gvjf94v-3001.app.github.dev/token', {
			method: 'POST',
			body: JSON.stringify(log_info),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => {
				if (!res.ok) console.log(res.statusText);
				return res.json();
			})
			.then(responseAsJson => {
				//context.setCurrentUser(response);
				// navigate('/home')
				console.log("This is the login response:")
				console.log(responseAsJson)
				setCurrentUser(responseAsJson)
				var token = responseAsJson.token
				setToken(token)

			})
			.then(() => {
				navigate('/landing')
			})
			.catch(error => console.log(error));

		// }

		// else {
		//     alert('Please enter a valid username and/or password')
		//     setUserE('')
		//     setUserP('')
		// }


	}




    function get_username(val) {
        let user_name = val.target.value;
        setUserU(user_name)
    }
    
    function get_email(val) {
        let user_email = val.target.value;
        setUserE(user_email)
    }

    function get_password(val) {
        let user_password = val.target.value;
        setUserP(user_password)
    }



	function sign_up_function() {
		const sign_up_panel = document.getElementById('container');
		sign_up_panel.classList.add('right-panel-active')
	}

	function sign_in_function() {
		const sign_in_panel = document.getElementById('container');
		sign_in_panel.classList.remove('right-panel-active');
	}


	return (
		<>
			<div className="container" id='container'>
				<div className="form-container sign-up-container">
					<form>
						<h4>Create Account</h4>
						<div className="social-container">
							<a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
							<a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
							<a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
						</div>
						<span>or use your email for registration</span>
						<input type="text" placeholder="Name" />
						<input type="email" placeholder="Email" />
						<input type="number" placeholder="(123) 456-7890" />
						<input type="password" placeholder="Password" />
						<button>Sign Up</button>
					</form>
				</div>
				<div className="form-container sign-in-container">
					<form>
						<h1>Sign in</h1>
						<div className="social-container">
							<a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
							<a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
							<a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
						</div>
						<span>or use your account</span>
						<input type="email" placeholder="Email" value={userE} onChange={(e) => get_email(e)} />
						<input type="password" placeholder="Password" value={userP} onChange={(e) => get_password(e)} />
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
							<h1>Welcome Back!</h1>
							<p>To keep connected with us please login with your personal info</p>
							<button className="ghost" id="signIn" onClick={() => sign_in_function()}>Sign In</button>
						</div>
						<div className="overlay-panel overlay-right">
							<h1>Hello, Friend!</h1>
							<p>Enter your personal details and start journey with us</p>
							<button className="ghost" id="signUp" onClick={() => sign_up_function()}>Sign Up</button>
						</div>
					</div>
				</div>
			</div>

			<footer>
				<p>
					Created with <i className="fa fa-heart"></i> by
					<a target="_blank" href="https://florin-pop.com">Florin Pop</a>
					- Read how I created this and how you can join the challenge
					<a target="_blank" href="https://www.florin-pop.com/blog/2019/03/double-slider-sign-in-up-form/">here</a>.
				</p>
			</footer>

		</>
	);
};
