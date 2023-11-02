// ajax.js

import axiosInstance from "./axiosConfig";

const get = (url, config) => axiosInstance.get(url, config);

const post = (url, data, config) => axiosInstance.post(url, data, config);

export { get, post };
