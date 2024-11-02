import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";

const AbsenceScreen = () => {
  const [absenceDate, setAbsenceDate] = useState(new Date());
  const [fromTime, setFromTime] = useState(null);
  const [toTime, setToTime] = useState(null);
  const [reason, setReason] = useState("");

  // State variables to control visibility of pickers
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showFromTimePicker, setShowFromTimePicker] = useState(false);
  const [showToTimePicker, setShowToTimePicker] = useState(false);

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setAbsenceDate(selectedDate);
    }
  };

  const onTimeChange = (field, event, selectedTime) => {
    if (field === "from") {
      setShowFromTimePicker(false);
      if (selectedTime) {
        setFromTime(selectedTime);
      }
    } else {
      setShowToTimePicker(false);
      if (selectedTime) {
        setToTime(selectedTime);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="chevron-back-circle-outline"
          size={30}
          style={styles.backIcon}
        />
        <Text allowFontScaling={false} style={styles.headerText}>
          Tạo mới Đơn vắng mặt
        </Text>
        <View style={styles.headerIcons}>
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={24}
            style={styles.icon}
          />
          <Ionicons
            name="notifications-outline"
            size={24}
            style={styles.icon}
          />
        </View>
      </View>
      <View style={styles.underline} />
      <Text allowFontScaling={false} style={styles.title}>
        Thông tin đơn
      </Text>

      <Text allowFontScaling={false} style={styles.label}>
        Ngày vắng mặt{" "}
        <Text allowFontScaling={false} style={styles.warning}>
          {" "}
          *
        </Text>
      </Text>
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={styles.datePicker}
      >
        <Text allowFontScaling={false}>
          {absenceDate.toLocaleDateString("vi-VN")}
        </Text>
        <Ionicons name="calendar-outline" size={24} style={styles.icon} />
      </TouchableOpacity>

      <View style={styles.wrap}>
        <View style={styles.sub_wrap}>
          <Text allowFontScaling={false} style={styles.label}>
            Vắng mặt từ{" "}
            <Text allowFontScaling={false} style={styles.warning}>
              {" "}
              *
            </Text>
          </Text>
          <TouchableOpacity
            onPress={() => setShowFromTimePicker(true)}
            style={styles.timePicker}
          >
            <Text allowFontScaling={false}>
              {fromTime ? fromTime.toLocaleTimeString("vi-VN") : "hh:mm"}
            </Text>
            <AntDesign name="clockcircleo" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.sub_wrap}>
          <Text allowFontScaling={false} style={styles.label}>
            Vắng mặt đến <Text style={styles.warning}> *</Text>
          </Text>
          <TouchableOpacity
            onPress={() => setShowToTimePicker(true)}
            style={styles.timePicker}
          >
            <Text allowFontScaling={false}>
              {toTime ? toTime.toLocaleTimeString("vi-VN") : "hh:mm"}
            </Text>
            <AntDesign name="clockcircleo" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <Text allowFontScaling={false} style={styles.label}>
        Lí do{" "}
        <Text allowFontScaling={false} style={styles.warning}>
          *
        </Text>
      </Text>
      <TextInput
        allowFontScaling={false}
        style={styles.textInput}
        placeholder="Nhập lí do của bạn..."
        value={reason}
        onChangeText={setReason}
        multiline
      />

      {/* Nút cập nhật */}
      <TouchableOpacity style={styles.updateButton}>
        <Text allowFontScaling={false} style={styles.updateButtonText}>
          CẬP NHẬT
        </Text>
      </TouchableOpacity>

      {/* Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={absenceDate}
          mode="date"
          onChange={onDateChange}
        />
      )}

      {showFromTimePicker && (
        <DateTimePicker
          value={fromTime || new Date()}
          mode="time"
          onChange={(e, time) => onTimeChange("from", e, time)}
        />
      )}

      {showToTimePicker && (
        <DateTimePicker
          value={toTime || new Date()}
          mode="time"
          onChange={(e, time) => onTimeChange("to", e, time)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  backIcon: {
    marginRight: 10,
  },
  headerText: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
  },
  headerIcons: {
    flexDirection: "row",
  },
  icon: {
    marginHorizontal: 10,
  },
  underline: {
    height: 1,
    backgroundColor: "#EAEAEA",
    marginTop: -10,
  },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 16, marginTop: 20 },
  label: { fontSize: 14, color: "#333", marginTop: 16 },
  datePicker: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timePicker: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    width: 180,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    height: 100,
    textAlignVertical: "top",
  },
  updateButton: {
    position: "absolute",
    backgroundColor: "#ff9900",
    padding: 16,
    borderRadius: 50,
    alignItems: "center",
    marginTop: 20,
    bottom: 16,
    left: 16,
    right: 16,
  },
  updateButtonText: { color: "#fff", fontWeight: "bold" },

  wrap: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sub_wrap: {},

  warning: {
    color: "red",
  },
});

export default AbsenceScreen;
