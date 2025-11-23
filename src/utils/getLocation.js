import axios from "axios";

const REVERSE_GEOMAPING_KEY = import.meta.env.VITE_REVERSE_GEOMAPING_KEY;
export const getLocationFromLongLat = async (lat, lng) => {
  const location = await axios.get(`https://us1.locationiq.com/v1/reverse?key=${REVERSE_GEOMAPING_KEY}&lat=${lat}&lon=${lng}&format=json`)
  return location.data.address;
}