import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import HomeScreen from "../Screen/Home";
import CalendarScreen from "../Screen/Calender";
import { Ionicons } from "@expo/vector-icons";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Salary from "../Screen/Salary";
import Profile from "../Screen/Profile";
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const [tabKey, setTabKey] = useState(0); // State để quản lý key

  return (
    <Tab.Navigator options={{ borderWidth: "none" }}>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: "Trang chủ",
          headerTitleAllowFontScaling: false,
          headerTitleAlign:"center",
          headerTitleStyle:{
            textAlign:"center"
          },
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={size} color={color} />
          ),
          tabBarAllowFontScaling: false,
        }}
        name="Home"
        component={HomeScreen}
      />

      <Tab.Screen
        options={{
          tabBarLabel: "Bảng công",
          headerTitleAllowFontScaling: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
          tabBarAllowFontScaling: false,
        }}
        name="Bảng công"
        component={CalendarScreen}
        initialParams={{
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear(), // Đúng
        }}
        listeners={{
          tabPress: () => setTabKey((prev) => prev + 1), // Tăng key khi tab được chọn
        }}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: "Bảng lương",
          headerTitleAllowFontScaling: false,
          
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="attach-money" size={size} color={color} />
          ),
          tabBarAllowFontScaling: false,
        }}
        name="Attend1"
        component={Salary}
      />
      <Tab.Screen
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#e8f2ff" },
          tabBarLabel: "Thông tin",
          headerTitleAllowFontScaling: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user" size={size} color={color} />
          ),
          tabBarAllowFontScaling: false,
        }}
        name="Thông tin"
        component={Profile}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});

export default BottomTabNavigator;
