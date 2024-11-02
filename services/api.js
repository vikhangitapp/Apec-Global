import axios from "axios";
import { ARRAY_CONFIG } from "../constants/variable";
import axiosApiInstance from "./axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Hàm để thực hiện đăng nhập
export const loginAPI = async (login, password, ip) => {
  try {
    // Gửi yêu cầu POST tới endpoint với body chứa login và password
    const response = await axiosApiInstance.post("/auth/login", {
      login,
      password,
      ip,
    });

    // Xử lý phản hồi thành công
    return response;
  } catch (error) {
    // Xử lý lỗi
    return error.response?.data || error.message;
  }
};
export const forgotAPI = async (email) => {
  try {
    const response = await axiosApiInstance.post("/auth/forgor-password", {
      email,
    });
    return response;
  } catch (error) {
    return error.response?.data || error.message;
  }
};

// Hàm để thực hiện check-in
export const checkInAPI = async (token, la, long) => {
  try {
    let response = await axiosApiInstance.post(
      `/attendance/checkin`,
      { Latitude: la, Longitude: long },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    // Gửi yêu cầu POST tới API checkin, sử dụng token để xác thực

    // Xử lý phản hồi thành công

    return response;
  } catch (error) {
    // Xử lý lỗi
    return error.response?.data;
  }
};

// Hàm để thực hiện check-out
export const checkOutAPI = async (token, la, long) => {
  try {
    // Gửi yêu cầu POST tới API checkout, sử dụng token để xác thực
    let response = await axiosApiInstance.post(
      `/attendance/checkout`,
      { Latitude: la, Longitude: long },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    // Xử lý phản hồi thành công
    return response;
  } catch (error) {
    // Xử lý lỗi
    return error.response?.data;
  }
};

export const getAttendanceByUserAPI = async () => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    // Gửi yêu cầu GET tới API getattendancebyuser, sử dụng token để xác thực
    let response = await axiosApiInstance.post(
      "/attendance/getattendancebyuser",
      {},
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    // Xử lý phản hồi thành công
    return response.data;
  } catch (error) {
    // Xử lý lỗi

    return error.response?.data || error.message;
  }
};

export const getAttendanceToday = async () => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    const now = new Date();
    // Gửi yêu cầu GET tới API getattendancebyuser, sử dụng token để xác thực
    let response = await axiosApiInstance.post(
      "/attendance/getattendancebyuserdatenow",
      {
        date: now.getDate(),
        month: now.getMonth() + 1,
        year: now.getFullYear(),
      },
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    // Xử lý phản hồi thành công
    return response.data;
  } catch (error) {
    // Xử lý lỗi
    return error.response?.data || error.message;
  }
};

export const getUserInfoAPI = async () => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    //console.log("token getUserInfo: ",token);
    
    let response = await axiosApiInstance.post(
      "/attendance/getinfouser",
      {},
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    
    return response.data;
  } catch (error) {
    return error.response?.data || error.message;
  }
};
