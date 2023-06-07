import axios from "../axios.js";

const MainResumeService = {
  getAllResumes: () => {
    return axios
      .get("/resumes")
      .then((res) => {
        return {
          data: res.data.resumes.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          ),
          status: res.status,
        };
      })
      .catch((e) => {
        return {
          data: e.message,
          status: e.response.status,
        };
      });
  },

  getFillteredResumes: (queryString) => {
    return axios
      .get(`/resumes?${queryString}`)
      .then((res) => {
        return {
          data: res.data.resumes.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          ),
          status: res.status,
        };
      })
      .catch((e) => {
        return {
          data: e.message,
          status: e.response.status,
        };
      });
  },
};

export default MainResumeService;
