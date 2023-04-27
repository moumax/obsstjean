import axiosAPI from "../services/axiosAPI";

export default function fetcher(url, method = "GET", data = null) {
  const options = { method };
  if (data) {
    options.data = data;
  }
  return axiosAPI(url, options).then((res) => res.data);
}
