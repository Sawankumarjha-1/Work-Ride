import { Stack, useSearchParams } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StatusBar,
  ImageBackground,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  ScrollView,
  View,
  KeyboardAvoidingView,
  useColorScheme,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import styles from "../styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const searchParam = useSearchParams();
  const rout = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [workerId, setWorkerId] = useState("");
  const [employerId, setEmployerId] = useState("");
  const [workerPassword, setWorkerPassword] = useState("");
  const [formUser, setFormUser] = useState(searchParam["name"] || "Employer");
  const theme = useColorScheme();
  const [buttonPress, setButtonPress] = useState(false);
  const [workerButtonPress, setWorkerButtonPress] = useState(false);
  const [comment, setComment] = useState("");
  const [workerComment, setWorkerComment] = useState("");
  const getData = async () => {
    try {
      const name = await AsyncStorage.getItem("name");
      const company_name = await AsyncStorage.getItem("company_name");
      const image = await AsyncStorage.getItem("image");
      const user_id = await AsyncStorage.getItem("user_id");
      // console.log(name + "\n" + image + "\n" + user_id + "\n" + company_name);
      if (
        name != null &&
        company_name != null &&
        image != null &&
        user_id != null
      ) {
        rout.replace("/EmployerHomeScreen");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const storeUser = async (name, value) => {
    try {
      await AsyncStorage.setItem(name, value);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  const OnEmployerLogin = async () => {
    setButtonPress(true);
    if (email == "" || password == "") {
      setButtonPress(false);
      return setComment("Please fill all details!");
    } else {
      setButtonPress(true);
      setComment("");
    }

    fetch("http://192.168.29.216:5001/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status == 401) {
          setButtonPress(false);
          return setComment(result.message);
        }

        if (result.status == 200) {
          storeUser("name", result.data.name);
          storeUser("company_name", result.data.company_name);
          storeUser("image", result.data.image.url);
          storeUser("user_id", result.data.email);
          storeUser("Category", "Employer");
          setEmail("");
          setPassword("");
          setComment("");
          rout.replace("/EmployerHomeScreen");
          setButtonPress(false);
        }
      })
      .catch((error) => {
        console.log("Upload error:", error);
      });
  };
  const OnWorkerLogin = async () => {
    setWorkerButtonPress(true);
    if (workerId == "" || employerId == "" || workerPassword == "") {
      setWorkerButtonPress(false);
      return setWorkerComment("Please fill all details!");
    } else {
      setWorkerButtonPress(true);
      setWorkerComment("");
    }

    fetch("http://192.168.29.216:5001/api/worker_login", {
      method: "POST",
      body: JSON.stringify({ employerId, workerId, password: workerPassword }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status == 401) {
          setWorkerButtonPress(false);
          return setWorkerComment(result.message);
        }

        if (result.status == 200) {
          // console.log(result.data.workers[0].name);
          storeUser("worker_name", result.data.workers[0].name);
          storeUser("work_type", result.data.workers[0].work_type);
          storeUser("image", result.data.workers[0].image.url);
          storeUser("worker_id", result.data.workers[0].worker_id);
          storeUser("employer_id", employerId);
          storeUser("Category", "Worker");
          setWorkerId("");
          setWorkerPassword("");
          setWorkerComment("");
          rout.replace("/EmployeeHomeScreen");
          setWorkerButtonPress(false);
        }
      })
      .catch((error) => {
        console.log("Upload error:", error);
      });
  };

  function loginForm() {
    switch (formUser) {
      case "Employer":
        return (
          <View style={{ marginVertical: 50, marginHorizontal: 20 }}>
            <KeyboardAvoidingView>
              {/*Input Fields*/}
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
              <View style={styles.formIndividualContainer}>
                <Text
                  style={
                    theme == "light"
                      ? styles.individualInputFieldText
                      : styles.darkIndividualInputFieldText
                  }
                >
                  Username / Email
                </Text>
                <TextInput
                  style={styles.textInput}
                  name="employer_username"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
              </View>
              <View style={styles.formIndividualContainer}>
                <Text
                  style={
                    theme == "light"
                      ? styles.individualInputFieldText
                      : styles.darkIndividualInputFieldText
                  }
                >
                  Password
                </Text>
                <TextInput
                  style={styles.textInput}
                  name="employer_password"
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                />
              </View>
              {/*Forget Password*/}
              <TouchableOpacity
                style={{ marginBottom: 20 }}
                onPress={() => rout.replace("/ForgetPassword")}
              >
                <Text
                  style={{
                    color: "#C5D877",
                    fontFamily: "MontserratSemiBold",
                  }}
                >
                  Forget Password ?
                </Text>
              </TouchableOpacity>
              {/*Signup Btn*/}
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
                  <TouchableOpacity
                    style={styles.formBtn}
                    onPress={OnEmployerLogin}
                  >
                    <Text style={styles.formBtnLink}>Login</Text>
                  </TouchableOpacity>
                )}
              </View>
              {/*Don't have an account section */}
              <View style={{ marginTop: 20, flexDirection: "row" }}>
                <Text
                  style={{
                    color: "grey",
                    textAlign: "center",
                    fontFamily: "MontserratSemiBold",
                  }}
                >
                  Don't have an account ?
                </Text>
                <TouchableOpacity
                  onPress={() => rout.replace("/EmployerSignup")}
                >
                  <Text style={{ color: "#C5D877" }}> Signup</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </View>
        );

      case "Worker":
        return (
          <View style={{ marginVertical: 50, marginHorizontal: 20 }}>
            <KeyboardAvoidingView>
              {/*Input Fields*/}
              {workerComment && (
                <Text
                  style={{
                    color: "red",
                    fontFamily: "MontserratRegular",
                    letterSpacing: 1.2,
                    marginBottom: 20,
                  }}
                >
                  {workerComment}
                </Text>
              )}

              <View style={styles.formIndividualContainer}>
                <Text
                  style={
                    theme == "light"
                      ? styles.individualInputFieldText
                      : styles.darkIndividualInputFieldText
                  }
                >
                  Employer Id
                </Text>
                <TextInput
                  style={styles.textInput}
                  name="employer_id"
                  value={employerId}
                  onChangeText={(text) => {
                    setEmployerId(text);
                  }}
                />
              </View>

              <View style={styles.formIndividualContainer}>
                <Text
                  style={
                    theme == "light"
                      ? styles.individualInputFieldText
                      : styles.darkIndividualInputFieldText
                  }
                >
                  Worker Id
                </Text>
                <TextInput
                  style={styles.textInput}
                  name="worker_id"
                  value={workerId}
                  onChangeText={(text) => {
                    setWorkerId(text);
                  }}
                />
              </View>
              <View style={styles.formIndividualContainer}>
                <Text
                  style={
                    theme == "light"
                      ? styles.individualInputFieldText
                      : styles.darkIndividualInputFieldText
                  }
                >
                  Password
                </Text>
                <TextInput
                  style={styles.textInput}
                  name="worker_password"
                  value={workerPassword}
                  onChangeText={(text) => {
                    setWorkerPassword(text);
                  }}
                />
              </View>

              {/*Signup Btn*/}
              <View style={styles.formIndividualContainer}>
                {workerButtonPress == true ? (
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
                  <TouchableOpacity
                    style={styles.formBtn}
                    onPress={OnWorkerLogin}
                  >
                    <Text style={styles.formBtnLink}>Login</Text>
                  </TouchableOpacity>
                )}
              </View>
            </KeyboardAvoidingView>
          </View>
        );
    }
  }
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme == "light" ? "#fff" : "#000" }}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar translucent={true} barStyle={"light-content"} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={require("../assets/images/background.jpg")}
          resizeMode="cover"
          style={[styles.headerImage, { height: 250 }]}
        >
          <View
            style={
              theme == "light" ? styles.headerUpper : styles.darkHeaderUpper
            }
          >
            {/*Tagline */}
            <View style={{ marginBottom: 20 }}>
              <Text
                style={{
                  color: "#C5D877",
                  fontSize: 37,
                  fontFamily: "MontserratBold",
                }}
              >
                | <Text style={{ color: "#fff" }}>Welcome Back</Text>
              </Text>
              <Text
                style={{
                  color: "#C5D877",
                  fontSize: 20,
                  // paddingLeft: 25,
                  fontFamily: "MontserratRegular",
                }}
              >
                <Text style={{ color: "#fff" }}>
                  Sign for manage your work seamlessly
                </Text>
              </Text>
            </View>
          </View>
          {/*Buttons for employer login and worker login*/}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              position: "absolute",
              bottom: -15,
              left: 30,
              zIndex: 2,
            }}
          >
            <TouchableWithoutFeedback
              onPress={() => {
                setFormUser("Employer");
              }}
            >
              <View
                style={{
                  backgroundColor: formUser === "Employer" ? "#C5D877" : "#fff",
                  padding: 10,
                  borderRadius: 4,
                  elevation: 5,
                }}
              >
                <Text
                  style={{
                    color: "#243F59",
                    fontFamily: "MontserratMedium",
                    letterSpacing: 1.2,
                    fontSize: 14,
                  }}
                >
                  Employer Login
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                setFormUser("Worker");
              }}
            >
              <View
                style={{
                  backgroundColor: formUser === "Worker" ? "#C5D877" : "#fff",
                  padding: 10,
                  borderRadius: 4,
                  marginLeft: 20,
                  elevation: 5,
                }}
              >
                <Text
                  style={{
                    color: "#243F59",
                    fontFamily: "MontserratMedium",
                    letterSpacing: 1.2,
                    fontSize: 14,
                  }}
                >
                  Worker Login
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </ImageBackground>

        {loginForm()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
