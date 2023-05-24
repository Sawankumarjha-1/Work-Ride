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
  Modal,
  useColorScheme,
} from "react-native";
import { View } from "moti";
import styles from "../styles";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Bottom from "../components/Bottom";
import GettingAsyncData from "./GettingAsyncData";

const EmployeePayment = () => {
  const { user_id } = GettingAsyncData();
  const [modalVisible, setModalVisible] = useState(false);
  const [details, setDetails] = useState({
    id: "",
    image: "",
    worker_id: "",
    work_type: "",
  });
  const theme = useColorScheme();
  const [workerExist, setWorkerExist] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [employee, setEmployee] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterArray, setFilterArray] = useState(employee);
  const [notFound, setNotFound] = useState(false);
  const [amount, setAmount] = useState("");
  const current_date = new Date().toLocaleDateString();
  const [dt, setDate] = useState(current_date);
  const [buttonPress, setButtonPress] = useState(false);

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
  function onPaymentUpdate() {
    if (amount == "" || dt == "") {
      return alert("Please fill all the details....");
    }
    const id = details.id;
    if (user_id && id) {
      setButtonPress(true);
      fetch(`http://192.168.29.216:5001/api/update_payment/${id}/${user_id}`, {
        method: "PATCH",
        body: JSON.stringify({ amount: amount, date: dt }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.status == 401) {
            alert("Invalid Request !");
          }
          if (res.status == 200) {
            alert(res.message);
            setAmount("");
            setDate(new Date().toLocaleDateString());
            setButtonPress(false);
            setModalVisible(false);
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
                  key={"employee_payment" + index}
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
                      justifyContent: "flex-end",

                      width: "35%",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        setDetails({
                          id: data.worker_id,
                          name: data.name,
                          work_type: data.work_type,
                          image: data.image.url,
                        });
                        setModalVisible(true);
                      }}
                    >
                      <MaterialIcons
                        name="payments"
                        size={30}
                        style={{ color: theme == "light" ? "#243F59" : "#fff" }}
                      />
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
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={{
                  uri: details.image,
                }}
                alt="Not Found"
                style={{ width: 70, height: 70, borderRadius: 50 }}
                resizeMode="contain"
              />
              <View style={{ paddingHorizontal: 20 }}>
                <Text style={{ fontSize: 16, color: "#fff" }}>
                  {details.name}
                </Text>
                <Text style={{ fontSize: 12, color: "#C5D877" }}>
                  {details.work_type}
                </Text>
              </View>
            </View>
            <View>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text
                  style={{
                    backgroundColor: "#fff",
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderRadius: 50,
                  }}
                >
                  X
                </Text>
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
                value={dt}
                placeholder="DD/MM/YYYY"
                onChangeText={(text) => setDate(text)}
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
                value={amount}
                onChangeText={(text) => setAmount(text)}
              />
            </View>
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
              <TouchableOpacity
                style={styles.formBtn}
                onPress={onPaymentUpdate}
              >
                <Text style={styles.formBtnLink}>Update</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
      {/*Bottom Footer*/}

      <Bottom active="payments" />
    </SafeAreaView>
  );
};

export default EmployeePayment;
