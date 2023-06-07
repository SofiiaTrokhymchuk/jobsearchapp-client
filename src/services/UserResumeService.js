import axios from "../axios.js";

const UserResumeService = {
  getResume: () => {
    return axios
      .get("/account/jobseeker")
      .then((res) => {
        return { data: res.data.resume, status: res.status };
      })
      .catch((e) => {
        console.log(e);
        return {
          data: e.message,
          status: e.response.status,
        };
      });
  },

  createResume: (userResume) => {
    return axios
      .post("/account/jobseeker", { ...userResume })
      .then((res) => {
        console.log(res);
        return { data: res.data.resume, status: res.status };
      })
      .catch((e) => {
        console.log(e);
        return {
          data: e.response.data,
          status: e.response.status,
        };
      });
  },

  updateResume: (userResume) => {
    return axios
      .patch("/account/jobseeker", { ...userResume })
      .then((res) => {
        console.log(res);
        return { data: res.data.resume, status: res.status };
      })
      .catch((e) => {
        console.log(e);
        return {
          data: e.response.data,
          status: e.response.status,
        };
      });
  },

  deleteResume: () => {
    return axios
      .delete("/account/jobseeker")
      .then((res) => {
        return { data: res.data.resume, status: res.status };
      })
      .catch((e) => {
        console.log(e);
        return {
          data: e.message,
          status: e.response.status,
        };
      });
  },
};

export default UserResumeService;
