import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";



const CreateScreen = () => {
  const requests = [
    {
      id: "1",
      type: "Đơn xin nghỉ",
      icon: "umbrella-outline",
      description: "Đơn xin nghỉ phát sinh khi bạn muốn nghỉ nhiều ngày làm việc",
      
    },
    {
      id: "2",
      type: "Đơn vắng mặt",
      icon: "person-outline",
      description: "Đơn xin vắng mặt phát sinh khi bạn có nhu cầu vắng mặt 1 khoảng thời gian trong ca làm việc",
      
    },
    {
      id: "3",
      type: "Đơn checkin/out",
      icon: "checkmark-circle-outline",
      description: "Đơn checkin/out phát sinh khi bạn quên chấm công lúc đến hoặc lúc về",
      
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Ionicons name={item.icon} size={24} color="#4F8EF7" />
        <View style={styles.info}>
          <Text allowFontScaling={false} style={styles.title}>
            {item.type}
          </Text>
          <Text allowFontScaling={false} style={styles.time}>
            {item.description}
          </Text>
        </View>
        <Text
          allowFontScaling={false}
          style={[styles.status, { backgroundColor: item.statusColor }]}
        >
          {item.status}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="chevron-back-circle-outline"
          size={30}
          style={styles.backIcon}
        />
        <Text allowFontScaling={false} style={styles.headerText}>
          Tạo mới đơn từ
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
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF",
    paddingTop: 50,
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
    marginLeft: 130,
  },
  icon: {
    marginHorizontal: 10,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#E9F3FF",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  headerFilter: {
    fontSize: 16,
    color: "#333",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  filterButton: {
    padding: 5,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  list: {
    paddingBottom: 60,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#B9BDC1",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  info: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
 
  time: {
    fontSize: 14,
    color: "#B1B2B4",
    marginTop: 5,
    lineHeight: 18
  },
  reason: {
    fontSize: 14,
    color: "#888",
    marginTop: 5,
  },
  status: {
    fontSize: 12,
    color: "#fff",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  footer: {
    alignItems: "center",
    bottom: 25,
    shadowColor: "#000", // Màu shadow
    shadowOpacity: 0.3, // Độ mờ của shadow
    shadowRadius: 6, // Độ lan tỏa của shadow
    elevation: 5,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F08313",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  addButtonText: {
    color: "black",
    fontSize: 16,
    marginLeft: 8,
    marginTop: 10,
  },
});

export default CreateScreen;
