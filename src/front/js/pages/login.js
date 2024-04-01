import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [userU, setUserU] = useState('')
	const [userE, setUserE] = useState('')
    const [userP, setUserP] = useState('')
	const [signupEffect, setSignupEffect] = useState('')
	



	function login_function() {
     

       // if (userE.length > 5 && userP.length >5) {

        let log_info= {email:userE,
			password: userP}
   
        fetch('https://super-halibut-pggprg9v4g426vw-3001.app.github.dev/token', {
                method: 'POST',
                body: JSON.stringify(log_info), 
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    if (!res.ok) throw Error(res.statusText);
                    return res.json();
                })
                .then(response => {
                 //context.setCurrentUser(response);
                // navigate('/home')
				
				  
                
                } )
                .catch(error =>  console.log(error));    
           
        // }

        // else {
        //     alert('Please enter a valid username and/or password')
        //     setUserE('')
        //     setUserP('')
        // }


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


function sign_up_function(){
const sign_up_panel = document.getElementById('container');
sign_up_panel.classList.add('right-panel-active')
}

function sign_in_function(){
	const sign_in_panel = document.getElementById('container');
	sign_in_panel.classList.remove('right-panel-active');
}


	return (
	<>	
<div class="container" id='container'>
	<div class="form-container sign-up-container">
		<form action="#">
			<h4>Create Account</h4>
			<div class="social-container">
				<a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
				<a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
				<a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
			</div>
			<span>or use your email for registration</span>
			<input type="text" placeholder="Name" />
			<input type="email" placeholder="Email" />
			<input type="number" placeholder="(123) 456-7890" />
			<input type="password" placeholder="Password" />
			<button>Sign Up</button>
		</form>
	</div>
	<div class="form-container sign-in-container">
		<form action="#">
			<h1>Sign in</h1>
			<div class="social-container">
				<a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
				<a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
				<a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
			</div>
			<span>or use your account</span>
			<input type="email" placeholder="Email" value={userE} onChange={(e)=>get_email(e)}/>
			<input type="password" placeholder="Password" value={userP}  onChange={(e)=>get_password(e)}/>
			<a href="#">Forgot your password?</a>
			<button onClick={() => login_function()}>Sign In</button>
		</form>
	</div>
	<div class="overlay-container">
		<div class="overlay">
			<div class="overlay-panel overlay-left">
				<h1>Welcome Back!</h1>
				<p>To keep connected with us please login with your personal info</p>
				<button class="ghost" id="signIn" onClick={() => sign_in_function()}>Sign In</button>
			</div>
			<div class="overlay-panel overlay-right">
				<h1>Hello, Friend!</h1>
				<p>Enter your personal details and start journey with us</p>
				<button class="ghost" id="signUp" onClick={() => sign_up_function()}>Sign Up</button>
			</div>
		</div>
	</div>
</div>

<footer>
	<p>
		Created with <i class="fa fa-heart"></i> by
		<a target="_blank" href="https://florin-pop.com">Florin Pop</a>
		- Read how I created this and how you can join the challenge
		<a target="_blank" href="https://www.florin-pop.com/blog/2019/03/double-slider-sign-in-up-form/">here</a>.
	</p>
</footer>

</>
	);
};
