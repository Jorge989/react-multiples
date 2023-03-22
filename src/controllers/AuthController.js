import User from "../model/User.js";
import api from "../utils/axios";
class AuthController {
  authenticateUser(user) {
    const loginUser = {
      email: user.email,
      password: user.password,
    };

    return api
      .post("auth/login", loginUser)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
}
export default AuthController;
