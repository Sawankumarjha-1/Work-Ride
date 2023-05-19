import { Stack, useSearchParams } from "expo-router";
import React, { useState } from "react";
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
} from "react-native";
import { useRouter } from "expo-router";
import styles from "../styles";

const Login = () => {
  const searchParam = useSearchParams();
  const rout = useRouter();
  const [formUser, setFormUser] = useState(searchParam["name"] || "Employer");
  const theme = useColorScheme();
  function loginForm() {
    switch (formUser) {
      case "Employer":
        return (
          <View style={{ marginVertical: 50, marginHorizontal: 20 }}>
            <KeyboardAvoidingView>
              {/*Input Fields*/}
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
                <TextInput style={styles.textInput} name="employer_username" />
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
                <TextInput style={styles.textInput} name="employer_password" />
              </View>
              {/*Forget Password*/}
              <TouchableOpacity style={{ marginBottom: 20 }}>
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
                <TouchableOpacity
                  style={styles.formBtn}
                  onPress={() => rout.push("/EmployerHomeScreen")}
                >
                  <Text style={styles.formBtnLink}>Login</Text>
                </TouchableOpacity>
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
                <TextInput style={styles.textInput} name="worker_username" />
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
                <TextInput style={styles.textInput} name="worker_password" />
              </View>

              {/*Signup Btn*/}
              <View style={styles.formIndividualContainer}>
                <TouchableOpacity
                  style={styles.formBtn}
                  onPress={() => rout.replace("/EmployeeHomeScreen")}
                >
                  <Text style={styles.formBtnLink}>Login</Text>
                </TouchableOpacity>
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
