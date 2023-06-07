import axios from "../axios.js";

const CategoryService = {
  getCategories: () => {
    return axios
      .get("/categories")
      .then((res) => {
        return {
          data: res.data.categories.sort((a, b) =>
            a.categoryName.localeCompare(b.categoryName)
          ),
          status: res.status,
        };
      })
      .catch((e) => {
        console.log(e);
        return e;
      });
  },
};

export default CategoryService;
