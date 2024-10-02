import axios from "axios";
import { toast } from "react-toastify";
import {store} from '../redux/store';
const instance = axios.create({
    baseURL: 'http://localhost:8081/api'
  });

instance.defaults.withCredentials=true; 

// gửi tooken


// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = store.getState()?.user?.account?.access_token;
    config.headers.Authorization =  token;
    return config;
  }, function (error) {
    // Do something with request error
    
    return Promise.reject(error);
  });

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (err) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const status = err.response?.status || 500;
    console.log(status);
    switch (status) {
      // authentication (token related issues)
      case 401: {
        toast.error("Bạn chưa đăng nhập");
        window.location.href="/login";
        return Promise.reject(err);
      }

      // forbidden (permission related issues)
      case 403: {
        toast.error("Bạn chưa được cấp quyền");
        return Promise.reject(err);
      }

      // bad request
      case 400: {
        return Promise.reject(err);
      }

      // not found
      case 404: {
        return Promise.reject(err);
      }

      // conflict
      case 409: {
        return Promise.reject(err);
      }

      // unprocessable
      case 422: {
        return Promise.reject(err);
      }

      // generic api error (server related) unexpected
      default: {
        return Promise.reject(err);
      }
    }
  });

  export default instance