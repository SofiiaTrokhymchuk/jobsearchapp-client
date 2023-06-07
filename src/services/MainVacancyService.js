import axios from "../axios.js";

const MainVacancyService = {
  getAllVacancies: () => {
    return axios
      .get("/vacancies")
      .then((res) => {
        return {
          data: res.data.vacancies.sort(
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

  getFillteredVacancies: (queryString) => {
    return axios
      .get(`/vacancies?${queryString}`)
      .then((res) => {
        return {
          data: res.data.vacancies.sort(
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

export default MainVacancyService;
