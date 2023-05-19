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
import { Link, useRouter } from "expo-router";
import styles from "../styles";
import Back from "../components/Back";

const EditEmployee = () => {
  const theme = useColorScheme();
  const rout = useRouter();
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
      <ScrollView
        style={styles.formContainer}
        contentContainerStyle={{ paddingVertical: 10 }}
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
                marginTop: 40,
              }}
            >
              |{" "}
              <Text style={{ color: theme == "light" ? "#243F59" : "#fff" }}>
                Edit Ravi Sharma
              </Text>
            </Text>
          </View>

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
              Work Type
            </Text>
            <TextInput style={styles.textInput} name="work_type" />
          </View>
          <View style={styles.formIndividualContainer}>
            <Text
              style={
                theme == "light"
                  ? styles.individualInputFieldText
                  : styles.darkIndividualInputFieldText
              }
            >
              WorkerId
            </Text>
            <TextInput style={styles.textInput} name="workerId" />
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
              Salary
            </Text>
            <TextInput style={styles.textInput} name="salary" />
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
            <TouchableOpacity
              style={styles.formBtn}
              onPress={() => rout.push("/EmployerHomeScreen")}
            >
              <Text style={styles.formBtnLink}>Edit Worker</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditEmployee;
