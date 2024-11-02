import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
5
import { StyleSheet, View, Text } from "react-native";

const Salary = () => {
  return (
    <View style={styles.container}>
      <FontAwesome name="warning" size={40} color="red" />
      <Text allowFontScaling={false} style={styles.text}>
        Tính năng đang phát triển
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 20,
    textAlign: "center",
    fontWeight: "400",
    fontSize: 20,
    color: "red",
  },
});

export default Salary;
