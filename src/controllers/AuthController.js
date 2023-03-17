import User from "../model/User.js";

class AuthController {
  authenticateUser(user) {
    if (!user.email || !user.password) {
      return false;
    }
    return true;
  }
}
export default AuthController;
