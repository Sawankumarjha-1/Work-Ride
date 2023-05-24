import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
export default function GettingWorkerAsyncData() {
  const rout = useRouter();
  const [info, setInfo] = useState({
    worker_name: "",
    work_type: "",
    image: "",
    worker_id: "",
    Category: "",
  });
  const getData = async () => {
    try {
      const worker_name = await AsyncStorage.getItem("worker_name");
      const work_type = await AsyncStorage.getItem("work_type");
      const image = await AsyncStorage.getItem("image");
      const worker_id = await AsyncStorage.getItem("worker_id");
      const Category = await AsyncStorage.getItem("Category");
      const employer_id = await AsyncStorage.getItem("employer_id");
      // console.log(name + "\n" + image + "\n" + user_id + "\n" + company_name);

      if (
        worker_name == null ||
        work_type == null ||
        image == null ||
        worker_id == null ||
        Category == null ||
        employer_id == null
      ) {
        rout.replace("/home");
      } else {
        setInfo({
          worker_name,
          work_type,
          worker_id,
          Category,
          employer_id,
          image,
        });
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
