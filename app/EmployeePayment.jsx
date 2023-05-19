import { Stack } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  ImageBackground,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  useColorScheme,
} from "react-native";
import { View } from "moti";
import styles from "../styles";
import AntDesign from "react-native-vector-icons/AntDesign";
import Bottom from "../components/Bottom";

const employee = [
  {
    name: "Raman Kumar",
    image: "",
    tagline: "",
  },
  {
    name: "Rohan Kumar",
    image: "",
    tagline: "",
  },
  {
    name: "Sohan Kumar",
    image: "",
    tagline: "",
  },
  {
    name: "Kabir Kumar",
    image: "",
    tagline: "",
  },
  {
    name: "Rohan Kumar",
    image: "",
    tagline: "",
  },
  {
    name: "Rohan Kumar",
    image: "",
    tagline: "",
  },
  {
    name: "Rohan Kumar",
    image: "",
    tagline: "",
  },
  {
    name: "Rohan Kumar",
    image: "",
    tagline: "",
  },
  {
    name: "Rohan Kumar",
    image: "",
    tagline: "",
  },
  {
    name: "Rohan Kumar",
    image: "",
    tagline: "",
  },
];
const EmployeePayment = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [btnText, setBtnText] = useState("Previous");
  const theme = useColorScheme();
  const [searchText, setSearchText] = useState("");
  const [filterArray, setFilterArray] = useState(employee);
  const [notFound, setNotFound] = useState(false);
  const filteringData = (text) => {
    setSearchText(text);
    if (!text) {
      setNotFound(false);
      return setFilterArray(employee);
    }

    if (text.length >= 3) {
      const data = employee.filter((item, index) => {
        return item.name.toLowerCase().includes(text.toLowerCase());
      });
      if (data.length == 0) {
        return setNotFound(true);
      } else {
        setNotFound(false);
        return setFilterArray(data);
      }
    }
  };
  const onSearch = () => {
    if (searchText.length > 3) {
      const data = employee.filter((item, index) => {
        return item.name.toLowerCase().includes(searchText.toLowerCase());
      });
      if (data.length == 0) {
        setNotFound(true);
      } else {
        setNotFound(false);
        setFilterArray(data);
      }
    }

    if (searchText == "") {
      setFilterArray(employee);
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme == "light" ? "#fff" : "#000" }}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar translucent={true} barStyle={"light-content"} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        <ImageBackground
          source={require("../assets/images/background.jpg")}
          resizeMode="cover"
          style={[
            styles.headerImage,
            { height: 160, justifyContent: "space-between" },
          ]}
        >
          <View
            style={
              theme == "light" ? styles.headerUpper : styles.darkHeaderUpper
            }
          >
            {/*Tagline*/}
            <Text
              style={{
                color: "#C5D877",
                fontFamily: "MontserratMedium",
                fontSize: 30,
              }}
            >
              | Manage
              <Text style={{ color: "#fff" }}> Worker Payment</Text>
            </Text>
          </View>
        </ImageBackground>
        {/*Search Bar */}

        <View style={styles.formContainer}>
          <View style={{ position: "relative", zIndex: 1 }}>
            <TextInput
              placeholder="Search for employee...."
              name="search"
              style={{
                bottom: 0,
                position: "absolute",
                width: "100%",
                paddingHorizontal: 20,
                paddingVertical: 10,
                marginTop: 20,
                backgroundColor: "#fff",
                borderRadius: 20,
                elevation: 1,
              }}
              onChangeText={filteringData}
              value={searchText}
            />
            <TouchableOpacity onPress={onSearch}>
              <AntDesign
                name="search1"
                size={20}
                style={{
                  position: "absolute",
                  right: 8,
                  bottom: 7,
                  color: "#C5D877",
                  backgroundColor: "#243F59",
                  padding: 7,
                  borderRadius: 50,
                }}
              />
            </TouchableOpacity>
          </View>

          {employee.length && (
            <Text
              style={{
                fontSize: 20,
                fontFamily: "MontserratSemiBold",
                marginBottom: 10,
                marginTop: 40,
                color: theme == "light" ? "#243F59" : "#fff",
              }}
            >
              Working Employee{" "}
              <Text style={{ color: "#C5D877" }}> {employee.length}</Text>
            </Text>
          )}
          {employee.length == 0 ? (
            <ActivityIndicator
              color="#C5D877"
              size="large"
              style={{ marginTop: 50 }}
            />
          ) : notFound == true ? (
            <Text style={{ color: theme == "light" ? "#243F59" : "#fff" }}>
              No employee exist with this name !
            </Text>
          ) : (
            filterArray.map((data, index) => {
              return (
                <View
                  from={{
                    translateY: 100,
                  }}
                  animate={{
                    translateY: 0,
                  }}
                  transition={{
                    type: "spring",
                    duration: 500,
                    delay: 100,
                  }}
                  key={"employee" + index}
                  style={{
                    width: "100%",

                    marginVertical: 10,
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    borderRadius: 4,
                    borderBottomWidth: 1,
                    borderBottomColor:
                      theme == "light" ? "#eee" : "rgba(255,255,255,0.1)",
                    flexDirection: "row",
                  }}
                >
                  <Image
                    source={{
                      uri: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                    }}
                    alt="Not Found"
                    style={{ width: 70, height: 70, borderRadius: 50 }}
                    resizeMode="contain"
                  />
                  <View style={{ padding: 10, width: "40%" }}>
                    <Text
                      style={{
                        color: theme == "light" ? "#243F59" : "#fff",
                        fontSize: 16,
                      }}
                    >
                      {data.name}
                    </Text>
                    <Text style={{ color: "grey", fontSize: 12 }}>
                      Permanent | Mistri
                    </Text>
                  </View>
                  <View
                    style={{
                      paddingLeft: 10,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",

                      width: "35%",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        setBtnText("Previous");
                        setModalVisible(true);
                      }}
                    >
                      <Text
                        style={[
                          styles.attendenceText,
                          {
                            color: "#243F59",
                            backgroundColor: "#fff",
                            fontSize: 14,
                          },
                        ]}
                      >
                        Prev
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setBtnText("Current");
                        setModalVisible(true);
                      }}
                    >
                      <Text
                        style={[
                          styles.attendenceText,
                          {
                            color: "#C5D877",
                            backgroundColor: "#243F59",
                            fontSize: 14,
                          },
                        ]}
                      >
                        Curr
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })
          )}
        </View>
      </ScrollView>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View
          from={{
            translateY: 400,
          }}
          animate={{ translateY: 0 }}
          transition={{ type: "timing", duration: 1500, delay: 100 }}
          style={{
            width: "100%",
            height: 400,
            backgroundColor: "#243F59",
            bottom: 0,

            position: "absolute",
            elevation: 1,
            padding: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Image
              source={{
                uri: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
              }}
              alt="Not Found"
              style={{ width: 70, height: 70, borderRadius: 50 }}
              resizeMode="contain"
            />
            <View>
              <Text style={{ fontSize: 16, color: "#fff" }}>Rohan Sharma</Text>
              <Text style={{ fontSize: 12, color: "#C5D877" }}>
                Permanent | Labour
              </Text>
            </View>
            <View>
              <TouchableOpacity>
                {btnText && (
                  <Text
                    style={{
                      backgroundColor: "#fff",
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                      borderRadius: 50,
                    }}
                  >
                    {btnText}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ marginTop: 40 }}>
            <View style={styles.formIndividualContainer}>
              <Text
                style={[
                  styles.individualInputFieldText,
                  { backgroundColor: "#243F59", color: "#fff" },
                ]}
              >
                Date
              </Text>
              <TextInput
                style={[styles.textInput, { borderColor: "#fff" }]}
                name="date"
              />
            </View>
            <View style={styles.formIndividualContainer}>
              <Text
                style={[
                  styles.individualInputFieldText,
                  { backgroundColor: "#243F59", color: "#fff" },
                ]}
              >
                Amount
              </Text>
              <TextInput
                style={[styles.textInput, { borderColor: "#fff" }]}
                name="amount"
              />
            </View>
            <View style={styles.formIndividualContainer}>
              <TouchableOpacity
                style={styles.formBtn}
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <Text style={{ textAlign: "center", fontSize: 18 }}>
                  Update
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/*Bottom Footer*/}

      <Bottom active="payments" />
    </SafeAreaView>
  );
};

export default EmployeePayment;
