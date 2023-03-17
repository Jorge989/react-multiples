import UserSignup from "../model/UserSignup";

class SignupController {
  registerUser(user) {
    if (
      !user.username ||
      !user.email ||
      !user.password ||
      !user.confirmPassword ||
      !user.id
    ) {
      console.log("true");
      return false;
    }
    console.log("false");
    return true;
  }
}
export default SignupController;
