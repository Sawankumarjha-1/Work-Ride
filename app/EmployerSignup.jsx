import { Stack } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  StatusBar,
  ImageBackground,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  useColorScheme,
} from "react-native";
import { View } from "react-native";
import { useRouter } from "expo-router";
import styles from "../styles";

const EmployerSignup = () => {
  const theme = useColorScheme();
  const rout = useRouter();
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
          style={styles.headerImage}
        >
          <View
            style={
              theme == "light" ? styles.headerUpper : styles.darkHeaderUpper
            }
          >
            <View>
              <Text
                style={{
                  color: "#C5D877",
                  fontSize: 45,
                  fontFamily: "MontserratBold",
                }}
              >
                | Create
              </Text>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 30,
                  fontFamily: "MontserratBold",
                }}
              >
                an account With us
              </Text>
            </View>
          </View>
        </ImageBackground>

        <KeyboardAvoidingView
          style={{ paddingVertical: 50, paddingHorizontal: 20 }}
        >
          <View style={styles.formIndividualContainer}>
            <Text
              style={
                theme == "light"
                  ? styles.individualInputFieldText
                  : styles.darkIndividualInputFieldText
              }
            >
              Name
            </Text>
            <TextInput style={styles.textInput} name="name" />
          </View>
          <View style={styles.formIndividualContainer}>
            <Text
              style={
                theme == "light"
                  ? styles.individualInputFieldText
                  : styles.darkIndividualInputFieldText
              }
            >
              Company Type/Company Name
            </Text>
            <TextInput style={styles.textInput} name="company_name" />
          </View>
          <View style={styles.formIndividualContainer}>
            <Text
              style={
                theme == "light"
                  ? styles.individualInputFieldText
                  : styles.darkIndividualInputFieldText
              }
            >
              Email Id
            </Text>
            <TextInput style={styles.textInput} name="email" />
          </View>
          <View style={styles.formIndividualContainer}>
            <Text
              style={
                theme == "light"
                  ? styles.individualInputFieldText
                  : styles.darkIndividualInputFieldText
              }
            >
              Phone no
            </Text>
            <TextInput style={styles.textInput} name="phone" />
          </View>
          <View style={styles.formIndividualContainer}>
            <Text
              style={
                theme == "light"
                  ? styles.individualInputFieldText
                  : styles.darkIndividualInputFieldText
              }
            >
              Aadhar no
            </Text>
            <TextInput style={styles.textInput} name="aadhar" />
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
              name="password"
              secureTextEntry={true}
            />
          </View>
          <View style={styles.formIndividualContainer}>
            <TouchableOpacity style={styles.uploadFormBtn}>
              <Text style={styles.uploadFormBtnText}>Upload</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.formIndividualContainer}>
            <TouchableOpacity style={styles.formBtn}>
              <Text style={styles.formBtnLink}>Signup</Text>
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
              Already have an account ?
            </Text>
            <TouchableOpacity
              onPress={() => rout.replace("/Login?name=Employer")}
            >
              <Text style={{ color: "#C5D877" }}> Login</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EmployerSignup;
