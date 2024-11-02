import React from "react";
import { View, StyleSheet } from "react-native";
export default function LoadingScreen() {
  return (
    <View style={styles.loadingScreen}>
      <View style={styles.dotsWrapper}>
        <LoadingDots />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingScreen: {
    width:'100%',
    height: "100%",
    position: "absolute",
    zIndex: 1,
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
  dotsWrapper: {
    height:'100%',
    textAlign:'center',
    justifyContent:"center",
    marginLeft:'auto',
    marginRight:'auto'
  },
});
