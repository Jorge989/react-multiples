import React, { useRef, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import "./styles.scss";
import anime from "animejs";
import LogoEshop from "../img/cart.png";
function App() {
  const [checkPaswword, setcheckPaswword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleSignup = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  const handleFormSubmit = (e) => {
    console.log("formdata0 ", formData);
    e.preventDefault();
    if (!formData.email || !formData.password) {
      console.log("caiu");
      toast.error("Por favor preencha todos os campos!");
    } else {
      toast.success("Usuário autenticado com sucesso!");
      console.log("formData", formData);
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
      <div className="images">
        <img src={LogoEshop} />
        <h1>e</h1>
        <h1>Shop</h1>
      </div>
      <form onSubmit={handleFormSubmit}>
        <div className="container-input">
          {" "}
          <div className="container-icons">
            <FaEnvelope />
          </div>
          <input
            onChange={handleSignup}
            placeholder="enter the e-mail"
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
            placeholder="enter the password"
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
        <button className="button-86" type="submit" role="button">
          Submit
        </button>{" "}
        <span>
          Don't have an account yet?
          <NavLink style={{ textDecoration: "none" }} to="/signup">
            Signup
          </NavLink>
        </span>
      </form>
    </div>
  );
}

export default App;
