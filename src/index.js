import axios from "axios";

export const fetchData = async () => {
  const response = await axios.get("https://reqres.in/api/users?page=2");
  return response.data.data;
};
