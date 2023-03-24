import React, { useRef, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/userSlice";
import { useHistory } from "react-router-dom";
import { navigateToUrl } from "single-spa";
import ButtonLogin from "../components/buttons/Button";
import "react-toastify/dist/ReactToastify.css";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import "./styles.scss";
import Parcel from "single-spa-react/parcel";
import anime from "animejs";
import LogoText from "../components/logoText/LogoText";
import User from "../model/User";
import AuthController from "../controllers/AuthController";
function App() {
  const [checkPaswword, setcheckPaswword] = useState(false);
  const { user, isLoading, isLoadingButton } = useSelector(
    (store) => store.user
  );
  const history = useHistory();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const authController = new AuthController();
  const handleSignup = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const loginUserData = formData;
    try {
      const loginUserAction = dispatch(loginUser(loginUserData));
      loginUserAction.then((result) => {
        if (result.type === "auth/login/fulfilled") {
          if (user) {
            dispatchEvent(
              new CustomEvent("@ja/react-multiples/user/login", {
                detail: {
                  user: user,
                },
              })
            );
            console.log("user aque", user);
          }

          toast.success("Usuário autenticado com sucesso!");
          setTimeout(() => {
            navigateToUrl("/react-parcel");
          }, 2000);
        }
      });
    } catch (error) {
      console.log("🚀 ~ file: Signup.js:65 ~ handleFormSubmit ~ error:", error);
      toast.error(`${error}`);
    }
  };

  const ref = useRef(null);
  useEffect(() => {
    anime({
      targets: "img",
      translateY: [
        { value: -50, duration: 500, easing: "easeOutQuad" },
        { value: 0, duration: 1200, easing: "easeOutBounce" },
      ],

      duration: 18200,
    });
  }, []);
  const handleCheckPassword = () => {
    setcheckPaswword(!checkPaswword);
  };
  return (
    <div className="container">
      <LogoText />

      <Parcel
        config={() => System.import("@JA/react-parcel")}
        fallback={<div style={{ display: "none" }}></div>}
      />

      <form onSubmit={handleFormSubmit}>
        <div className="container-input">
          {" "}
          <div className="container-icons">
            <FaEnvelope />
          </div>
          <input
            onChange={handleSignup}
            placeholder="digite o email"
            type="email"
            id="email"
          />
        </div>
        <div className="container-input">
          {" "}
          <div className="container-icons">
            <FaLock />
          </div>
          <input
            onChange={handleSignup}
            placeholder="digite a senha"
            type={checkPaswword ? "text" : "password"}
            id="password"
          />{" "}
          {checkPaswword ? (
            <FaEye className="password-icon" onClick={handleCheckPassword} />
          ) : (
            <FaEyeSlash
              className="password-icon"
              onClick={handleCheckPassword}
            />
          )}
        </div>
        <ButtonLogin isLoading={isLoadingButton} />
        <span>
          Não tem uma conta ainda?
          <NavLink style={{ textDecoration: "none" }} to="/signup">
            Signup
          </NavLink>
        </span>
      </form>
    </div>
  );
}

export default App;
