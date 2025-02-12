import React from "react";
import "./login.css";
import { auth, provider } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { buttonClick } from "../../assets/functions/clickSound";
import { Icon } from "@iconify/react";
import { signInWithPopup, updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/reducers/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastify } from "../../utils/toastify";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const loginUser = (data) => {
        buttonClick.play();
        signInWithEmailAndPassword(auth, data.email, data.pass)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                toastify("success", `Greetings, ${user.displayName}!`);
                dispatch(
                    loginUser({
                        email: user.email,
                        username: user.displayName,
                        id: user.uid,
                    })
                );
                reset();
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
                toastify("error", "Invalid Credentials");
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
                toastify("success", `Greetings, ${user.displayName}!`);

                dispatch(
                    loginUser({
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
                toastify("error", "Some Error Occurred, Please Try Again");
                console.log(errorCode, errorMessage);
                // ..
            });
        e.preventDefault();
    };

    return (
        <div className="login">
            <h1 className="">
                <span className="dancing-script-special"> ZenFi </span>
                {/* <Icon className="yinyang" icon="openmoji:yin-yang" />{" "} */}
                <small className={{ fontWeight: "lighter", fontSize: "20px" }}>
                    virtual productivity space
                </small>
            </h1>

            <form onSubmit={handleSubmit(loginUser)}>
                <div id="loginForm">
                    <h1 id="loginHead">Login</h1>
                    <input
                        id="email"
                        placeholder="Email"
                        {...register("email", { required: true })}
                    ></input>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        {...register("pass", { required: true })}
                    ></input>
                    <button id="loginBtn" title="Login">
                        Login
                    </button>
                    <button id="googleBtn" onClick={googleSignIn}>
                        <Icon
                            icon="flat-color-icons:google"
                            style={{ marginRight: "7px" }}
                        />{" "}
                        Google
                    </button>

                    <span id="registerRedirect">
                        Don&apos;t have an account?{" "}
                        <a
                            style={{
                                textDecoration: "none",
                                color: "rgb(254, 241, 241, 0.8)",
                            }}
                            href="/register"
                        >
                            Sign Up
                        </a>
                    </span>
                </div>
            </form>
        </div>
    );
}
