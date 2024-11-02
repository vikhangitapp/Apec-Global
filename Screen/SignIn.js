import React, { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollViewBase,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as Device from "expo-device";

import Input from "../components/Input";
import Button from "../components/Button";
import { loginAPI } from "../services/api";
import { AuthContext } from "../contexts/AuthContext";

import HomeScreen from "./Home";
import LoadingScreen from "../components/LoadingScreen";
import Notification, { ARRAY_TYPE } from "../components/Notification";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "react-native-loading-spinner-overlay";

export default function SignInScreen(props) {
  const { navigation } = props;
  const [notify, setNotify] = useState(false);
  const [notifyError, setNotifyError] = useState(false);
  const [ip, setIp] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, isLoggedIn, isLogout, setIsLogout } = useContext(AuthContext);
  const fetchDevice = async () => {
    const osView = Device.osBuildId;

    setIp(osView);
  };
  useEffect(() => {
    fetchDevice();
  }, []);
  const handleLogin = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      Keyboard.dismiss();
      setLoading(true);
      const data = await loginAPI(phone, password, ip?.length > 0 ? ip : ""); // Gọi API với phone và password
      // Xử lý sau khi đăng nhập thành công (gọi login từ AuthContext)
      if (data.data.message === "Success") {
        setNotify(true);
        setLoading(false);
        login(data.data.token);
        //console.log(data.data.token);
        if (isLoggedIn) {
          navigation.navigate("Main");
        }
      }
      if (data.status === 404) {
        setNotifyError(true);
      }
    } catch (error) {
      setLoading(false);
      setNotifyError(true);
    }
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Điều chỉnh hành vi cho iOS và Android
    >
      {/* {loading === true ? <LoadingScreen /> : ""} */}
      {loading === true ? <Spinner visible={loading} /> : ""}
      {notify && (
        <Notification
          title={"Đăng nhập"}
          message={"Đăng nhập thành công! Chúc bạn làm việc vui vẻ!"}
          duration={3000}
          type={ARRAY_TYPE.success}
          setShow={setNotify}
          show={notify}
        />
      )}
      {isLogout && (
        <Notification
          title={"Đăng xuất"}
          message={"Đăng xuất thành công!"}
          duration={3000}
          type={ARRAY_TYPE.success}
          setShow={setIsLogout}
          show={isLogout}
        />
      )}
      {notifyError && (
        <Notification
          title={"Đăng nhập"}
          message={"Đăng nhập thất bại! Vui lòng thử lại!"}
          duration={3000}
          type={ARRAY_TYPE.danger}
          setShow={setNotifyError}
          show={notifyError}
        />
      )}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <TouchableOpacity disabled={true}>
            <Text allowFontScaling={false} style={styles.title}>
              Chào mừng bạn! Mời bạn đăng nhập
            </Text>
            <Text allowFontScaling={false} style={styles.label}>
              Email hoặc số điện thoại
            </Text>
          </TouchableOpacity>
          <Input
            placeholder="Nhập email hoặc số điện thoại"
            value={phone}
            onChangeText={setPhone}
            borderColor="blue" // Màu sắc của viền
            borderWidth={0} // Độ dày của viền
            boxShadow={false}
            backgroundColor={"#ffffff"}
            borderRadius={10}
            margin={15} // Thêm margin dưới input
            padding={10}
            height={55}
          />
          <TouchableOpacity disabled={true}>
            <Text allowFontScaling={false} style={styles.label}>
              Mật khẩu
            </Text>
          </TouchableOpacity>
          <Input
            placeholder="Nhập mật khẩu"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            borderColor="blue"
            borderWidth={0}
            boxShadow={false}
            backgroundColor={"#ffffff"}
            borderRadius={10}
            margin={15}
            padding={10}
            height={55}
          />
          <TouchableOpacity disabled={true}>
            <Text
              allowFontScaling={false}
              style={styles.link}
              onPress={() => navigation.navigate("Forgot")}
            >
              Quên mật khẩu!
            </Text>
          </TouchableOpacity>
          <Button
            title="Đăng Nhập"
            onPress={() => handleLogin()}
            size={10}
            backgroundColor="#6366f1"
            borderRadius={50}
            boxShadow={false}
            margin={10}
            padding={15}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  // scrollContainer: {
  //   flexGrow: 1,
  //   justifyContent: "center",
  // },
  // container: {
  //   flex: 1,
  //   justifyContent: "center",
  //   paddingHorizontal: 40,

  // },
  // accountText: {
  //   color: "#2E2A36",
  //   fontSize: 16,
  //   marginBottom: 5,
  //   marginTop: 20
  // },
  // passText: {
  //   color: "#2E2A36",
  //   fontSize: 16,
  //   marginBottom: 5,
  // },
  // wrapBack: {
  //   marginBottom: 30,
  //   flexDirection: "row",
  //   alignItems: "center",
  // },
  // iconBack: {
  //   fontSize: 20,
  // },
  // backText: {
  //   color: "#2E2A36",
  //   fontSize: 16,
  //   marginLeft: 10,
  // },
  // welcomeText: {
  //   fontSize: 30,
  //   fontWeight: "bold",
  //   color: "#4A4A4A",
  //   marginBottom: -8,
  // },
  // loginText: {
  //   fontSize: 30,
  //   fontWeight: "bold",
  //   color: "#4A4A4A",
  //   marginBottom: 25,
  // },
  // input: {
  //   height: 50,
  //   borderColor: "#E5E7EB",
  //   borderWidth: 1,
  //   borderRadius: 8,
  //   paddingHorizontal: 15,
  //   backgroundColor: "#FFFFFF",
  //   marginBottom: 15,
  // },
  // forgotPasswordText: {
  //   color: "#6E53A6",
  //   fontSize: 13,
  //   textAlign: "left",
  //   marginBottom: 5,
  //   textDecorationLine: "underline",
  // },
  // checkboxContainer: {
  //   flexDirection: "row",
  //   marginBottom: 20,
  // },
  // checkbox: {
  //   //alignSelf: 'center',
  // },
  // label: {
  //   margin: 8,
  //   color: "#6B7280",
  // },
  // button: {
  //   backgroundColor: "blue",
  //   paddingVertical: 15,
  //   borderRadius: 40,
  //   alignItems: "center",
  //   marginBottom: 20,
  //   marginTop: 20
  // },
  // buttonText: {
  //   color: "#FFFFFF",
  //   fontSize: 16,
  //   fontWeight: "bold",
  // },
  // signUpText: {
  //   color: "#2E2A36",
  //   textAlign: "center",
  // },
  // signUpLink: {
  //   color: "#6E53A6",
  //   fontWeight: "bold",
  //   textDecorationLine: "underline",
  // },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#e8f2ff",
  },
  title: {
    width: 250,
    fontSize: 24,
    marginBottom: 20,
    marginLeft: 16,
  },
  label: {
    fontWeight: "300",
    marginLeft: 16,
    marginTop: 15,
  },
  link: {
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 16,
    marginRight: 16,
    color: "#6366f1",
    fontWeight: "350",
    textDecorationLine: "underline",
  },
});
