import api from "../utils/axios";
export const registerUserThunk = async (url, user, thunkAPI) => {
  const signupUser = {
    username: user.username,
    email: user.email,
    password: user.password,
    confirmPassword: user.confirmPassword,
  };
  return api
    .post(url, signupUser)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject(error);
    });
};
export const loginUserThunk = async (url, user, thunkAPI) => {
  const loginUser = {
    email: user.email,
    password: user.password,
  };

  return api
    .post(url, loginUser)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};
