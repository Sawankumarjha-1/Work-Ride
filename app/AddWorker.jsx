import { Stack, useRouter } from "expo-router";
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
  View,
  useColorScheme,
  ActivityIndicator,
} from "react-native";

import styles from "../styles";
import Bottom from "../components/Bottom";
import GettingAsyncData from "./GettingAsyncData";
import * as ImagePicker from "expo-image-picker";

const AddWorker = () => {
  const theme = useColorScheme();
  const { user_id } = GettingAsyncData();

  const [name, setName] = useState("");
  const [work_type, setWork_type] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState("");
  const [salary, setSalary] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [comment, setComment] = useState("");
  const [greenComment, setGreenComment] = useState(
    "Note : Password must contain 6 letters and alteast one special character and one numeric value"
  );
  const [buttonPress, setButtonPress] = useState(false);
  const rout = useRouter();
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    if (!result.canceled) {
      setProfile(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };
  function onAddWorker() {
    setButtonPress(true);
    if (
      name == "" ||
      work_type == "" ||
      password == "" ||
      aadhar == "" ||
      phone == "" ||
      profile == "" ||
      salary == ""
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
    formData.append("work_type", work_type);
    formData.append("phone", phone);
    formData.append("worker_id", aadhar);
    formData.append("aadhar", aadhar);
    formData.append("password", password);
    formData.append("salary", salary);

    fetch(`http://192.168.29.216:5001/api/add_worker/${user_id}`, {
      method: "PATCH",
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

        if (result.status == 200) {
          setName("");
          setAadhar("");
          setWork_type("");
          setPhone("");
          setPassword("");
          setComment("");
          setGreenComment("Worker Added Successfully...");
          setProfile("");
          setSalary("");
          setButtonPress(false);
          rout.replace("/AddWorker");
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
                Add Worker
              </Text>
            </Text>
          </View>
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
              {greenComment}
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
              Work Type
            </Text>
            <TextInput
              style={styles.textInput}
              name="work_type"
              value={work_type}
              onChangeText={(text) => setWork_type(text)}
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
              Aadhar no ( Consider as Worker_id)
            </Text>
            <TextInput
              style={styles.textInput}
              name="aadhar"
              value={aadhar}
              onChangeText={(text) => setAadhar(text)}
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
              Phone
            </Text>
            <TextInput
              style={styles.textInput}
              name="phone"
              value={phone}
              onChangeText={(text) => setPhone(text)}
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
              Salary
            </Text>
            <TextInput
              style={styles.textInput}
              name="salary"
              value={salary}
              onChangeText={(text) => setSalary(text)}
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
              onChangeText={(text) => setPassword(text)}
            />
          </View>
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
          <View style={styles.formIndividualContainer}>
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
              <TouchableOpacity style={styles.formBtn} onPress={onAddWorker}>
                <Text style={styles.formBtnLink}>SUBMIT</Text>
              </TouchableOpacity>
            )}
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <Bottom active="addworker" />
    </SafeAreaView>
  );
};

export default AddWorker;
