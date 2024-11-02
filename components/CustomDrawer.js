import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
const CustomDrawerContent = ({ navigation }) => {
  const { logout, isLoggedIn } = useContext(AuthContext);

  return (
    <View style={styles.drawerContainer}>
      <Text allowFontScaling={false} style={styles.drawerHeader}>
        APEC GLOBAL
      </Text>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => {
          navigation.navigate("Home"); // Điều hướng về Home
          navigation.closeDrawer(); // Đóng Drawer
        }}
      >
        <Text allowFontScaling={false} style={styles.drawerItemText}>
          Trang chủ
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.drawerItem}
        onPress={async () => {
          await logout();
         //await AsyncStorage.removeItem("hasLaunched")
          navigation.closeDrawer(); // Đóng Drawer
          if (!isLoggedIn) {
            navigation.navigate("SignIn");
          }
        }}
      >
        <Text allowFontScaling={false} style={styles.drawerItemTextSignOut}>
          Đăng Xuất
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  drawerContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  drawerHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#0056d2",
  },
  drawerItem: {
    paddingVertical: 15,
  },
  drawerItemText: {
    fontSize: 18,
  },
  drawerItemTextSignOut: {
    color: "red",
    fontWeight: "500",
    fontSize: 18,
  },
});
export default CustomDrawerContent;
