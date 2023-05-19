import { Link, Stack, useRouter } from "expo-router";
import React from "react";
import { MotiImage, MotiView } from "moti";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { ImageBackground } from "react-native";
const Home = () => {
  const rout = useRouter();
  const theme = useColorScheme();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={"light-content"} translucent={true} />
      <Stack.Screen options={{ headerShown: false }} />
      <MotiView
        from={{ translateX: -500 }}
        animate={{ translateX: 0 }}
        transition={{ type: "timing", duration: 600, delay: 100 }}
      >
        <ImageBackground
          source={require("../assets/images/background.jpg")}
          resizeMode="cover"
          style={{ top: 0, width: "100%", height: "100%" }}
        >
          <View
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: theme == "light" ? "#243F59" : "#000",
              opacity: 0.9,
              alignItems: "flex-start",
              paddingHorizontal: 30,
              elevation: 20,
              shadowColor: "#fff",
              justifyContent: "center",
            }}
          >
            <MotiImage
              from={{
                scale: 0.1,
                translateX: 200,
              }}
              animate={{
                scale: 1,
                translateX: 0,
              }}
              transition={{
                type: "timing",
                duration: 2000,
                delay: 100,
              }}
              source={require("../assets/images/circleLogo.png")}
              style={{ width: "100%", height: 200, marginTop: 50 }}
              resizeMode="contain"
            />
            {/**First Heading */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  color: "#C5D877",
                  fontSize: 70,
                }}
              >
                |{" "}
              </Text>
              <Text
                style={{
                  color: "#C5D877",
                  fontSize: 70,
                  fontFamily: "MontserratBold",
                }}
              >
                M
              </Text>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 50,
                  fontFamily: "MontserratSemiBold",
                }}
              >
                anage
              </Text>
            </View>
            {/**Second Heading */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 70,
                }}
              >
                |{" "}
              </Text>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 70,
                  fontFamily: "MontserratBold",
                }}
              >
                W
              </Text>
              <Text
                style={{
                  color: "#C5D877",
                  fontSize: 50,
                  fontFamily: "MontserratSemiBold",
                }}
              >
                orkers
              </Text>
            </View>
            {/**Third Heading */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  color: "#C5D877",
                  fontSize: 70,
                }}
              >
                |{" "}
              </Text>
              <Text
                style={{
                  color: "#C5D877",
                  fontSize: 70,
                  fontFamily: "MontserratBold",
                }}
              >
                S
              </Text>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 50,
                  fontFamily: "MontserratSemiBold",
                }}
              >
                eamlessly
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                rout.push("/Login?name=Employer");
              }}
              style={{
                width: "100%",
                paddingVertical: 10,
                paddingHorizontal: 20,
                backgroundColor: "#C5D877",
                borderRadius: 4,
                marginTop: 20,
                alignItems: "center",
              }}
            >
              <Text
                style={{ color: "#243F59", fontSize: 16, letterSpacing: 1.5 }}
              >
                Employer Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "100%",
                paddingVertical: 10,
                paddingHorizontal: 20,
                backgroundColor: "#fff",
                borderRadius: 4,
                marginTop: 20,
                alignItems: "center",
              }}
              onPress={() => {
                rout.push("/Login?name=Worker");
              }}
            >
              <MotiView>
                <Text
                  style={{ color: "#243F59", fontSize: 16, letterSpacing: 1.5 }}
                >
                  Worker Login
                </Text>
              </MotiView>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </MotiView>
    </SafeAreaView>
  );
};

export default Home;
