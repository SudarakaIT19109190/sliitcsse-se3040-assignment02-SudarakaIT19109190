import axios from "axios";
import { RoverCameras } from "./constants";

export async function getImageOfTheDay() {
  try {
    const response = await axios.get("https://api.nasa.gov/planetary/apod", {
      params: {
        api_key: process.env.NEXT_PUBLIC_NASA_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getMarsRoverImage(camera: RoverCameras, date: string) {
  try {
    const response = await axios.get(
      "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos",
      {
        params: {
          api_key: process.env.NEXT_PUBLIC_NASA_API_KEY,
          earth_date: date,
          camera: camera.toString()
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
