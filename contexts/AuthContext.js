// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  checkInAPI,
  checkOutAPI,
  getAttendanceByUserAPI,
  getAttendanceToday,
  getUserInfoAPI,
} from "../services/api";
import axiosApiInstance from "../services/axios";
import { Alert } from "react-native";
import { jwtDecode } from "jwt-decode";
import {
  addHoursToTimeString,
  calculateDuration,
  calculateDurationHistory,
  convertTimeString,
  getCalendarByUser,
  getCurrentTimeCheckInCheckOut,
} from "../services/utils";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState("");
  const [timeCheckin, setTimeCheckIn] = useState("");
  const [fails, setFails] = useState(false);
  const [timeCheckout, setTimeCheckOut] = useState("");
  const [checkout, setCheckout] = useState("");
  const [text, setText] = useState("");
  const [alert, setAlert] = useState(false);
  const [Switch, setSwitch] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [attendanceDates, setAttendanceDates] = useState([]);
  const [dateSuccess, setDateSuccesss] = useState([]);
  const [scoreAttend, setScoreAttend] = useState(0);
  const [totalHourAttend, setTotalHourAttend] = useState("0");
  const [timeCheckinApi, setTimeCheckinApi] = useState("");
  const [timeCheckoutApi, setTimeCheckoutApi] = useState("");
  const [isCheckin, setIsCheckin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    id: "",
    avatar: "",
    email: "",
    birth: "",
    phone: "",
  });
  //const [userInfo, setUserInfo] = useState(null);
  const login = async (token) => {
    setUserToken("");
    setIsLoggedIn(false);
    if (token) {
      await AsyncStorage.setItem("userToken", JSON.stringify(token));
      setIsLoggedIn(true);
      setUserToken(token.replace(/"/g, ""));
    }
  };

  const checkIn = async (la, long) => {
    try {
      setLoading(true);
      const token = userToken;
      // console.log(token);

      if (!token) {
        console.error("No token found");
        return; // Ngừng nếu không có token
      }
      const checkInResponse = await checkInAPI(token, la, long); // Gọi API check-in
      if (checkInResponse) {
        if (checkInResponse?.status === 200) {
          setSuccess(true);
          setSwitch(true);
          setTimeCheckIn(
            checkInResponse?.data?.time
              ? checkInResponse?.data?.time.toString()
              : ""
          );
          //setTimeCheckinApi(getCurrentTimeCheckInCheckOut());
          let today = new Date().getTime();
          setAttendanceDates((prev) => {
            const updatedRecords = [
              ...prev,
              {
                created_at: today,
                checkin_time: checkInResponse?.data?.time,
              },
            ];
            return updatedRecords.sort(
              (a, b) => new Date(b.created_at) - new Date(a.created_at)
            );
          });
          setLoading(false);
        } else {
          setSwitch(true);
          setText(checkInResponse.message);
          setFails(true);
          setLoading(false);
        }
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const checkOut = async (la, long) => {
    try {
      setLoading(true);
      const token = userToken;
      // console.log(token);

      if (!token) {
        console.error("No token found");
        return; // Ngừng nếu không có token
      }
      const checkOutResponse = await checkOutAPI(token, la, long); // Gọi API check-in
      //console.log("checkout: ",checkOutResponse?.data);
      if (checkOutResponse?.status === 200) {
        setSuccess(true);
        setSwitch(false);
        setTimeCheckOut(
          checkOutResponse?.data?.time
            ? checkOutResponse?.data?.time.toString()
            : ""
        );
        //setTimeCheckoutApi(getCurrentTimeCheckInCheckOut());

        setScoreAttend(checkOutResponse?.data?.score);
        let caculate = convertTimeString(checkOutResponse?.data.scocetime);
        setTotalHourAttend(caculate);
        setAttendanceDates((prev) =>
          prev.map((attend, i) =>
            i === 0
              ? {
                  ...attend,
                  checkout_time: checkOutResponse?.data?.time,
                }
              : attend
          )
        );
        setLoading(false);
      } else {
        setSwitch(false);
        setText(checkOutResponse.message);
        setFails(true);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  // const handleGetAttendByUser = async () => {
  //   try {
  //     let userToken = AsyncStorage.getItem("userToken");
  //     let data = await axiosApiInstance.post(
  //       "/attendance/getattendancebyuser",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${userToken}`,
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     if (data) {
  //       console.log(data);
  //     }
  //   } catch (error) {
  //     console.error("Check-out failed:", error.response?.data || error.message);
  //     throw error;
  //   }
  // };
  // useEffect(()=>{
  //   handleGetAttendByUser();
  // },[])
  // const AttendanceByUser = async () => {
  //   try {
  //     const token = userToken;
  //     console.log("attendByUser" +token);

  //     if (!token) {
  //       console.error('No token found');
  //       return; // Ngừng nếu không có token
  //     }
  //     const attendanceByUserResponse = await getAttendanceByUserAPI(token); // Gọi API check-in

  //     if (attendanceByUserResponse.attendance && attendanceByUserResponse.attendance.length > 0) {
  //       // Duyệt qua từng mục trong mảng attendance
  //       attendanceByUserResponse.attendance.forEach(attendance => {
  //         console.log('AttendanceByUser response:', attendance.date);
  //       });
  //     } else {
  //       console.log("Không có thông tin chấm công.");
  //     }

  //     //console.log('AttendanceByUser response:', attendanceByUserResponse);

  //     // Có thể thêm logic để xử lý phản hồi, ví dụ:
  //     // setIsCheckedIn(true); // Nếu bạn cần theo dõi trạng thái check-in
  //   } catch (error) {
  //     console.error('AttendanceByUser error:', error.message);
  //   }
  // };
  const loadToken = async () => {
    const token = await AsyncStorage.getItem("userToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      const expirationTime = decodedToken.exp * 1000; // Chuyển sang milliseconds
      const currentTime = Date.now();
      if (currentTime < expirationTime) {
        setIsLoggedIn(true);
        setUserToken(token.replace(/"/g, ""));
      } else {
        await AsyncStorage.removeItem("userToken");
        setUserToken("");
      }
    }
  };

  const AttendanceByUser = async () => {
    try {
      setLoading(true);
      const attendanceByUserResponse = await getAttendanceByUserAPI(); // Gọi API check-in

      if (attendanceByUserResponse.attendance) {
        //console.log(attendanceByUserResponse.attendance);
        const sortedData = attendanceByUserResponse?.attendance.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setAttendanceDates(sortedData); // Lưu vào state
        const createdAtArray = attendanceByUserResponse.attendance.map(
          (item) => {
            return {
              day: item.date,
              month: item.month,
              year: item.year,
              point_attandance: item.point_attandance,
            };
          }
        );
        // Chuyển đổi chuỗi timestamp thành mảng object với day và month

        //console.log(createdAtArray);
        //console.log(createdAtArray);
        setDateSuccesss(createdAtArray);
        //setDateSuccesss(resultArray);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  const AttendenceToday = async () => {
    try {
      setLoading(true);
      const attendanceToday = await getAttendanceToday();
      //console.log(attendanceToday.attendanceWithDuration);
      if (attendanceToday.attendanceWithDuration) {
        let caculate = calculateDurationHistory(
          attendanceToday.attendanceWithDuration[0].checkin_time,
          attendanceToday.attendanceWithDuration[0].checkout_time
        );
        //console.log("duration:", attendanceToday.attendanceWithDuration);
        setTimeCheckIn(
          attendanceToday.attendanceWithDuration[0].checkin_time
            ? attendanceToday.attendanceWithDuration[0].checkin_time.toString()
            : ""
        );
        setTimeCheckOut(
          attendanceToday.attendanceWithDuration[0].checkout_time
            ? attendanceToday.attendanceWithDuration[0].checkout_time.toString()
            : ""
        );
        let caculate2 = convertTimeString(attendanceToday.scocetime);

        setScoreAttend(
          attendanceToday.attendanceWithDuration[0].point_attandance
        );
        setTotalHourAttend(caculate2);

      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const logout = async () => {
    setIsLogout(true);
    setUserToken("");
    setTimeCheckIn("");
    setTimeCheckOut("");
    setScoreAttend(0);
    setTotalHourAttend("");
    setDateSuccesss([]);
    await AsyncStorage.removeItem("userToken");
    let token = AsyncStorage.getItem("userToken");
    //console.log(token);
    setIsLoggedIn(false);
  };

  const loadUserInfo = async () => {
    try {
      const info = await getUserInfoAPI(); // Gọi API
      setUserInfo({
        name: info.attendance[0].name,
        id_staff: info.attendance[0].id_staff,
        avatar: info.attendance[0].avatar,
        email: info.attendance[0].email,
        birth: info.attendance[0].birth,
        phone: info.attendance[0].phone,
      });
    } catch (error) {}
  };
  useEffect(() => {
    // const checkLoginStatus = async () => {
    //   const token = await AsyncStorage.getItem("userToken");
    //   if (token) {
    //     setUserToken(token);
    //   }
    // };
    loadToken();
    AttendanceByUser();
    AttendenceToday();
    loadUserInfo();
    //checkLoginStatus();
  }, [userToken]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        checkIn,
        checkOut,
        AttendanceByUser,
        logout,
        userToken,
        timeCheckin,
        timeCheckout,
        attendanceDates,
        success,
        setSuccess,
        setAlert,
        alert,
        fails,
        setFails,
        Switch,
        setSwitch,
        text,
        setText,
        isLogout,
        setIsLogout,
        checkout,
        setCheckout,
        scoreAttend,
        setScoreAttend,
        dateSuccess,
        setDateSuccesss,
        totalHourAttend,
        timeCheckinApi,
        timeCheckoutApi,
        isCheckin,
        loading,
        userInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
