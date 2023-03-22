import React, { useRef, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router-dom";
import ButtonLogin from "../../components/buttons/Button";
import "react-toastify/dist/ReactToastify.css";
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import "./styles.scss";
import anime from "animejs";
import LogoText from "../../components/logoText/LogoText";
import UserSignup from "../../model/UserSignup";
import SignupController from "../../controllers/SignupController";
function Signup() {
  const [checkPaswword, setcheckPaswword] = useState(false);
  const [confirmPasswordInput, setconfirmPasswordInput] = useState(false);
  const signupController = new SignupController();
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    // id: uuidv4(),
  });
  const handleSignup = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("formData", formData);
    // if (
    //   !formData.username ||
    //   !formData.email ||
    //   !formData.password ||
    //   !formData.confirmPassword
    // ) {
    //   toast.error("Erro ao criar usuário. Verifique as credenciais!");
    // } else {
    const signupUser = formData;
    try {
      const user = await signupController.registerUser(signupUser);
      console.log("User authenticated: ", user);
      toast.success("Usuário criado com sucesso!");
      history.push("/");
    } catch (error) {
      console.log("🚀 ~ file: Signup.js:52 ~ handleFormSubmit ~ error:", error);
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
  const handleCheckConfirmPassword = () => {
    setconfirmPasswordInput(!confirmPasswordInput);
  };
  return (
    <div className="container">
      <LogoText />
      <form onSubmit={handleFormSubmit}>
        {" "}
        <div className="container-input">
          {" "}
          <div className="container-icons">
            <FaUser />
          </div>
          <input
            onChange={handleSignup}
            placeholder="enter your name"
            type="text"
            id="username"
          />
        </div>
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
        </div>{" "}
        <div className="container-input">
          {" "}
          <div className="container-icons">
            <FaLock />
          </div>
          <input
            onChange={handleSignup}
            placeholder="confirma sua senha"
            type={confirmPasswordInput ? "text" : "password"}
            id="confirmPassword"
          />{" "}
          {confirmPasswordInput ? (
            <FaEye
              className="password-icon"
              onClick={handleCheckConfirmPassword}
            />
          ) : (
            <FaEyeSlash
              className="password-icon"
              onClick={handleCheckConfirmPassword}
            />
          )}
        </div>
        <ButtonLogin />
        <span>
          Já possui uma conta?
          <NavLink style={{ textDecoration: "none" }} to="/">
            Login
          </NavLink>
        </span>
      </form>
    </div>
  );
}

export default Signup;
