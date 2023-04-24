import axios, {AxiosInstance} from "axios";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    headers: {
        "Content-type": "application/json",
        Accept: "application/json",
    },
});

export default axiosInstance;
