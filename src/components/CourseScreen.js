import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ScrollView, StyleSheet } from "react-native";
import { View, Image } from "react-native";
import { Text } from "../components/TextComponents";
import { CourseScreenComponent } from "../components/CourseScreenComponent";
import { windowWidth, windowHeight } from "../infrastructure/theme/dimensions";
import { Spacer } from "../components/spacer.component";
import { AntDesign } from "@expo/vector-icons";

const tracks = [
  {
    title: "Day 1",
    photo:
      "https://cdn.dribbble.com/users/1787323/screenshots/15130806/media/54a4346b31d77a931ef7d160fe2098bc.png?compress=1&resize=1600x1200",
  },
  {},
];

export const CourseScreen = ({ navigation }) => {
  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <Image
            resizeMethod="auto"
            style={{
              width: windowWidth * (8.8 / 10),
              height: windowHeight / 3,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10 / 2,
              overflow: "hidden",
            }}
            source={{
              uri: "https://cdn.dribbble.com/users/1787323/screenshots/15130806/media/54a4346b31d77a931ef7d160fe2098bc.png?compress=1&resize=1600x1200",
            }}
          />
          <Spacer location="top" size="large" />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text variant="title">Basics</Text>
            <AntDesign name="hearto" size={24} color="black" />
          </View>
          <Spacer location="top" size="large" />
          <Text variant="body">
            Space travel is very much like meditation, believe it or not. Live
            happier and healthier by learning the fundamentals of meditation and
            mindfulness!
          </Text>
          <Spacer location="top" size="large" />

          <CourseScreenComponent
            photo="https://cdn.dribbble.com/users/1787323/screenshots/15130806/media/f84745b944add9b99647d395d3b2f7f0.png?compress=1&resize=1600x1200"
            title="Day 1"
            description="10 minutes"
          />
          <Spacer position="top" size="large" />
          <CourseScreenComponent
            photo="https://cdn.dribbble.com/users/1787323/screenshots/15130806/media/3553da3932c15f187c51d5d35f1e4c80.png?compress=1&resize=1600x1200"
            title="Day 2"
            description="10 minutes"
          />
          <Spacer position="top" size="large" />
          <CourseScreenComponent
            photo="https://cdn.dribbble.com/users/1787323/screenshots/15130806/media/ccfd2b63c1ebbcdaf72c03665fe653f0.png?compress=1&resize=1600x1200"
            title="Day 3"
            description="10 minutes"
          />
          <Spacer position="top" size="large" />
          <CourseScreenComponent
            photo="https://cdn.dribbble.com/users/1787323/screenshots/15130806/media/40cd28b0e72d79997ba04e3350084114.png?compress=1&resize=1600x1200"
            title="Day 4"
            description="10 minutes"
          />
          <Spacer position="top" size="large" />
          <CourseScreenComponent
            photo="https://cdn.dribbble.com/users/1787323/screenshots/15130806/media/27d32229349af71929b92b994dd11981.png?compress=1&resize=1600x1200"
            title="Day 5"
            description="10 minutes"
          />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "white",
  },
});
