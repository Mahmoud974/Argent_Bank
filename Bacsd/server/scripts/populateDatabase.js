const axios = require("axios");
const signupApi = "http://localhost:3001/api/v1/user/signup";

const users = [
  {
    firstName: "Tony",
    lastName: "Stark",
    email: "tony@stark.com",
    password: "password123",
  },
  {
    firstName: "Steve",
    lastName: "Rogers",
    email: "steve@rogers.com",
    password: "password456",
  },
];

const signUpUser = async (user) => {
  try {
    const response = await axios.post(signupApi, user);
    console.log(`User ${user.email} signed up successfully:`, response.data);
  } catch (error) {
    if (error.response) {
      console.error(
        `Error signing up user ${user.email}: ${error.response.status} ${error.response.data.message}`
      );
    } else if (error.request) {
      console.error(
        `Error signing up user ${user.email}: No response received`
      );
    } else {
      console.error(`Error signing up user ${user.email}: ${error.message}`);
    }
  }
};

users.forEach((user) => signUpUser(user));
