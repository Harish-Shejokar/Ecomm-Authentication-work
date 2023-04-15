import { useState, useRef } from "react";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoding] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async(e) => {
    e.preventDefault();
    console.log(emailRef.current.value, passwordRef.current.value);
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    
    setIsLoding(true);
    if (isLogin) {
      try {
        const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDaChvkx_NS4CJiqX6UYkIpsRjZ02YeKDQ",
          {
            method: "POST",
            body: JSON.stringify({
              email: enteredEmail,
              password: enteredPassword,
              returnSecureToken: true,
            }),
            headers: {
              'Content-Type':'application/json'
            }
          });
        
        if (response.ok) {
         
          const data = await response.json();
          console.log(data);
        } else {
          alert('Invalid-Credentials')
        }
        
      } catch (error) {
        console.log(error);
      }
    }
    else {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDaChvkx_NS4CJiqX6UYkIpsRjZ02YeKDQ",
          {
            method: "POST",
            body: JSON.stringify(
              {
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true,
              }),
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )

        if (response.ok) {
          // console.log('success');
        }
        else {
          const res = await response.json();
          const errorMessage = "Authentication-Failed";
          alert(errorMessage);
          // console.log(res);
        }
      } catch (err) {
        console.log(err);
      }
        
      //   .then(res => {
      //   if (res.ok) {
      //     console.log('ok')
      //   } else {
      //     return res.json().then(data => {
      //       console.log(data);
      //     })
      //   }
      // })
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordRef} />
        </div>
        {/* <div>
          {!isLogin && <button type='button' onClick={createAccountHandler}>
            {}</button>}
          {isLoading && <h3 style={{ color: 'white' }}>Sending request...</h3>}
        </div> */}

        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p style={{ color: "white" }}>Sending request...</p>}

          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
