import { Stack, useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
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
  useColorScheme,
} from "react-native";
import { View } from "moti";

import styles from "../styles";

import AntDesign from "react-native-vector-icons/AntDesign";
import Bottom from "../components/Bottom";

import GettingAsyncData from "./GettingAsyncData";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const MarkAttendence = () => {
  const theme = useColorScheme();

  const { user_id } = GettingAsyncData();
  const [workerExist, setWorkerExist] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [employee, setEmployee] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterArray, setFilterArray] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const rout = useRouter();
  // Searching Functionality
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
  // Getting Data
  function fecthData() {
    if (user_id) {
      fetch(`http://192.168.29.216:5001/api/${user_id}`)
        .then((response) => response.json())
        .then((res) => {
          if (res.status == 401) {
            alert("Invalid Request !");
          }
          if (res.status == 200) {
            if (res.data[0].workers.length == 0) {
              setLoading(false);
              setWorkerExist(false);
            } else {
              setWorkerExist(true);
              setLoading(false);
              setEmployee(res.data[0].workers);
              setFilterArray(res.data[0].workers);
            }
          }
        });
    }
  }
  function onAttendence(status, id) {
    const date = new Date().toLocaleDateString();

    if (user_id && id) {
      fetch(
        `http://192.168.29.216:5001/api/update_attendence/${id}/${user_id}`,
        {
          method: "PATCH",
          body: JSON.stringify({ status, date }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((res) => {
          if (res.status == 401) {
            alert("Invalid Request !");
          }
          if (res.status == 200) {
            alert("Attendence Marked Successfully...");
            rout.replace("/MarkAttendence");
          }
        });
    }
  }
  useEffect(() => {
    fecthData();
  }, [user_id]);

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
              | Mark
              <Text style={{ color: "#fff" }}> Your Worker Attendence</Text>
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
              value={searchText}
              onChangeText={filteringData}
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

          <Text
            style={{
              fontSize: 20,
              fontFamily: "MontserratSemiBold",
              marginBottom: 0,
              marginTop: 40,
              color: theme == "light" ? "#243F59" : "#fff",
            }}
          >
            Working Employee
            <Text style={{ color: "#C5D877" }}>
              {" "}
              {filterArray.length ? filterArray.length : 0}
            </Text>
          </Text>
          {isLoading == true ? (
            <ActivityIndicator
              color="#C5D877"
              size="large"
              style={{ marginTop: 50 }}
            />
          ) : workerExist == false || notFound == true ? (
            <Text style={{ color: theme == "light" ? "#243F59" : "#fff" }}>
              No employee exist!
            </Text>
          ) : (
            filterArray.map((data, index) => {
              return data.attendence.length == 0 ? (
                <View
                  from={{
                    translateY: 100,
                  }}
                  animate={{
                    translateY: 0,
                  }}
                  transition={{
                    type: "spring",
                    duration: 1000,
                    delay: 100,
                  }}
                  key={"attendence_employee" + index}
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
                      uri: data.image.url,
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
                      {data.work_type}
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
                        onAttendence("P", data.worker_id);
                      }}
                    >
                      <Text
                        style={[
                          styles.attendenceText,
                          { color: "#243F59", backgroundColor: "#fff" },
                        ]}
                      >
                        P
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        onAttendence("A", data.worker_id);
                      }}
                    >
                      <Text
                        style={[
                          styles.attendenceText,
                          { color: "#243F59", backgroundColor: "#fff" },
                        ]}
                      >
                        A
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        onAttendence("H", data.worker_id);
                      }}
                    >
                      <Text
                        style={[
                          styles.attendenceText,
                          { color: "#243F59", backgroundColor: "#fff" },
                        ]}
                      >
                        H
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View key={"attendence_employee" + index}>
                  {data.attendence.map((element, index) => {
                    return element.date == new Date().toLocaleDateString() ? (
                      <View
                        key={"attendence_employee_inner" + index}
                        from={{
                          translateY: 100,
                        }}
                        animate={{
                          translateY: 0,
                          opacity: 0.3,
                        }}
                        transition={{
                          type: "spring",
                          duration: 1000,
                          delay: 100,
                        }}
                        style={{
                          width: "100%",
                          marginVertical: 10,
                          paddingVertical: 10,
                          paddingHorizontal: 10,
                          borderRadius: 4,
                          borderBottomWidth: 1,
                          backgroundColor:
                            theme == "light"
                              ? "rgba(0,0,0,0.1)"
                              : "rgba(255,255,255,0.1)",
                          flexDirection: "row",
                        }}
                      >
                        <Image
                          source={{
                            uri: data.image.url,
                          }}
                          alt="Not Found"
                          style={{ width: 70, height: 70, borderRadius: 50 }}
                          resizeMode="contain"
                        />
                        <View style={{ padding: 10, width: "40%" }}>
                          <Text
                            style={{
                              color: theme == "light" ? "#243F59" : "#ffffff",
                              fontSize: 16,
                            }}
                          >
                            {data.name}
                          </Text>
                          <Text style={{ color: "grey", fontSize: 12 }}>
                            {data.work_type}
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
                          <TouchableWithoutFeedback>
                            <Text
                              style={[
                                styles.attendenceText,
                                {
                                  color:
                                    element.status == "P" ? "#fff" : "#243F59",
                                  backgroundColor:
                                    element.status == "P" ? "#243F59" : "#fff",
                                },
                              ]}
                            >
                              P
                            </Text>
                          </TouchableWithoutFeedback>
                          <TouchableWithoutFeedback>
                            <Text
                              style={[
                                styles.attendenceText,
                                {
                                  color:
                                    element.status == "A" ? "#fff" : "#243F59",
                                  backgroundColor:
                                    element.status == "A" ? "#243F59" : "#fff",
                                },
                              ]}
                            >
                              A
                            </Text>
                          </TouchableWithoutFeedback>
                          <TouchableWithoutFeedback>
                            <Text
                              style={[
                                styles.attendenceText,
                                { color: "#243F59", backgroundColor: "#fff" },
                              ]}
                            >
                              H
                            </Text>
                          </TouchableWithoutFeedback>
                        </View>
                      </View>
                    ) : (
                      <View
                        key={"attendence_employee_inner" + index}
                        from={{
                          translateY: 100,
                        }}
                        animate={{
                          translateY: 0,
                        }}
                        transition={{
                          type: "spring",
                          duration: 1000,
                          delay: 100,
                        }}
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
                            uri: data.image.url,
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
                            {data.work_type}
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
                              onAttendence("P", data.worker_id);
                            }}
                          >
                            <Text
                              style={[
                                styles.attendenceText,
                                {
                                  color: "#C5D877",
                                  backgroundColor: "#243F59",
                                },
                              ]}
                            >
                              P
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              onAttendence("A", data.worker_id);
                            }}
                          >
                            <Text
                              style={[
                                styles.attendenceText,
                                { color: "#243F59", backgroundColor: "#fff" },
                              ]}
                            >
                              A
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              onAttendence("H", data.worker_id);
                            }}
                          >
                            <Text
                              style={[
                                styles.attendenceText,
                                { color: "#243F59", backgroundColor: "#fff" },
                              ]}
                            >
                              H
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    );
                  })}
                </View>
              );
            })
          )}
        </View>
      </ScrollView>
      {/*Bottom Footer*/}

      <Bottom active="attendence" />
    </SafeAreaView>
  );
};

export default MarkAttendence;
