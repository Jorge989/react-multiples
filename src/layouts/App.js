import React, { useRef, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { navigateToUrl } from "single-spa";
import ButtonLogin from "../components/buttons/Button";
import "react-toastify/dist/ReactToastify.css";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import "./styles.scss";
import anime from "animejs";
import LogoText from "../components/logoText/LogoText";
import User from "../model/User";
import AuthController from "../controllers/AuthController";
function App() {
  const [checkPaswword, setcheckPaswword] = useState(false);
  const history = useHistory();
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
    // if (!formData.email || !formData.password) {
    //   toast.error("Erro ao autenticar usuário. Verifique as credenciais!");
    // } else {
    const loginUser = formData;
    try {
      const user = await authController.authenticateUser(loginUser);
      toast.success("Usuário autenticado com sucesso!");
      navigateToUrl("/react-parcel");
    } catch (error) {
      toast.error(`${error.response.data.msg}`);
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
        <ButtonLogin />
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
