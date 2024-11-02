import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const LeaveScreen = () => {
  const [leaveType, setLeaveType] = useState('single');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [reason, setReason] = useState('');

  const onDateChange = (event, selectedDate, type) => {
    if (type === 'start') {
      setShowStartPicker(false);
      if (selectedDate) setStartDate(selectedDate);
    } else {
      setShowEndPicker(false);
      if (selectedDate) setEndDate(selectedDate);
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
          Tạo mới Đơn xin nghỉ
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
      <Text allowFontScaling={false} style={styles.sectionTitle}>
        Thông tin chung
      </Text>

      {/* Leave Type Toggle */}
      <View style={styles.leaveTypeContainer}>
        <TouchableOpacity
          style={[
            styles.leaveTypeButton,
            leaveType === "single" && styles.selectedButton,
          ]}
          onPress={() => setLeaveType("single")}
        >
          <Text
            allowFontScaling={false}
            style={[
              styles.leaveTypeText,
              leaveType === "single" && styles.selectedText,
            ]}
          >
            Nghỉ 1 ngày
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.leaveTypeButton,
            leaveType === "multiple" && styles.selectedButton,
          ]}
          onPress={() => setLeaveType("multiple")}
        >
          <Text
            allowFontScaling={false}
            style={[
              styles.leaveTypeText,
              leaveType === "multiple" && styles.selectedText,
            ]}
          >
            Nghỉ dài ngày
          </Text>
        </TouchableOpacity>
      </View>

      {/* Date Picker */}
      <Text allowFontScaling={false} style={styles.label}>
        Thời gian
        <Text allowFontScaling={false} style={styles.warning}>
          {" "}
          *
        </Text>
      </Text>
      {leaveType === "single" ? (
        <TouchableOpacity
          onPress={() => setShowStartPicker(true)}
          style={styles.dateInput}
        >
          <Text>{startDate.toLocaleDateString()}</Text>
          <Ionicons name="calendar-outline" size={24} style={styles.icon} />
        </TouchableOpacity>
      ) : (
        <View>
          <TouchableOpacity
            onPress={() => setShowStartPicker(true)}
            style={styles.dateInput}
          >
            <Text>Từ ngày: {startDate.toLocaleDateString()}</Text>
            <Ionicons name="calendar-outline" size={24} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowEndPicker(true)}
            style={styles.dateInput}
          >
            <Text>Đến ngày: {endDate.toLocaleDateString()}</Text>
            <Ionicons name="calendar-outline" size={24} style={styles.icon} />
          </TouchableOpacity>
        </View>
      )}

      {showStartPicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={(e, date) => onDateChange(e, date, "start")}
        />
      )}
      {showEndPicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={(e, date) => onDateChange(e, date, "end")}
        />
      )}

      {/* Reason Input */}
      <Text style={styles.label}>
        Lí do
        <Text style={styles.warning}> *</Text>
      </Text>
      <TextInput
        style={styles.textInput}
        placeholder="Nhập lí do của bạn..."
        value={reason}
        onChangeText={setReason}
      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>CẬP NHẬT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
    paddingTop: 40
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  backIcon: {
    marginRight: 10,
  },
  headerText: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    marginHorizontal: 10,
  },
  underline: {
    height: 1,
    backgroundColor: '#EAEAEA', 
    marginTop: -10, 
  },
  warning: {
    color: 'red'
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#034887',
    marginBottom: 16,
    marginTop: 20
  },
  leaveTypeContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  leaveTypeButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
  },
  selectedButton: {
    backgroundColor: '#034887',
  },
  leaveTypeText: {
    fontSize: 14,
    color: '#B1B2B4',
  },
  selectedText: {
    color: '#FFFFFF',
  },
  label: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 8,
  },
  dateInput: {  
    padding: 12,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  
  textInput: {
    height: 100,
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    textAlignVertical: 'top',
    marginBottom: 24,
  },
  submitButton: {
    position: 'absolute',
    backgroundColor: '#FF8C00',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    bottom: 16, 
    left: 16, 
    right: 16, 
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LeaveScreen;
