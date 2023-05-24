import React from "react";
import { TouchableOpacity, useColorScheme } from "react-native";
import styles from "../styles";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { View } from "moti";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Bottom = ({ active }) => {
  const rout = useRouter();
  const theme = useColorScheme();
  const removeValue = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      // remove error
    }
  };
  return (
    <View
      from={{
        translateY: 100,
      }}
      animate={{
        translateY: 0,
      }}
      transition={{ type: "timing", duration: 400, delay: 100 }}
      style={{
        position: "absolute",
        bottom: 0,
        backgroundColor: theme == "light" ? "#243F59" : "rgba(0,0,0,0.9)",
        width: "100%",
        height: 50,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingVertical: 10,
        borderTopWidth: 1,
        borderColor: "#C5D877",
      }}
    >
      <TouchableOpacity onPress={() => rout.replace("/EmployerHomeScreen")}>
        <AntDesign
          name="home"
          size={30}
          style={[
            styles.footerIcon,
            active == "home" && styles.activeFooterIcon,
          ]}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => rout.replace("/AddWorker")}>
        <AntDesign
          name="adduser"
          size={30}
          style={[
            styles.footerIcon,
            active == "addworker" && styles.activeFooterIcon,
          ]}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => rout.replace("/MarkAttendence")}>
        <Ionicons
          name="hand-right-outline"
          size={30}
          style={[
            styles.footerIcon,
            active == "attendence" && styles.activeFooterIcon,
          ]}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => rout.replace("/EmployeePayment")}>
        <MaterialIcon
          name="payments"
          size={30}
          style={[
            styles.footerIcon,
            active == "payments" && styles.activeFooterIcon,
          ]}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          removeValue("name");
          removeValue("company_name");
          removeValue("image");
          removeValue("user_id");
          removeValue("Category");
          rout.replace("/home");
        }}
      >
        <MaterialIcon
          name="logout"
          size={30}
          style={[
            styles.footerIcon,
            active == "logout" && styles.activeFooterIcon,
          ]}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Bottom;
