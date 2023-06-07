import axios from "../axios.js";

const LocationService = {
  getLocations: () => {
    return axios
      .get("/locations")
      .then((res) => {
        return {
          data: res.data.locations.sort((a, b) =>
            a.locationName.localeCompare(b.locationName)
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

export default LocationService;
