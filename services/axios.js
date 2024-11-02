import axios from "axios";
import { ARRAY_CONFIG } from "../constants/variable";
import AsyncStorage from "@react-native-async-storage/async-storage";

const axiosApiInstance = axios.create({
  baseURL: ARRAY_CONFIG.url_vip,
});



export default axiosApiInstance;
