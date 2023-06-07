import axios from "../axios.js";

const UserVacancyService = {
  getAllVacancies: () => {
    return axios
      .get("/account/employer")
      .then((res) => {
        console.log(res);
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

  getOneVacancy: (id) => {
    return axios
      .get(`/account/employer/${id}`)
      .then((res) => {
        return { data: res.data.vacancy, status: res.status };
      })
      .catch((e) => {
        console.log(e);
        return {
          data: e.message,
          status: e.response.status,
        };
      });
  },
  deleteVacancy: (id) => {
    return axios
      .delete(`/account/employer/${id}`)
      .then((res) => {
        return { data: res.data.vacancy, status: res.status };
      })
      .catch((e) => {
        console.log(e);
        return {
          data: e.message,
          status: e.response.status,
        };
      });
  },

  updateVacancy: (id, vacancy) => {
    return axios
      .patch(`/account/employer/${id}`, { ...vacancy })
      .then((res) => {
        return {
          data: res.data.vacancy,
          status: res.status,
        };
      })
      .catch((e) => {
        console.log(e);
        return {
          data: e.response.data,
          status: e.response.status,
        };
      });
  },

  createVacancy: (createdVacancy) => {
    return axios
      .post("/account/employer", { ...createdVacancy })
      .then((res) => {
        return {
          data: res.data.vacancies,
          status: res.status,
        };
      })
      .catch((e) => {
        console.log(e);
        return {
          data: e.response.data,
          status: e.response.status,
        };
      });
  },
};

export default UserVacancyService;
