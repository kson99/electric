import React, { useState } from "react";
import "./login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.setup";
import { useNavigate } from "react-router-dom";
import { ErrorToast } from "../../components";
import { BeatLoader } from "react-spinners";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const login = ev => {
    ev.preventDefault();

    let password = ev.target.password.value;

    try {
      setIsLoading(true);

      signInWithEmailAndPassword(auth, "admin@electric.ecom", password)
        .then(() => {
          setIsLoading(false);
          navigate("/admin");
        })
        .catch(err => {
          setIsLoading(false);
          setIsError(true);

          if (err.message.includes("too-many-requests")) {
            setError(
              "Access to this account has been temporarily disabled due to many failed login attempts. try again later."
            );
          } else if (err.message.includes("wrong-password")) {
            setError("Incorrect password. Try again");
          }
        });
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      setError("Something went wrong. Try again later");
    }
  };

  return (
    <div className="login">
      <ErrorToast trigger={isError} setTrigger={setIsError} error={error} />
      <div className="max-width">
        <div className="login-cont">
          <h1>Log into Admin</h1>

          <form onSubmit={login}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
            />
            <button type="submit" className="submitBtn">
              {isLoading ? <BeatLoader color="white" /> : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
