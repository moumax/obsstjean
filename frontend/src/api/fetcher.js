import axiosAPI from "../services/axiosAPI";

export default function fetcher(url) {
  return axiosAPI.get(url).then((res) => res.data);
}
