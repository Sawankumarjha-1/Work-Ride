import { useRouter } from "expo-router";
import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
const Back = () => {
  const rout = useRouter();
  return (
    <View>
      <TouchableOpacity onPress={() => rout.back()}>
        <AntDesign name="left" size={30} style={{ color: "#eee" }} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Back;
