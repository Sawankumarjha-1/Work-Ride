import { Stack } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StatusBar,
  ImageBackground,
  Text,
  Image,
  ActivityIndicator,
  useColorScheme,
} from "react-native";
// import { View } from "react-native";
import { Link, useRouter } from "expo-router";
import styles from "../styles";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import Bottom from "../components/Bottom";
import { TouchableOpacity } from "react-native-gesture-handler";
import { View, ScrollView } from "moti";
import { Skeleton } from "moti/skeleton";

import GettingAsyncData from "./GettingAsyncData";
const EmployerHomeScreen = () => {
  const rout = useRouter();

  const theme = useColorScheme();
  const { company_name, name, image, user_id } = GettingAsyncData();
  const [workerExist, setWorkerExist] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [workerData, setWorkerData] = useState([]);

  function fecthData() {
    if (user_id) {
      fetch(`http://192.168.29.216:5001/api/${user_id.trim()}`)
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
              setWorkerData(res.data[0].workers);
            }
          }
        });
    }
  }
  async function deleteWorker(worker_id) {
    await fetch(
      `http://192.168.29.216:5001/api/delete_worker/${user_id}/${worker_id}`,
      {
        method: "Delete",
      }
    )
      .then((result) => result.json())
      .then((res) => {
        alert(res.message);
        rout.replace("/EmployerHomeScreen");
      })
      .catch((e) => {
        console.log(e);
      });
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
            <Skeleton
              colorMode={theme == "light" ? "light" : "dark"}
              radius="round"
              height={150}
              width={150}
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
            </Skeleton>
            <View style={{ padding: 20 }}>
              <Text style={{ color: "#C5D877", fontSize: 20 }}>{name}</Text>
              <Text style={{ color: "#fff", fontSize: 16 }}>
                {company_name}
              </Text>
            </View>
          </View>
        </ImageBackground>
        <View style={styles.formContainer}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: "MontserratSemiBold",
              marginBottom: 10,
              marginTop: 40,
              color: theme == "light" ? "#243F59" : "#fff",
            }}
          >
            Working Employee
            <Text style={{ color: "#C5D877" }}>
              {" "}
              {workerData.length ? workerData.length : 0}
            </Text>
          </Text>

          {isLoading == true ? (
            <ActivityIndicator
              color={theme == "light" ? "#C5D877" : "#fff"}
              size="large"
              style={{ marginTop: 50 }}
            />
          ) : workerExist == false ? (
            <Text>No Worker Exist !</Text>
          ) : (
            workerData.map((data, index) => {
              return (
                <View
                  key={"employee" + index}
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
                    // width: "100%",
                    marginVertical: 10,
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderRadius: 4,
                    borderBottomWidth: 1,
                    borderBottomColor:
                      theme == "light" ? "#eee" : "rgba(255,255,255,0.1)",
                    flexDirection: "row",
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      rout.push(`/IndividualEmployee?id=${data.worker_id}`)
                    }
                  >
                    <Skeleton
                      radius="round"
                      height={70}
                      width={70}
                      colorMode="light"
                    >
                      <Image
                        source={{
                          uri: data.image.url,
                        }}
                        alt="Not Found"
                        style={{ width: 70, height: 70, borderRadius: 50 }}
                        resizeMode="contain"
                      />
                    </Skeleton>
                  </TouchableOpacity>
                  <View style={{ padding: 10, width: "50%" }}>
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
                      padding: 10,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",

                      width: "25%",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        rout.push(`/EditEmployee?id=${data.worker_id}`)
                      }
                    >
                      <Entypo
                        name="edit"
                        size={20}
                        style={{
                          color: "skyblue",
                          padding: 10,
                        }}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        deleteWorker(data.worker_id);
                      }}
                    >
                      <AntDesign
                        name="delete"
                        size={20}
                        style={{ color: "red" }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })
          )}
        </View>
      </ScrollView>
      {/*Bottom Footer*/}
      <Bottom active="home" />
    </SafeAreaView>
  );
};

export default EmployerHomeScreen;
