import React, { useEffect, useState, useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignInScreen from "../Screen/SignIn";
import Iphone3Screen from "../Screen/iphone3";
import Iphone4Screen from "../Screen/iphone4";
import Forgot from "../Screen/Forgot";
import BottomTabNavigator from "./BottomTabNavigator";
import { AuthContext } from "../contexts/AuthContext";
import CustomDrawerContent from "../components/CustomDrawer";

const Drawer = createDrawerNavigator();

const MyDrawer = ({ navigation }) => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerLockMode: "locked-closed",
        headerShown: false,
        drawerStyle: {
          backgroundColor: "#f4f4f4",
          width: 240,
        },
      }}
    >
      <Drawer.Screen name="Main" component={BottomTabNavigator} />
    </Drawer.Navigator>
  );
};

export default MyDrawer;
