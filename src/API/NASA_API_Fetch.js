import { NASA_URL } from "../constants/constants";
import { NASA_API_KEY } from "../constants/constants";

import axios from "axios";

const get_nasa_apod_api_object = async (date, api_responce_callback) => {
  try {
    const api_call_string = `${NASA_URL}planetary/apod?date=${date}&api_key=${NASA_API_KEY}`;
    const response = await axios.get(api_call_string);
    if (response && response.status == "200") {
      const api_object = {
        date: date,
        name: response.data.title,
        description: response.data.explanation,
        image_url: response.data.url,
      };
      api_responce_callback(api_object);
    } else {
      console.log("NASA API Fetch error: ", response.statusText);
    }
  } catch (error) {
    console.error(error);
  }
};

export const get_nasa_mars_api_object = async (date, api_responce_callback) => {
  try {
    const api_call_string = `${NASA_URL}mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=${NASA_API_KEY}`;
    const response = await axios.get(api_call_string);
    if (response && response.status == "200") {
      const photosArray = response.data.photos;
      if (Array.isArray(photosArray) && photosArray.length > 0) {
        const response_object = response.data.photos[0];
        const api_object = {
          date: date,
          name: response_object.rover.name,
          description: response_object.camera.full_name,
          image_url: response_object.img_src,
        };
        api_responce_callback(api_object);
      } else {
        api_responce_callback(null);
      }
    } else {
      console.log("NASA API Fetch error: ", response.statusText);
    }
  } catch (error) {
    console.error(error);
  }
};

export default get_nasa_apod_api_object;
