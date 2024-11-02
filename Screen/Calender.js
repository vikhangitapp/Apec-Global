import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { AuthContext } from "../contexts/AuthContext";

LocaleConfig.locales["fr"] = {
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  monthNamesShort: [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May",
    "Jun.",
    "Jul.",
    "Aug.",
    "Sep.",
    "Oct.",
    "Nov.",
    "Dec.",
  ],
  dayNames: [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ],
  dayNamesShort: ["CN", "T.2", "T.3", "T.4", "T.5", "T.6", "T.7"],
  today: "Aujourd'hui",
};

LocaleConfig.defaultLocale = "fr";

const CalendarScreen = ({ navigation }) => {
  const today = new Date();
  const currentMonth = today.getMonth() + 1; // Tháng hiện tại
  const currentYear = today.getFullYear(); // Năm hiện tại
  const currentDate = today.getDate(); // Ngày hiện tại
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selected, setSelected] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false); // Trạng thái làm mới

  const { dateSuccess } = useContext(AuthContext);

  const loadData = () => {
    setIsRefreshing(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadData();
    });
    return unsubscribe;
  }, [navigation]);

  const onMonthChange = (month) => {
    setSelectedMonth(month.month);
    setSelectedYear(month.year);
  };

  const getPointAttendance = (date) => {
    const found = dateSuccess.find(
      (item) =>
        item.day === date.day &&
        item.month === selectedMonth &&
        item.year === selectedYear
    );
    return found ? found.point_attandance : 0; // Trả về điểm nếu tìm thấy, ngược lại là 0
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={() => {
            setIsRefreshing(true);
            loadData(); // Gọi hàm làm mới dữ liệu
          }}
        />
      }
    >
      <Calendar
        current={`${currentYear}-${String(currentMonth).padStart(2, "0")}-01`} // Đặt ngày hiện tại
        onMonthChange={onMonthChange}
        style={{ height: "100%" }}
        dayComponent={({ date }) => {
          const isToday =
            date.day === currentDate &&
            date.month === currentMonth &&
            date.year === currentYear;

          const isCurrentMonth =
            date.month === currentMonth && date.year === currentYear;
          const pointAttendance = isCurrentMonth
            ? getPointAttendance(date)
            : null; // Lấy điểm chỉ nếu là tháng hiện tại
          const isSunday =
            new Date(date.year, date.month - 1, date.day).getDay() === 0; // Kiểm tra Chủ nhật

          // Xác định style cho ô ngày
          let dayStyle = styles.dayContainer;
          let textColor = styles.dayText; // Mặc định màu chữ

          if (isToday) {
            dayStyle = [dayStyle, { backgroundColor: "#3c82df" }]; // Màu xanh dương cho ngày hôm nay
            textColor = [textColor, { color: "white" }]; // Chữ màu trắng cho ngày hôm nay
          } else if (pointAttendance > 0 && pointAttendance < 1) {
            dayStyle = [dayStyle, { backgroundColor: "yellow" }]; // Màu vàng nếu điểm nằm trong khoảng (0, 1)
          } else if (isCurrentMonth) {
            dayStyle = [dayStyle, { backgroundColor: "#edf7e6" }]; // Màu nền cho tháng hiện tại
          }

          // Hiển thị ngày + tháng cho ngày đầu tiên của tháng
          const displayDate =
            date.day === 1 ? `${date.day}/${date.month}` : date.day;

          return (
            <TouchableOpacity
              disabled={true}
              onPress={() => setSelected(date.dateString)}
              style={[
                dayStyle,
                selected === date.dateString && styles.selectedDayContainer,
              ]}
            >
              <Text
                allowFontScaling={false}
                style={[
                  textColor,
                  date.state === "disabled" && styles.disabledText,
                ]}
              >
                {displayDate}
              </Text>
              <Text
                allowFontScaling={false}
                style={[
                  isCurrentMonth
                    ? pointAttendance !== 0
                      ? styles.daySucces
                      : styles.dayFails
                    : styles.disabledText,
                  date.state === "disabled" && styles.disabledText,
                  isSunday ? styles.successText : {},
                  isToday ? { color: "white" } : {}, // Chữ màu trắng cho điểm nếu là ngày hôm nay
                ]}
              >
                {isCurrentMonth
                  ? isSunday
                    ? "N"
                    : pointAttendance === 0
                    ? 0
                    : pointAttendance
                  : ""}{" "}
                {/* Hiển thị giá trị cho Chủ nhật hoặc 0 nếu chưa chấm công */}
              </Text>
            </TouchableOpacity>
          );
        }}
        onDayPress={(day) => {
          setSelected(day.dateString);
        }}
        markedDates={{
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedDotColor: "blue",
          },
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  header: {
    padding: 10,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#f8f8f8", // Màu nền nhẹ
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3c82df", // Màu chữ cho header
  },
  calendarContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    overflow: "hidden",
  },
  calendar: {
    height: "100%",
  },
  dayContainer: {
    width: 50,
    height: 100,
    alignItems: "center",
    margin: 5,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  selectedDayContainer: {
    backgroundColor: "red",
  },
  dayText: {
    color: "#2d4150",
    marginTop: 10,
  },
  dayFails: { color: "red", marginTop: 5 },
  daySucces: { color: "#F08313", marginTop: 5 },
  disabledText: {
    color: "#d9e1e8",
  },
  successText: {
    color: "#28A745",
  },
  emptyDay: {
    width: 50,
    height: 100,
    margin: 5,
    borderRadius: 5,
    backgroundColor: "transparent",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
  monthItem: {
    padding: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc", // Viền dưới mỗi item
  },
  monthText: {
    fontSize: 18,
  },
  closeButton: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#3c82df",
    borderRadius: 5,
    margin: 10,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default CalendarScreen;
