import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Platform,
  ScrollView,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Fontisto from "@expo/vector-icons/Fontisto";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Octicons from "@expo/vector-icons/Octicons";

import AntDesign from "@expo/vector-icons/AntDesign";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AuthContext } from "../contexts/AuthContext";
import { formatDateStringBirth } from "../services/utils";
import Dialogs, { TYPES } from "../components/Dialogs";
const Profile = () => {
  const { userInfo } = useContext(AuthContext);
  const [alert, setAlert] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {alert === true && (
        <Dialogs
          title={"Thông báo"}
          message={"Tính năng đang phát triển"}
          duration={3000}
          type={TYPES.danger}
          setShow={setAlert}
          show={alert}
        />
      )}
      <View style={styles.top}>
        <View style={styles.header}>
          <View style={styles.btnBack}>
            {/* <AntDesign name="leftcircleo" style={styles.iconBack} /> */}
          </View>
        </View>
        <View style={styles.avatar}>
          <TouchableOpacity style={styles.formImage}>
            <Image
              style={styles.image}
              source={{
                uri: userInfo.avatar,
              }}
            />
            <View style={styles.iconCamera}>
              <MaterialCommunityIcons
                name="camera-plus-outline"
                size={24}
                color="black"
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.infoPostion}>
          <Text allowFontScaling={false} style={styles.name}>
            {userInfo.name}
          </Text>
          <Text allowFontScaling={false} style={styles.idUser}>
            {userInfo.id_staff}
          </Text>
          <Text allowFontScaling={false} style={styles.positionName}>
            Phòng chức năng | Chuyên viên kỹ thuật
          </Text>
          <Text allowFontScaling={false} style={styles.status}>
            "Không có việc gì khó, chỉ sợ không có tiền"
          </Text>
        </View>
      </View>
      <ScrollView style={styles.bottom}>
        <Text allowFontScaling={false} style={styles.title}>
          Thông tin cá nhân
        </Text>
        <View style={styles.infoCareer}>
          <View style={styles.iconText}>
            <AntDesign name="phone" size={24} color="gray" />
            <Text
              allowFontScaling={false}
              style={{ color: "gray", marginLeft: 10 }}
            >
              Số điện thoại
            </Text>
          </View>

          <Text allowFontScaling={false} style={styles.textInfo}>
            {userInfo.phone}
          </Text>
        </View>
        <View style={styles.infoCareer}>
          <View style={styles.iconText}>
            <Fontisto name="email" size={24} color="gray" />
            <Text
              allowFontScaling={false}
              style={{ color: "gray", marginLeft: 10 }}
            >
              Email
            </Text>
          </View>
          <Text allowFontScaling={false} style={styles.textInfo}>
            {userInfo.email}
          </Text>
        </View>
        <View style={styles.infoCareer}>
          <View style={styles.iconText}>
            <FontAwesome name="birthday-cake" size={24} color="gray" />
            <Text
              allowFontScaling={false}
              style={{ color: "gray", marginLeft: 10 }}
            >
              Ngày sinh
            </Text>
          </View>
          <Text allowFontScaling={false} style={styles.textInfo}>
            {formatDateStringBirth(userInfo.birth)}
          </Text>
        </View>
        <View style={styles.infoCareer}>
          <View style={styles.iconText}>
            <AntDesign name="calendar" size={24} color="gray" />
            <Text
              allowFontScaling={false}
              style={{ color: "gray", marginLeft: 10 }}
            >
              Ngày tham gia
            </Text>
          </View>
          <Text allowFontScaling={false} style={styles.textInfo}>
            0123124
          </Text>
        </View>
        <Text
          allowFontScaling={false}
          style={[styles.title, { marginTop: 30 }]}
        >
          Tiện ích của tôi
        </Text>
        <View style={styles.listConvenience}>
          <TouchableOpacity
            onPress={() => setAlert(true)}
            style={[styles.Convenience, { backgroundColor: "#e8f2ff" }]}
          >
            <MaterialCommunityIcons
              name="card-text-outline"
              size={24}
              color="black"
              style={styles.iconConvenience}
            />
            <Text allowFontScaling={false} style={styles.textConvenience}>
              Đơn từ
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setAlert(true)}
            style={[styles.Convenience, { backgroundColor: "#f1f8ec" }]}
          >
            <MaterialCommunityIcons
              name="file-document-edit-outline"
              size={24}
              color="black"
              style={styles.iconConvenience}
            />
            <Text allowFontScaling={false} style={styles.textConvenience}>
              Công việc
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setAlert(true)}
            style={[styles.Convenience, { backgroundColor: "#fef2e8" }]}
          >
            <MaterialCommunityIcons
              name="file-document-outline"
              size={24}
              color="black"
              style={styles.iconConvenience}
            />
            <Text allowFontScaling={false} style={styles.textConvenience}>
              Tài liệu
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setAlert(true)}
            style={[styles.Convenience, { backgroundColor: "#fae9fb" }]}
          >
            <AntDesign
              style={styles.iconConvenience}
              name="calendar"
              size={24}
              color="black"
            />
            <Text allowFontScaling={false} style={styles.textConvenience}>
              Lịch
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  top: {
    backgroundColor: "#e8f2ff",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: 15,
  },
  bottom: {
    backgroundColor: "white",
    padding: 20,
    paddingTop: 5,
  },
  header: {},
  avatar: {
    // flex: Platform.OS === "ios" ? 0.5 : 0,
  },
  formImage: {
    marginTop: 5,
    marginBottom: 10,
    position: "relative",
    margin: "auto",

    width: 100,
    height: 100,
  },
  image: {
    width: "100%",
    height: "100%",
    // flex: 1,
    borderWidth: 0.1,

    borderRadius: 50,
  },
  iconCamera: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "white",
    padding: 5,
    borderRadius: 50,
  },
  infoPostion: {
    // flex: Platform.OS === "os" ? 1 : 0.8,
  },
  name: {
    textAlign: "center",
    fontWeight: "500",
    fontSize: 21,
  },
  idUser: {
    textAlign: "center",
    fontWeight: "300",
    color: "gray",
  },
  positionName: {
    fontSize: 15,
    textAlign: "center",
    marginTop: 10,
  },
  status: {
    textAlign: "center",
    marginTop: 10,
    color: "gray",
  },
  infoCareer: {
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconText: {
    display: "flex",
    flexDirection: "row",
  },
  textInfo: {
    color: "gray",
  },
  title: {
    fontSize: 20,
    marginTop: 10,
  },
  listConvenience: {
    // height: 150,
    paddingTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  Convenience: {
    padding: 19,

    borderRadius: 20,
  },
  textConvenience: {
    textAlign: "center",
  },
  iconConvenience: {
    textAlign: "center",
  },
  textBack: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 20,
  },
});

export default Profile;
