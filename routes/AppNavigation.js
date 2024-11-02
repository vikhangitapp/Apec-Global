import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "../Screen/SignIn";
import { AuthContext } from "../contexts/AuthContext";
import Forgot from "../Screen/Forgot";
import Iphone2Screen from "../Screen/iphone2";
import Iphone3Screen from "../Screen/iphone3";
import Iphone4Screen from "../Screen/iphone4";
import BottomTabNavigator from "./BottomTabNavigator";
import MyDrawer from "./MyDrawer";
import ForgotPassScreen from "../Screen/Forgot";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Stack = createNativeStackNavigator();

const AppNavigation = ({ navigation }) => {
  const { userToken, isLoggedIn } = useContext(AuthContext);
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const hasLaunched = await AsyncStorage.getItem("hasLaunched");
      if (hasLaunched === null) {
        // Nếu chưa mở lần nào, đánh dấu đã mở
        await AsyncStorage.setItem("hasLaunched", "true");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    };

    checkFirstLaunch();
  }, []);

  if (isFirstLaunch === null) {
    return null; // Hoặc một màn hình loading
  }
  //console.log("navigator: ", userToken);
  console.log(isFirstLaunch);
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      {!isFirstLaunch ? (
        <>
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="Forgot" component={ForgotPassScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="Forgot" component={ForgotPassScreen} />
          <Stack.Screen name="Iphone3" component={Iphone3Screen} />
          <Stack.Screen name="Iphone4" component={Iphone4Screen} />
        </>
      )}
      <Stack.Screen name="MyDrawer" component={MyDrawer} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
