import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Services() {
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: axios
      .get("https://reqres.in/api/users?page=2")
      .then((res) => res.data),
  });
  console.log(data);

  return data;
}
