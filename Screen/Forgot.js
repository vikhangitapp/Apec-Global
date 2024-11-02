import React, { useContext, useState } from "react";
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
import AntDesign from "@expo/vector-icons/AntDesign";
import Input from "../components/Input";
import Button from "../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { forgotAPI } from "../services/api";
import LoadingScreen from "../components/LoadingScreen";
import Notification, { ARRAY_TYPE } from "../components/Notification";
export default function Forgot({ navigation }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [notify, setNotify] = useState(false);
  const [notifyFails, setNotifyFails] = useState(false);
  const [forgot, setForgot] = useState(false);
  const handleForgotPassword = async () => {
    try {
      Keyboard.dismiss();
      setLoading(true);
      const data = await forgotAPI(email);
      if (data.status === 200) {
        setLoading(false);
        setNotify(true);
        navigation.navigate("SignIn");
      } else if (data.status === 404) {
        setLoading(false);
        setForgot(true);
        setNotifyFails(true);
      } else {
        setLoading(false);
        setNotifyFails(true);
      }
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Điều chỉnh hành vi cho iOS và Android
    >
      {loading === true ? <LoadingScreen /> : ""}
      {notify && (
        <Notification
          title={"Gửi mail"}
          message={
            "Gửi mail cấp lại mật khẩu mới thành công! Vui lòng kiểm tra mail"
          }
          duration={3000}
          type={ARRAY_TYPE.success}
          setShow={setNotify}
          show={notify}
        />
      )}
      {notifyFails && (
        <Notification
          title={"Gửi mail"}
          message={
            forgot === true
              ? "Email chưa tồn tại! Vui lòng kiểm tra lại thông tin mail"
              : "Gửi mail thất bại! Vui lòng kiểm tra lại thông tin mail"
          }
          duration={3000}
          type={ARRAY_TYPE.danger}
          setShow={setNotifyFails}
          show={notifyFails}
        />
      )}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.btnBack}
            onPress={() => navigation.navigate("SignIn")}
          >
            <AntDesign name="leftcircleo" style={styles.iconBack} />
            <Text allowFontScaling={false} style={styles.textBack}>
              Quay lại
            </Text>
          </TouchableOpacity>
          <TouchableOpacity disabled={true}>
            <Text allowFontScaling={false} style={styles.title}>
              Quên mật khẩu?
            </Text>
            <Text allowFontScaling={false} style={styles.note}>
              Vui lòng nhập địa chỉ email mà bạn đã sử dụng để đăng ký tài
              khoản. Chúng tôi sẽ gửi hướng dẫn đặt lại mật khẩu đến email của
              bạn
            </Text>
          </TouchableOpacity>
          <TouchableOpacity disabled={true}>
            <Text allowFontScaling={false} style={styles.label}>
              Email
            </Text>
          </TouchableOpacity>
          <Input
            placeholder="Nhập email bạn đã sử dụng để đăng ký"
            borderColor="blue" // Màu sắc của viền
            borderWidth={0} // Độ dày của viền
            boxShadow={false}
            backgroundColor={"#ffffff"}
            borderRadius={10}
            onChangeText={setEmail}
            margin={15} // Thêm margin dưới input
            padding={10}
            height={55}
          />
          <Button
            title="Gửi ngay"
            onPress={() => handleForgotPassword()}
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
  container: {
    height: "100%",
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#e8f2ff",
  },
  title: {
    width: 250,
    fontSize: 24,
    marginBottom: 20,
    marginLeft: 16,
    marginTop: 40,
  },
  label: {
    fontWeight: "300",
    marginLeft: 16,
    marginTop: 20,
  },
  note: {
    marginLeft: 16,
    fontWeight: "300",
  },
  btnBack: {
    marginLeft: 16,
    display: "flex",
    flexDirection: "row",
    width: 90,
    justifyContent: "space-between",
    marginTop: 100,
  },
  iconBack: {
    fontSize: 18,
  },
});
