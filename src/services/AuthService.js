import axios from "../axios.js";

const AuthService = {
  login: (user) => {
    return axios
      .post("/login", { ...user })
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          localStorage.setItem("token", res.data.token);
        }
        return { data: res.data, status: res.status };
      })
      .catch((e) => {
        console.log(e);
        return { data: e.response.data.message, status: e.response.status };
      });
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },

  registerJobseeker: (jobseeker) => {
    return axios
      .post("/registration/jobseeker", { ...jobseeker })
      .then((res) => {
        console.log(res);
        return { data: res.data, status: res.status };
      })
      .catch((e) => {
        console.log(e);
        return { data: e.response.data, status: e.response.status };
      });
  },

  registerEmployer: (employer) => {
    return axios
      .post("/registration/employer", { ...employer })
      .then((res) => {
        console.log(res);
        return { data: res.data, status: res.status };
      })
      .catch((e) => {
        console.log(e);
        return { data: e.response.data, status: e.response.status };
      });
  },

  verifyUser: (confirmationCode) => {
    return axios
      .get(`/confirm/${confirmationCode}`)
      .then((res) => {
        console.log(res);
        return { data: res.data, status: res.status };
      })
      .catch((e) => {
        console.log(e);
        return { data: e.response.data, status: e.response.status };
      });
  },

  getCurrentUser: () => {
    if (localStorage.length > 0) {
      return {
        user: JSON.parse(localStorage.getItem("user")),
        token: localStorage.getItem("token"),
      };
    } else {
      return null;
    }
  },
};

export default AuthService;
