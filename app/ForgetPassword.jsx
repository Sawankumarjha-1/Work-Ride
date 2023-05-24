import { Stack } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  useColorScheme,
  ActivityIndicator,
} from "react-native";

import { useRouter } from "expo-router";
import styles from "../styles";
import Bottom from "../components/Bottom";
import FeatherIcon from "react-native-vector-icons/Feather";
import { View } from "moti";
const ForgetPassword = () => {
  const theme = useColorScheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [displayPasswordFields, setDisplayPasswordFields] = useState(false);
  const [displayEmail, setDisplayEmail] = useState(true);
  const [buttonPress, setButtonPress] = useState(false);
  const [comment, setComment] = useState("");
  const [otpSending, setOtpSending] = useState(false);
  const rout = useRouter();
  function sendOTP() {
    if (email == "") {
      return setComment("Please enter your existing email !");
    } else if (!(email.includes("@") && email.includes("."))) {
      return setComment("Please enter a valid email address !");
    }
    setOtpSending(true);
    fetch("http://192.168.29.216:5001/api/send_otp", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status == 400) {
          setOtpSending(false);
          return setComment(result.message);
        }
        if (result.status == 200) {
          // rout.replace("/EmployerHomeScreen");
          setOtpSending(false);
          setComment("Otp sent to your email address...");
          setDisplayEmail(false);
          setDisplayPasswordFields(true);
        }
      })
      .catch((error) => {
        console.log("Upload error:", error);
      });
  }
  function OnSumbit() {
    if (otp == "" || password == "") {
      return setComment("Please fill all the details !");
    }
    if (otp.length < 4) {
      return setComment("Invalid OTP");
    }

    setButtonPress(true);

    fetch("http://192.168.29.216:5001/api/update_password", {
      method: "PATCH",
      body: JSON.stringify({ email, password, otp }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status == 400) {
          setButtonPress(false);
          return setComment(result.message);
        }
        if (result.status == 200) {
          setButtonPress(false);
          setComment("");
          return rout.replace("/Login?name=Employer");
        }
      })
      .catch((error) => {
        console.log("Upload error:", error);
      });
  }
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme == "light" ? "#fff" : "#000" }}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar translucent={true} barStyle={"light-content"} />
      <ScrollView
        style={styles.formContainer}
        contentContainerStyle={{ paddingVertical: 10, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <KeyboardAvoidingView>
          <View>
            <Text
              style={{
                color: "#C5D877",
                fontSize: 30,
                fontFamily: "MontserratBold",
                marginBottom: 50,
                marginTop: 20,
              }}
            >
              |{" "}
              <Text style={{ color: theme == "light" ? "#243F59" : "#fff" }}>
                Forget Password
              </Text>
            </Text>
          </View>

          {comment && (
            <Text
              style={{
                color: "red",
                fontFamily: "MontserratRegular",
                letterSpacing: 1.2,
                marginBottom: 20,
              }}
            >
              {comment}
            </Text>
          )}

          {displayEmail && (
            <View
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 100, duration: 500 }}
              style={[styles.formIndividualContainer, { position: "relative" }]}
            >
              <Text
                style={
                  theme == "light"
                    ? styles.individualInputFieldText
                    : styles.darkIndividualInputFieldText
                }
              >
                Email
              </Text>
              <TextInput
                style={[styles.textInput, { paddingRight: 50 }]}
                name="email"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
              {otpSending ? (
                <View
                  style={{
                    backgroundColor: "#eee",
                    width: 40,
                    textAlign: "center",
                    padding: 10,
                    borderRadius: 30,
                    color: "#fff",
                    position: "absolute",
                    right: 5,
                    top: 5,
                  }}
                >
                  <ActivityIndicator size={20} color={"#C5D877"} />
                </View>
              ) : (
                <TouchableOpacity
                  style={{ position: "absolute", right: 5, top: 5 }}
                  onPress={sendOTP}
                >
                  <FeatherIcon
                    name="send"
                    size={20}
                    style={{
                      backgroundColor: "#243F59",
                      width: 40,
                      textAlign: "center",
                      padding: 10,
                      borderRadius: 30,
                      color: "#fff",
                    }}
                  />
                </TouchableOpacity>
              )}
            </View>
          )}

          {displayPasswordFields && (
            <View
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 100, duration: 500 }}
            >
              <View
                style={[
                  styles.formIndividualContainer,
                  { position: "relative" },
                ]}
              >
                <Text
                  style={
                    theme == "light"
                      ? styles.individualInputFieldText
                      : styles.darkIndividualInputFieldText
                  }
                >
                  Enter OTP
                </Text>
                <TextInput
                  style={[styles.textInput]}
                  name="opt"
                  value={otp}
                  onChangeText={(text) => setOtp(text)}
                  maxLength={4}
                />
              </View>

              <View
                style={[
                  styles.formIndividualContainer,
                  { position: "relative" },
                ]}
              >
                <Text
                  style={
                    theme == "light"
                      ? styles.individualInputFieldText
                      : styles.darkIndividualInputFieldText
                  }
                >
                  Enter New Password
                </Text>
                <TextInput
                  style={[styles.textInput]}
                  name="password"
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                />
              </View>

              <Text
                style={{
                  color: "green",
                  fontFamily: "MontserratRegular",
                  letterSpacing: 1.2,
                  marginBottom: 20,
                }}
              >
                Note : Password must contain 6 letters and alteast one special
                character and one numeric value
              </Text>

              <View style={styles.formIndividualContainer}>
                {buttonPress == true ? (
                  <View
                    style={{
                      backgroundColor: "#eee",
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                      borderRadius: 4,
                    }}
                  >
                    <ActivityIndicator size={20} color={"#C5D877"} />
                  </View>
                ) : (
                  <TouchableOpacity style={styles.formBtn} onPress={OnSumbit}>
                    <Text style={styles.formBtnLink}>Submit</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
        </KeyboardAvoidingView>
      </ScrollView>
      <Bottom active="addworker" />
    </SafeAreaView>
  );
};

export default ForgetPassword;
