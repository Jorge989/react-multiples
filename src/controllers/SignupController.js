import UserSignup from "../model/UserSignup";
import api from "../utils/axios";

class SignupController {
  registerUser(user) {
    const signupUser = {
      username: user.username,
      email: user.email,
      password: user.password,
      confirmPassword: user.confirmPassword,
    };
    return api
      .post("auth/signup", signupUser)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error);
        return Promise.reject(error);
      });
  }
}

export default SignupController;
