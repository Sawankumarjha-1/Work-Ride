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
import { Link, useRouter, useSearchParams } from "expo-router";
import styles from "../styles";
import Back from "../components/Back";
import GettingAsyncData from "./GettingAsyncData";

const EditEmployee = () => {
  const { user_id } = GettingAsyncData();

  const theme = useColorScheme();
  const rout = useRouter();
  const queryData = useSearchParams();
  if (!queryData.id) {
    return rout.push("/");
  }

  const [name, setName] = useState("");
  const [work_type, setWork_type] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [salary, setSalary] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [comment, setComment] = useState("");
  const [buttonPress, setButtonPress] = useState(false);
  const [greenComment, setGreenComment] = useState("");
  const [loading, setLoading] = useState(true);

  function gettingUserDetails() {
    if (user_id && queryData.id) {
      fetch(
        `http://192.168.29.216:5001/api/get_individual_worker/${user_id}/${queryData.id}`
      )
        .then((response) => response.json())
        .then((res) => {
          setLoading(false);
          const worker = res.data[0];
          setName(worker.name);
          setAadhar(worker.aadhar);
          setPassword(worker.password);

          setSalary(worker.salary);
          setPhone(worker.phone);
          setWork_type(worker.work_type);
        });
    }
  }
  useEffect(() => {
    gettingUserDetails();
  }, [user_id, queryData]);

  function onAddWorker() {
    setButtonPress(true);
    if (
      name == "" ||
      work_type == "" ||
      password == "" ||
      aadhar == "" ||
      phone == "" ||
      salary == ""
    ) {
      setButtonPress(false);
      return setComment("Please fill all details");
    } else {
      setButtonPress(true);
      setComment("");
    }
    const data = {
      name: name,
      work_type: work_type,
      phone: phone,
      worker_id: aadhar,
      aadhar: aadhar,
      password: password,
      salary: salary,
    };
    fetch(
      `http://192.168.29.216:5001/api/update_worker/${user_id}/${queryData.id}`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
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
          setGreenComment("Update Successfully .....");
          setSalary("");
          setButtonPress(false);
          return rout.replace("/EmployerHomeScreen");
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
      <Stack.Screen
        options={{
          headerTitle: "",
          headerTransparent: true,
          headerBackButtonMenuEnabled: false,
          headerLeft: () => {
            return <Back />;
          },
        }}
      />
      <StatusBar translucent={true} barStyle={"light-content"} />

      {loading ? (
        <View
          style={{
            backgroundColor: theme == "light" ? "#fff" : "#000",
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <ActivityIndicator size={"large"} color={"#C5D877"} />
        </View>
      ) : (
        <ScrollView
          style={styles.formContainer}
          contentContainerStyle={{ paddingVertical: 10, paddingBottom: 30 }}
          showsVerticalScrollIndicator={false}
        >
          <KeyboardAvoidingView>
            <View>
              <Text
                style={{
                  color: "#C5D877",
                  fontSize: 30,
                  fontFamily: "MontserratBold",
                  marginBottom: 20,
                  marginTop: 70,
                }}
              >
                |{" "}
                <Text
                  style={{
                    color: theme == "light" ? "#243F59" : "#fff",
                    fontSize: 20,
                  }}
                >
                  Edit {name}
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
                editable={false}
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
      )}
    </SafeAreaView>
  );
};

export default EditEmployee;
