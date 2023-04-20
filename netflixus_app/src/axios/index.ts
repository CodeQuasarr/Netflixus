import axios, { AxiosInstance } from "axios";

const http: AxiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/",
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

export default http;
