import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
/**
 * Creates a config instance to connect with the warker server
 * @const {AxiosInstance}
 * */
const axiosInstance = axios.create({
  baseURL: 'https://85ef8254cca5.ngrok.io', // change every 2 hours
  timeout: 5000,
});

/**
 * Add token after making request
 */
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
export default axiosInstance;
