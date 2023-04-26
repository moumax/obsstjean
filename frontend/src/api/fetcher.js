import axiosAPI from "../services/axiosAPI";

function fetcher(url) {
  return axiosAPI.get(url).then((res) => res.data);
}

export default fetcher;
