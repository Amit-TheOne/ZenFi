import React, { useState } from "react";
import "./register.css";
import { useForm } from "react-hook-form";
import { auth, provider } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { buttonClick } from "../../assets/functions/clickSound";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/reducers/userSlice";
import { toastify } from "../../utils/toastify";

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const registerUser = (data) => {
    buttonClick.play();
    const { email, username, pass, cpass } = data;
    if (pass !== cpass) {
      toastify("error","Invalid Credentials!");
      return;
    }
    createUserWithEmailAndPassword(auth, email, pass)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        await updateProfile(user, {
          displayName: username,
        });
        toastify("success",`Greetings, ${user.displayName}!`)
        dispatch(
          updateUser({
            email: user.email,
            username: user.displayName,
            id: user.uid,
          })
        );
        reset();
        navigate("/");

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        console.log(errorCode, errorMessage);
        // ..
      });
  };

  const googleSignIn = (e) => {
    signInWithPopup(auth, provider)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        await updateProfile(user, {
          displayName: user.displayName,
        });
        toastify("success",`Greetings, ${user.displayName}!`)
        dispatch(
          updateUser({
            email: user.email,
            username: user.displayName,
            id: user.uid,
          })
        );
        reset();
        navigate("/");

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        console.log(errorCode, errorMessage);
        // ..
      });
    e.preventDefault();
  };

  return (
    <div className="register">
      {/* <h1 style={{ textAlign: "center" }}>
        ZenFi <Icon className="yinyang" icon="openmoji:yin-yang" />{" "}
        <small style={{ fontWeight: "lighter", fontSize: "20px" }}>
          your virtual study environment
        </small>
      </h1> */}
      <h1 className="">
                <span className="dancing-script-special"> ZenFi </span>
                {/* <Icon className="yinyang" icon="openmoji:yin-yang" />{" "} */}
                <small className={{ fontWeight: "lighter", fontSize: "20px" }}>
                    virtual productivity space
                </small>
            </h1>

      <form onSubmit={handleSubmit(registerUser)}>
        <div id="registerForm">
          <h1 id="registerHead">Sign Up</h1>
          <input
            id="username"
            placeholder="Username"
            {...register("username", { required: true })}
          ></input>
          <input
            id="rEmail"
            placeholder="Email"
            {...register("email", { required: true })}
          ></input>
          <input
            id="rPassword"
            type="password"
            placeholder="Password"
            {...register("pass", { required: true })}
          ></input>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            {...register("cpass", { required: true })}
          ></input>

          <button id="registerBtn" title="Register">
            Register
          </button>
          <button id="rGoogleBtn" onClick={googleSignIn}>
            <Icon
              icon="flat-color-icons:google"
              style={{ marginRight: "5px" }}
            />{" "}
            Google
          </button>
          <span id="loginRedirect">
            Already have an account?{" "}
            <a style={{ textDecoration: "none", color: "rgb(254, 241, 241, 0.8)" }} href="/">
              Login
            </a>
          </span>
        </div>
      </form>
    </div>
  );
}
