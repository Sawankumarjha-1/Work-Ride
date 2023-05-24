import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
export default function GettingAsyncData() {
  const rout = useRouter();
  const [info, setInfo] = useState({
    name: "",
    company_name: "",
    image: "",
    user_id: "",
    Category: "",
  });
  const getData = async () => {
    try {
      const name = await AsyncStorage.getItem("name");
      const company_name = await AsyncStorage.getItem("company_name");
      const image = await AsyncStorage.getItem("image");
      const user_id = await AsyncStorage.getItem("user_id");
      const Category = await AsyncStorage.getItem("Category");
      // console.log(name + "\n" + image + "\n" + user_id + "\n" + company_name);

      if (
        name == null ||
        company_name == null ||
        image == null ||
        user_id == null ||
        Category == null
      ) {
        rout.replace("/home");
      } else {
        setInfo({ name, company_name, image, user_id, Category });
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return info;
}
