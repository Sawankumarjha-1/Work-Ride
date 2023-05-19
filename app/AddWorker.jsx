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
  View,
  useColorScheme,
} from "react-native";

import { Link } from "expo-router";
import styles from "../styles";
import Bottom from "../components/Bottom";

const AddWorker = () => {
  const theme = useColorScheme();

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
            <TouchableOpacity style={styles.formBtn}>
              <Link href="/" style={styles.formBtnLink}>
                Add Worker
              </Link>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <Bottom active="addworker" />
    </SafeAreaView>
  );
};

export default AddWorker;
