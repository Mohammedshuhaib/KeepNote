import axios from "axios";

// register

const register = async (userData) => {
  const response = await axios(
    {
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/register`,
      data: {
        email: userData.email,
        password: userData.password,
        name: userData.name,
      },
      withCredentials: true,
    },
    { withCredentials: true }
  );
  return response.data

};

// submit otp

const submitOtp = async (otp) => {
  
  const response = await axios(
    {
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/submitOtp`,
      data: {
        otp,
      },
      withCredentials: true,
    },
    { withCredentials: true }
  );
  return response.data;
};


// login


const login = async (userData) => {
  const resposne = await axios(
    {
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/login`,
      data: {
        email: userData.email,
        password: userData.password,
      },
      withCredentials: true,
    },
    { withCredentials: true }
  );

  if (resposne.data) {
    localStorage.setItem("user", JSON.stringify(resposne.data));
  }

  return resposne.data;
};

const logout = async (userData) => {
    const resposne = await axios(
      {
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/logout`,
        withCredentials: true,
      },
      { withCredentials: true }
    );
  
    return resposne.data;
  };

const authService = {
  register,
  submitOtp,
  login,
  logout,
};

export default authService;
