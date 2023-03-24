export const addUserToLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};
export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};

export const getUserFromLocalStorage = () => {
  const result = localStorage.getItem("user");
  if (result === null) {
    return null;
  }
  try {
    const user = result ? JSON.parse(result) : null;
    return user;
  } catch (error) {
    console.error("Failed to parse user from local storage:", error);
    return null;
  }
};
