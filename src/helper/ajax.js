// ajax.js

import axiosInstance from "./axiosConfig";

const get = (url, config) => axiosInstance.get(url, config);

const post = (url, data, config) => axiosInstance.post(url, data, config);
const put = (url, data, config) => axiosInstance.put(url, data, config);

const remove = (url, config) => axiosInstance.delete(url, config);

export { get, post, put, remove };
