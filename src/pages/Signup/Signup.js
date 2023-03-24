import React, { useRef, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import ButtonLogin from "../../components/buttons/Button";
import "react-toastify/dist/ReactToastify.css";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaEye,
  FaEyeSlash,
  FaSpinner,
} from "react-icons/fa";
import "./styles.scss";
import anime from "animejs";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/userSlice";
import LogoText from "../../components/logoText/LogoText";
import SignupController from "../../controllers/SignupController";
function Signup() {
  const { user, isLoading, isLoadingButton } = useSelector(
    (store) => store.user
  );

  const [checkPaswword, setcheckPaswword] = useState(false);
  const [confirmPasswordInput, setconfirmPasswordInput] = useState(false);
  const signupController = new SignupController();
  const history = useHistory();
  const dispatch = useDispatch();
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
    const signupUser = formData;
    try {
      const registerUserAction = dispatch(registerUser(signupUser));
      registerUserAction.then((result) => {
        if (result.type === "auth/signup/fulfilled") {
          toast.success("Usuário criado com sucesso!");
          history.push("/");
        }
      });
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
            placeholder="digite o nome"
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
            placeholder="digite o e-mail"
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
        <ButtonLogin isLoading={isLoadingButton} />
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
