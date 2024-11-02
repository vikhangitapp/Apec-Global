import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import {
  checkInAPI,
  getAttendanceByUserAPI,
  getAttendanceToday,
  getCurrentTimeFormatted,
} from "../services/api";
import Button from "../components/Button";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import * as Application from "expo-application";
import * as Location from "expo-location";
import Spinner from "react-native-loading-spinner-overlay";
import {
  formatDateString,
  getDayName,
  convertTimeFormat,
  calculateDurationHistory,
  addHoursToTimeString,
  isCurrentTimeAfterOneHour,
} from "../services/utils";
import Dialogs, { TYPES } from "../components/Dialogs";

const HomeScreen = ({ navigation }) => {
  // const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [long, setLong] = useState("");
  const [la, setLa] = useState("");
  const [canClick, setCanClick] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [notifyAlert, setNotifyAlert] = useState(false);

  const {
    checkIn,
    checkOut,
    attendanceDates,
    timeCheckin,
    timeCheckout,
    success,
    setSuccess,
    fails,
    text,
    Switch,
    setFails,
    userInfo,
    scoreAttend,
    totalHourAttend,
    loading,
  } = useContext(AuthContext);

  useEffect(() => {
    const getLocation = async () => {
      setLoadingLocation(true);
      // Yêu cầu quyền truy cập vị trí
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Quyền truy cập vị trí bị từ chối");

        return;
      }

      // Lấy vị trí hiện tại
      let currentLocation = await Location.getCurrentPositionAsync({});
      if (currentLocation.coords.latitude && currentLocation.coords.longitude) {
        setLocation(currentLocation);
        setLa(currentLocation.coords.latitude);
        setLong(currentLocation.coords.longitude);
        setLoadingLocation(false);
      }
    };

    getLocation();
  }, []);

  const handleCheckIn = async () => {
    //checkIn(10.7485338, 106.6265117);
    checkIn(la, long);
  };
  const handleCheckOut = () => {
    //checkOut(10.7485338, 106.6265117);
    checkOut(la, long);
  };
  return (
    <SafeAreaView style={styles.container}>
      {loadingLocation === true && <Spinner visible={loadingLocation} />}
      {success && (
        <Dialogs
          title={"Chấm công thành công"}
          message={
            Switch === true
              ? `Checkin thành công lúc \n ${new Date().getHours()} giờ ${new Date().getMinutes()} phút ${new Date().getSeconds()} giây`
              : `Checkout thành công lúc \n ${new Date().getHours()} giờ ${new Date().getMinutes()} phút ${new Date().getSeconds()} giây`
          }
          duration={3000}
          type={TYPES.success}
          setShow={setSuccess}
          show={success}
        />
      )}
      {fails && (
        <Dialogs
          title={Switch === true ? "Chấm công thất bại" : "Checkout thất bại"}
          message={text}
          duration={3000}
          type={TYPES.danger}
          setShow={setFails}
          show={fails}
        />
      )}
      {notifyAlert && (
        <Dialogs
          title={"Thông báo"}
          message={"Tính năng đang phát triển"}
          duration={3000}
          type={TYPES.danger}
          setShow={setNotifyAlert}
          show={notifyAlert}
        />
      )}

      <View style={styles.header}>
        <View style={styles.wrapper}>
          <TouchableOpacity
            style={styles.formImage}
            onPress={() => navigation.openDrawer()}
          >
            <Image
              style={styles.image}
              source={{
                uri: "https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png",
              }}
            />
          </TouchableOpacity>
          <View style={styles.middle}>
            <Text allowFontScaling={false} style={{ fontSize: 12 }}>
              Xin Chào !!
            </Text>
            <Text allowFontScaling={false} style={styles.title}>
              {userInfo?.name ? userInfo?.name : ""}
            </Text>
            <Text allowFontScaling={false} style={styles.dateTime}>
              {getDayName()}, {new Date().getDate()}.{new Date().getMonth() + 1}
              .{new Date().getFullYear()}
            </Text>
          </View>
        </View>
        <View style={styles.action}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setNotifyAlert(true)}
          >
            <Ionicons style={styles.icon} name="chatbubble-ellipses-outline" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setNotifyAlert(true)}
          >
            <Feather style={styles.icon} name="bell" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.attendBar}>
          <View style={styles.checkInBar}>
            <Text allowFontScaling={false} style={styles.titleCheckIn}>
              Giờ làm
            </Text>
            <Text allowFontScaling={false} style={styles.time}>
              {timeCheckin ? convertTimeFormat(timeCheckin) : "--:--"}
            </Text>
            <Button
              title="Vào làm"
              size={10}
              backgroundColor={timeCheckin?.length > 0 ? "#B0BEC5" : "#F08314"}
              onPress={handleCheckIn}
              borderRadius={50}
              boxShadow={false}
              disa={timeCheckin?.length > 0 ? true : false}
              margin={10}
              padding={15}
            />
            <Text allowFontScaling={false} style={styles.alert}>
              {timeCheckin === "8:00:00" ? "Đến đúng giờ" : "Đến trễ giờ"}
            </Text>
          </View>
          <View style={styles.checkOutBar}>
            <Text allowFontScaling={false} style={styles.titleCheckIn}>
              Giờ ra
            </Text>
            <Text allowFontScaling={false} style={styles.time}>
              {timeCheckout ? convertTimeFormat(timeCheckout) : "--:--"}
            </Text>
            <Button
              title="Ra về"
              disa={
                timeCheckout?.length > 0 && timeCheckin !== "" ? true : false
              }
              size={10}
              backgroundColor={
                timeCheckin?.length <= 0 || timeCheckout?.length > 0
                  ? "#B0BEC5"
                  : "#034887"
              }
              onPress={handleCheckOut}
              borderRadius={50}
              boxShadow={false}
              margin={10}
              padding={15}
            />
            <Text allowFontScaling={false} style={styles.alert}>
              {timeCheckout >= "17:00:00" ? "Ra về đúng giờ" : "Ra về sớm"}
            </Text>
          </View>
        </View>
        <View style={styles.totalAttend}>
          <View style={styles.view}>
            <View style={styles.attendTotal}>
              <Text allowFontScaling={false} style={styles.textTotalAttend}>
                Tổng giờ làm
              </Text>
              <Text allowFontScaling={false} style={styles.countAttend}>
                {totalHourAttend !== null || totalHourAttend !== undefined
                  ? totalHourAttend
                  : "--"}
              </Text>
            </View>
            <View style={styles.attendTotal}>
              <Text allowFontScaling={false} style={styles.textTotalAttend}>
                Điểm công
              </Text>
              <Text allowFontScaling={false} style={styles.countAttend}>
                {scoreAttend !== null || scoreAttend !== undefined
                  ? scoreAttend
                  : "--"}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.list}>
        <Text allowFontScaling={false} style={styles.titleHistory}>
          Lịch sử chấm công
        </Text>
        <ScrollView
          style={styles.listScroll}
          showsVerticalScrollIndicator={false}
        >
          {attendanceDates.length > 0 ? (
            attendanceDates.map((item, index) => {
              const checkinTime = item.checkin_time
                ? new Date(item.checkin_time)
                : null;
              const checkoutTime = item.checkout_time
                ? new Date(item.checkout_time)
                : null;
              let caculate = calculateDurationHistory(
                item.checkin_time,
                item.checkout_time
              );
              return (
                <View key={index} style={styles.item}>
                  <View style={styles.childItem}>
                    <Text allowFontScaling={false} style={styles.dateAttend}>
                      {item.created_at
                        ? formatDateString(item.created_at)
                        : "Thứ năm, 25.10.2024"}
                    </Text>
                    <Text
                      allowFontScaling={false}
                      style={styles.totalDateAttend}
                    >
                      {item.checkin_time > "08:00:00" &&
                      item.checkout_time < "17:00:00"
                        ? `Cả ngày - ${caculate ? caculate : "--:--"}`
                        : `Nửa ngày - ${caculate ? caculate : "--:--"}`}
                    </Text>
                  </View>
                  <View style={styles.childItem}>
                    <View style={styles.childInChildItem}>
                      <View style={styles.viewIn}>
                        <Text
                          allowFontScaling={false}
                          style={{ color: "white" }}
                        >
                          VÀO
                        </Text>
                      </View>
                      <View style={styles.viewOut}>
                        <Text
                          allowFontScaling={false}
                          style={{ color: "white" }}
                        >
                          RA
                        </Text>
                      </View>
                    </View>
                    <View style={styles.childInChildItem}>
                      {item.checkin_time.toString() > "08:00:00" ? (
                        <Text
                          allowFontScaling={false}
                          style={styles.timeInLate}
                        >
                          {item.checkin_time
                            ? convertTimeFormat(item.checkin_time)
                            : "--:--"}
                        </Text>
                      ) : (
                        <Text allowFontScaling={false} style={styles.timeIn}>
                          {item.checkin_time
                            ? convertTimeFormat(item.checkin_time)
                            : "--:--"}
                        </Text>
                      )}
                      {item.checkout_time < "17:00:00" ? (
                        <Text allowFontScaling={false} style={styles.timeOut}>
                          {item.checkout_time
                            ? convertTimeFormat(item.checkout_time)
                            : "--:--"}
                        </Text>
                      ) : (
                        <Text allowFontScaling={false} style={styles.timeOut}>
                          {item.checkout_time
                            ? convertTimeFormat(item.checkout_time)
                            : "--:--"}
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
              );
            })
          ) : (
            <Text allowFontScaling={false} style={styles.textNoHistory}>
              Chưa có lịch sử chấm công
            </Text>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    paddingTop: Platform.OS === "ios" ? 0 : 30,
  },
  header: {
    alignItems: "center",
    // flex: 1.5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: Platform.OS === "ios" ? 10 : 20,
    paddingHorizontal: 10,
  },
  formImage: {
    padding: 2,
    // flex: 1.3,
    width: 70,
    height: 70,
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 50,
  },
  middle: {
    padding: 2,
    // flex: 4,
  },
  title: {
    width: 120,
    fontSize: 17,
    fontWeight: "500",
    flexWrap: "wrap",
  },
  dateTime: {
    color: "#9cafad",
  },
  action: {
    flexDirection: "row",
    display: "flex",
  },
  iconContainer: {
    width: 50, // Chiều rộng của vùng chứa biểu tượng
    height: 50, // Chiều cao của vùng chứa biểu tượng
    borderRadius: 30, // Đặt borderRadius bằng nửa chiều rộng/chiều cao
    backgroundColor: "#eaeaea", // Màu nền cho vùng chứa
    justifyContent: "center", // Căn giữa nội dung theo chiều dọc
    alignItems: "center", // Căn giữa nội dung theo chiều ngang
    marginLeft: Platform.OS === "ios" ? 16 : 10,
  },
  icon: {
    fontSize: 25,
    padding: 5,
  },
  content: {
    // flex: 7,
    padding: 2,
    marginTop: 10,
  },
  list: {
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  titleHistory: {
    marginBottom: 10,
    padding: Platform.OS === "ios" ? 2 : 5,
    fontSize: 20,
  },
  listScroll: {
    padding: 2,
  },
  item: {
    borderWidth: 0.2,
    padding: 10,
    display: "flex",
    flexDirection: "row",
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  childItem: {
    flex: 1,

    padding: 10,
  },
  attendBar: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-around",
  },
  checkInBar: {
    flex: 1,
    backgroundColor: "#f1f8ec",
    padding: 20,
    borderRadius: 10,
  },
  checkOutBar: {
    flex: 1,
    backgroundColor: "#fef2e8",
    padding: 20,
    borderRadius: 10,
  },
  titleCheckIn: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 10,
    color: "#2e2a36",
    fontWeight: "300",
  },
  time: {
    textAlign: "center",
    marginBottom: 10,
    marginTop: 10,
    fontSize: 25,
    color: "#27a745",
  },
  alert: {
    textAlign: "center",
    marginBottom: 10,
    marginTop: 10,
    color: "#b1b2b4",
  },
  totalAttend: {
    paddingHorizontal: 10,
  },
  view: {
    borderRadius: 10,
    backgroundColor: "#eaeef6",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  countAttend: {
    fontSize: 17,
    color: "#0056d2",
  },
  totalAttendTime: {
    fontSize: 25,
    color: "#0056d2",
  },
  dateAttend: {},
  totalDateAttend: {
    color: "#9cafad",
  },
  childInChildItem: {
    gap: 10,
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  viewIn: {
    backgroundColor: "#f08314",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  viewOut: {
    borderWidth: 0.1,
    backgroundColor: "#034887",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 20,
  },
  timeIn: {
    marginRight: 5,
  },
  timeInLate: {
    marginRight: 5,
    color: "red",
  },
  timeOut: {
    marginRight: 5,
    color: "red",
  },
  timeOutLate: {
    marginRight: 5,
    color: "red",
  },
  textNoHistory: {
    textAlign: "center",
    color: "gray",
  },
  attendTotal: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  textTotalAttend: {
    fontSize: 17,
    color: "#2e2a36",
    fontWeight: "300",
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
});

export default HomeScreen;
