import axios from "axios";
const BASE_URL = "http://localhost:3000/";

export default axios.create({
  baseURL: BASE_URL,
});

export const api = async () => {
  const result = await axios.get(`${BASE_URL}data.json`);
  return result.data;
};
