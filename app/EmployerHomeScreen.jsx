import { Stack } from "expo-router";
import React, { useState } from "react";
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
const employee = [
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
const EmployerHomeScreen = () => {
  const rout = useRouter();
  const theme = useColorScheme();

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
            <Image
              source={{
                uri: "https://img.freepik.com/free-photo/portrait-handsome-man-with-dark-hairstyle-bristle-toothy-smile-dressed-white-sweatshirt-feels-very-glad-poses-indoor-pleased-european-guy-being-good-mood-smiles-positively-emotions-concept_273609-61405.jpg",
              }}
              alt="Not Found"
              style={{ width: 150, height: 150, borderRadius: 200 }}
              resizeMode="contain"
            />

            <View style={{ padding: 20 }}>
              <Text style={{ color: "#C5D877", fontSize: 20 }}>
                Rohan Sharma
              </Text>
              <Text style={{ color: "#fff", fontSize: 16 }}>Contractor</Text>
            </View>
          </View>
        </ImageBackground>
        <View style={styles.formContainer}>
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
              color={theme == "light" ? "#C5D877" : "#fff"}
              size="large"
              style={{ marginTop: 50 }}
            />
          ) : (
            employee.map((data, index) => {
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
                    onPress={() => rout.push("/IndividualEmployee")}
                  >
                    <Skeleton
                      radius="round"
                      height={70}
                      width={70}
                      colorMode="light"
                    >
                      <Image
                        source={{
                          uri: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
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
                      Permanent | Mistri
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
                    <TouchableOpacity>
                      <Link href="/EditEmployee">
                        <Entypo
                          name="edit"
                          size={20}
                          style={{
                            color: "skyblue",
                            padding: 10,
                          }}
                        />
                      </Link>
                    </TouchableOpacity>

                    <TouchableOpacity>
                      <Link href="">
                        <AntDesign
                          name="delete"
                          size={20}
                          style={{ color: "red" }}
                        />
                      </Link>
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
