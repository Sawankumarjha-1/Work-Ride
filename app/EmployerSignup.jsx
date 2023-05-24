import { Stack } from "expo-router";
import React, { useState, useEffect } from "react";
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
  ActivityIndicator,
} from "react-native";
import { View } from "react-native";
import { useRouter } from "expo-router";
import styles from "../styles";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
const EmployerSignup = () => {
  const theme = useColorScheme();
  const rout = useRouter();

  const getData = async () => {
    try {
      const name = await AsyncStorage.getItem("name");
      const company_name = await AsyncStorage.getItem("company_name");
      const image = await AsyncStorage.getItem("image");
      const user_id = await AsyncStorage.getItem("user_id");
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
  useEffect(() => {
    getData();
  }, []);
  const storeUser = async (name, value) => {
    try {
      await AsyncStorage.setItem(name, value);
    } catch (error) {
      console.log(error);
    }
  };

  const [name, setName] = useState("");
  const [company_name, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState("");
  const [comment, setComment] = useState("");
  const [buttonPress, setButtonPress] = useState(false);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    if (!result.canceled) {
      console.log(result.assets);
      // console.log(result.assets[0].uri);
      setProfile(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  const OnSubmit = async () => {
    setButtonPress(true);
    if (
      name == "" ||
      email == "" ||
      password == "" ||
      company_name == "" ||
      aadhar == "" ||
      phone == "" ||
      profile == ""
    ) {
      setButtonPress(false);
      return setComment(
        "Please fill all details including uploading profile picture!"
      );
    } else {
      setButtonPress(true);
      setComment("");
    }
    const formData = new FormData();
    formData.append("image", {
      uri: profile,
      type: "image/jpg",
      name: new Date() + "_profile",
    });
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("company_name", company_name);
    formData.append("aadhar", aadhar);
    formData.append("password", password);
    fetch("http://192.168.29.216:5001/api/", {
      method: "POST",
      body: formData,

      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status == 400) {
          setButtonPress(false);
          return setComment(result.message);
        }
        if (result.status == 403) {
          setButtonPress(false);
          return setComment(result.message);
        }
        if (result.status == 200) {
          storeUser("name", result.data.name);
          storeUser("company_name", result.data.company_name);
          storeUser("image", result.data.image.url);
          storeUser("user_id", result.data.email);
          storeUser("Category", "Employer");
          setName("");
          setAadhar("");
          setEmail("");
          setCompanyName("");
          setPhone("");
          setPassword("");
          setComment("");
          setProfile("");
          rout.replace("/EmployerHomeScreen");
          setButtonPress(false);
        }
      })
      .catch((error) => {
        console.log("Upload error:", error);
      });
  };

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
          style={{ paddingVertical: 17, paddingHorizontal: 20 }}
        >
          {comment ? (
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
          ) : (
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
          )}
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
            <TextInput
              style={styles.textInput}
              name="name"
              value={name}
              onChangeText={(text) => setName(text)}
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
              Company Type/Company Name
            </Text>
            <TextInput
              style={styles.textInput}
              name="company_name"
              value={company_name}
              onChangeText={(text) => setCompanyName(text)}
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
              Email Id
            </Text>
            <TextInput
              style={styles.textInput}
              name="email"
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
              Phone no
            </Text>
            <TextInput
              style={styles.textInput}
              name="phone"
              value={phone}
              onChangeText={(text) => {
                setPhone(text);
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
              Aadhar no
            </Text>
            <TextInput
              style={styles.textInput}
              name="aadhar"
              value={aadhar}
              onChangeText={(text) => {
                setAadhar(text);
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
              name="password"
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
              }}
            />
          </View>
          <View style={styles.formIndividualContainer}>
            {profile !== "" && (
              <Image
                source={{
                  uri: profile,
                }}
                style={{
                  width: 60,
                  height: 60,
                  marginBottom: 10,
                  borderRadius: 50,
                }}
                resizeMode="contain"
              />
            )}

            <TouchableOpacity
              style={styles.uploadFormBtn}
              onPress={pickImageAsync}
            >
              <Text style={styles.uploadFormBtnText}>Upload</Text>
            </TouchableOpacity>
          </View>
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
              <TouchableOpacity style={styles.formBtn} onPress={OnSubmit}>
                <Text style={styles.formBtnLink}>Signup</Text>
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
