import { Stack, useRouter, useSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  ImageBackground,
  Text,
  Image,
  Pressable,
  useColorScheme,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { View, ScrollView } from "moti";
import styles from "../styles";
import Back from "../components/Back";
import GettingAsyncData from "./GettingAsyncData";
const IndividualEmployee = () => {
  const query = useSearchParams();
  const worker_id = query.id;

  const { user_id } = GettingAsyncData();
  const theme = useColorScheme();
  const [attendence, setAttendence] = useState([]);
  const [paid, setPaid] = useState([]);
  const [atlen, setalLen] = useState(5);
  const [palen, setpaLen] = useState(5);
  const [paBtnText, setpaBtnText] = useState("More");
  const [atBtnText, setatBtnText] = useState("More");
  const [image, setImage] = useState("");
  const [worker_name, setWorker_name] = useState("");
  const [work_type, setWorker_type] = useState("");
  const [loading, setLoading] = useState(true);

  function fecthData() {
    if (worker_id && user_id) {
      fetch(
        `http://192.168.29.216:5001/api/get_individual_worker/${user_id}/${worker_id}`
      )
        .then((response) => response.json())
        .then((res) => {
          if (res.status == 401) {
            alert("Invalid Request !");
          }
          if (res.status == 200) {
            setWorker_name(res.data[0].name);
            setWorker_type(res.data[0].work_type);
            setImage(res.data[0].image.url);
            setAttendence(res.data[0].attendence);
            setPaid(res.data[0].paid_amount);
            setLoading(false);
          }
        });
    }
  }
  useEffect(() => {
    fecthData();
  }, [worker_id, user_id]);

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
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          <ImageBackground
            source={require("../assets/images/background.jpg")}
            resizeMode="cover"
            style={[styles.headerImage, { height: 200 }]}
          >
            <View
              style={
                theme == "light" ? styles.headerUpper : styles.darkHeaderUpper
              }
            ></View>
            {/*Buttons for employer login and worker login*/}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                position: "absolute",
                bottom: -50,
                left: 30,
                zIndex: 2,
                flexDirection: "row",
                zIndex: 2,
              }}
            >
              {image && (
                <Image
                  source={{
                    uri: image,
                  }}
                  alt="Not Found"
                  style={{ width: 150, height: 150, borderRadius: 200 }}
                  resizeMode="contain"
                />
              )}
              <View style={{ padding: 20 }}>
                <Text style={{ color: "#C5D877", fontSize: 20 }}>
                  {worker_name}
                </Text>
                <Text style={{ color: "#fff", fontSize: 16 }}>{work_type}</Text>
              </View>
            </View>
          </ImageBackground>

          <View style={styles.formContainer}>
            {/*Attendence Details Details */}
            <View style={{ marginTop: 20 }}>
              <Pressable style={styles.individualEmployeeHeading}>
                <Text
                  style={[
                    styles.individualEmployeeHeadingText,
                    {
                      color: theme == "light" ? "#243F59" : "#fff",
                      borderBottomColor:
                        theme == "light" ? "#eee" : "rgba(255,255,255,0.3)",
                    },
                  ]}
                >
                  Attendence
                </Text>
              </Pressable>
              <View>
                {attendence.length == 0 ? (
                  <Text
                    style={{
                      color: theme == "light" ? "#243F59" : "#fff",
                      paddingHorizontal: 20,
                      paddingVertical: 10,
                      fontFamily: "MontserratRegular",
                    }}
                  >
                    No Data Exist !
                  </Text>
                ) : (
                  attendence.map((data, index) => {
                    return (
                      index < atlen && (
                        <View
                          key={"attendece_details" + index}
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            borderRadius: 4,
                            marginBottom: 5,
                            backgroundColor: "#eee",
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                          }}
                        >
                          <Text style={{ fontFamily: "MontserratRegular" }}>
                            {data.date}
                          </Text>

                          {data.status == "P" ? (
                            <Text
                              style={{
                                fontFamily: "MontserratBold",
                                color: "green",
                              }}
                            >
                              Present
                            </Text>
                          ) : data.status == "A" ? (
                            <Text
                              style={{
                                fontFamily: "MontserratBold",
                                color: "red",
                              }}
                            >
                              Absent
                            </Text>
                          ) : (
                            <Text
                              style={{
                                fontFamily: "MontserratBold",
                                color: "#243F59",
                              }}
                            >
                              Holiday
                            </Text>
                          )}
                        </View>
                      )
                    );
                  })
                )}
                {atlen < attendence.length && (
                  <TouchableOpacity
                    onPress={() => {
                      if (atlen == 5) {
                        setalLen(attendence.length);
                        setatBtnText("Less");
                      } else {
                        setalLen(5);
                        setatBtnText("More");
                      }
                    }}
                  >
                    <Text
                      style={{
                        backgroundColor: "#eee",
                        color: "#243F59",
                        width: 100,
                        borderRadius: 4,
                        fontSize: 16,
                        textAlign: "center",
                        fontFamily: "MontserratRegular",
                        padding: 10,
                      }}
                    >
                      {atBtnText}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            {/*Paid Amount Details */}
            <View>
              <Pressable style={styles.individualEmployeeHeading}>
                <Text
                  style={[
                    styles.individualEmployeeHeadingText,
                    {
                      color: theme == "light" ? "#243F59" : "#fff",
                      borderBottomColor:
                        theme == "light" ? "#eee" : "rgba(255,255,255,0.3)",
                    },
                  ]}
                >
                  Payment Details
                </Text>
              </Pressable>
              <View>
                {paid.length == 0 ? (
                  <Text
                    style={{
                      color: theme == "light" ? "#243F59" : "#fff",
                      paddingHorizontal: 20,
                      paddingVertical: 10,
                      fontFamily: "MontserratRegular",
                    }}
                  >
                    No Data Exist !
                  </Text>
                ) : (
                  paid.map((data, index) => {
                    return (
                      index < palen && (
                        <View
                          key={"payment_details" + index}
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            borderRadius: 4,
                            marginBottom: 5,
                            backgroundColor: "#eee",
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                          }}
                        >
                          <Text style={{ fontFamily: "MontserratRegular" }}>
                            {data.date}
                          </Text>

                          <Text
                            style={{
                              fontFamily: "MontserratBold",
                              color: "green",
                            }}
                          >
                            {data.amount + " /-"}
                          </Text>
                        </View>
                      )
                    );
                  })
                )}
                {palen < paid.length && (
                  <TouchableOpacity
                    onPress={() => {
                      if (palen == 5) {
                        setpaLen(paid.length);
                        setpaBtnText("Less");
                      } else {
                        setpaLen(5);
                        setpaBtnText("More");
                      }
                    }}
                  >
                    <Text
                      style={{
                        backgroundColor: "#eee",
                        color: "#243F59",
                        width: 100,
                        borderRadius: 4,
                        fontSize: 16,
                        textAlign: "center",
                        fontFamily: "MontserratRegular",
                        padding: 10,
                      }}
                    >
                      {paBtnText}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default IndividualEmployee;
