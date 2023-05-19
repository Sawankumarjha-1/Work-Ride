import { Stack, useRouter } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  StatusBar,
  ImageBackground,
  Text,
  Image,
  Pressable,
  useColorScheme,
} from "react-native";
import { View, useAnimationState, ScrollView } from "moti";
import styles from "../styles";
import AntDesign from "react-native-vector-icons/AntDesign";
import Back from "../components/Back";
const Animation = () => {
  return useAnimationState({
    from: {
      height: 0,
      scaleY: 0,
      backfaceVisibility: "hidden",
      transition: { type: "timing", duration: 300, delay: 100 },
    },
    to: {
      height: 200,
      scaleY: 1,
      transition: { type: "timing", duration: 300, delay: 100 },
      backfaceVisibility: "visible",
    },
  });
};
const Animation2 = () => {
  return useAnimationState({
    to: {
      height: 0,
      scaleY: 0,
      backfaceVisibility: "hidden",
      transition: { type: "timing", duration: 300, delay: 100 },
    },
    from: {
      height: 200,
      scaleY: 1,
      transition: { type: "timing", duration: 300, delay: 100 },
      backfaceVisibility: "visible",
    },
  });
};
const IndividualEmployee = () => {
  const theme = useColorScheme();
  const fadeInDown = Animation();
  const fadeInDown2 = Animation2();
  const fadeInDown3 = Animation2();

  const onPress = () => {
    fadeInDown.transitionTo((state) => {
      if (state === "from") {
        return "to";
      } else {
        return "from";
      }
    });
  };
  const onPress2 = () => {
    fadeInDown2.transitionTo((state) => {
      if (state === "from") {
        return "to";
      } else {
        return "from";
      }
    });
  };
  const onPress3 = () => {
    fadeInDown3.transitionTo((state) => {
      if (state === "from") {
        return "to";
      } else {
        return "from";
      }
    });
  };
  const router = useRouter();

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
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
        from={{ translateY: 500 }}
        animate={{ translateY: 0 }}
        transition={{ type: "timing", duration: 600, delay: 100 }}
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
          {/*Current Month Details */}
          <View>
            <Pressable
              style={styles.individualEmployeeHeading}
              onPress={onPress}
            >
              <Text style={styles.individualEmployeeHeadingText}>
                Paid Amount Details
              </Text>
              <AntDesign
                name="downcircle"
                size={20}
                style={{ color: "#C5D877" }}
              />
            </Pressable>
            <View
              delay={300}
              state={fadeInDown}
              style={[
                styles.individualEmployeeSlide,
                {
                  backgroundColor:
                    theme == "light" ? "#fff" : "rgba(255,255,255,0.7)",
                },
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontFamily: "MontserratRegular" }}>
                  Present Working Days :
                </Text>
                <Text
                  style={{ fontFamily: "MontserratBold", color: "#243F59" }}
                >
                  20
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontFamily: "MontserratRegular" }}>
                  Absent Working Days :
                </Text>
                <Text
                  style={{ fontFamily: "MontserratBold", color: "#243F59" }}
                >
                  10
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontFamily: "MontserratRegular" }}>
                  Holiday :
                </Text>
                <Text
                  style={{ fontFamily: "MontserratBold", color: "#243F59" }}
                >
                  20
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontFamily: "MontserratRegular" }}>
                  Total Paid Amount:
                </Text>
                <Text
                  style={{ fontFamily: "MontserratBold", color: "#243F59" }}
                >
                  20
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontFamily: "MontserratRegular" }}>
                  Total Salary :
                </Text>
                <Text
                  style={{ fontFamily: "MontserratBold", color: "#243F59" }}
                >
                  20
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontFamily: "MontserratRegular" }}>
                  Balance :
                </Text>
                <Text
                  style={{ fontFamily: "MontserratBold", color: "#243F59" }}
                >
                  20
                </Text>
              </View>
            </View>
          </View>
          {/*Absent Working Days */}
          <View>
            <Pressable
              style={styles.individualEmployeeHeading}
              onPress={onPress2}
            >
              <Text style={styles.individualEmployeeHeadingText}>
                Paid Amount Details
              </Text>
              <AntDesign
                name="downcircle"
                size={20}
                style={{ color: "#C5D877" }}
              />
            </Pressable>
            <View
              delay={300}
              state={fadeInDown2}
              style={[styles.individualEmployeeSlide]}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontFamily: "MontserratRegular" }}>
                  Present Working Days :
                </Text>
                <Text
                  style={{ fontFamily: "MontserratBold", color: "#243F59" }}
                >
                  20
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontFamily: "MontserratRegular" }}>
                  Absent Working Days :
                </Text>
                <Text
                  style={{ fontFamily: "MontserratBold", color: "#243F59" }}
                >
                  10
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontFamily: "MontserratRegular" }}>
                  Holiday :
                </Text>
                <Text
                  style={{ fontFamily: "MontserratBold", color: "#243F59" }}
                >
                  20
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontFamily: "MontserratRegular" }}>
                  Total Paid Amount:
                </Text>
                <Text
                  style={{ fontFamily: "MontserratBold", color: "#243F59" }}
                >
                  20
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontFamily: "MontserratRegular" }}>
                  Total Salary :
                </Text>
                <Text
                  style={{ fontFamily: "MontserratBold", color: "#243F59" }}
                >
                  20
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontFamily: "MontserratRegular" }}>
                  Balance :
                </Text>
                <Text
                  style={{ fontFamily: "MontserratBold", color: "#243F59" }}
                >
                  20
                </Text>
              </View>
            </View>
          </View>
          {/*Paid Amount Details */}
          <View>
            <Pressable
              style={styles.individualEmployeeHeading}
              onPress={onPress3}
            >
              <Text style={styles.individualEmployeeHeadingText}>
                Paid Amount Details
              </Text>
              <AntDesign
                name="downcircle"
                size={20}
                style={{ color: "#C5D877" }}
              />
            </Pressable>
            <View
              delay={300}
              state={fadeInDown3}
              style={[styles.individualEmployeeSlide]}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontFamily: "MontserratRegular" }}>
                  Present Working Days :
                </Text>
                <Text
                  style={{ fontFamily: "MontserratBold", color: "#243F59" }}
                >
                  20
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontFamily: "MontserratRegular" }}>
                  Absent Working Days :
                </Text>
                <Text
                  style={{ fontFamily: "MontserratBold", color: "#243F59" }}
                >
                  10
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontFamily: "MontserratRegular" }}>
                  Holiday :
                </Text>
                <Text
                  style={{ fontFamily: "MontserratBold", color: "#243F59" }}
                >
                  20
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontFamily: "MontserratRegular" }}>
                  Total Paid Amount:
                </Text>
                <Text
                  style={{ fontFamily: "MontserratBold", color: "#243F59" }}
                >
                  20
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontFamily: "MontserratRegular" }}>
                  Total Salary :
                </Text>
                <Text
                  style={{ fontFamily: "MontserratBold", color: "#243F59" }}
                >
                  20
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontFamily: "MontserratRegular" }}>
                  Balance :
                </Text>
                <Text
                  style={{ fontFamily: "MontserratBold", color: "#243F59" }}
                >
                  20
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default IndividualEmployee;
