import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { View, Image } from "react-native";
import { Text } from "./TextComponents";
import { CourseScreenComponent } from "./CourseScreenComponent";
import { windowWidth, windowHeight } from "../infrastructure/theme/dimensions";
import { Spacer } from "./spacer.component";
import { AntDesign } from "@expo/vector-icons";

const tracks = [
  {
    title: "Day 1",
    photo:
      "https://cdn.dribbble.com/users/1787323/screenshots/15130806/media/54a4346b31d77a931ef7d160fe2098bc.png?compress=1&resize=1600x1200",
  },
  {},
];

export const CourseScreen2 = ({ navigation }) => {
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
              uri: "https://cdn.dribbble.com/users/1787323/screenshots/15410562/media/f17ec109450f56021290a1339db8db72.png?compress=1&resize=1600x1200",
            }}
          />
          <Spacer location="top" size="large" />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text variant="title">Meditation for Anxiety</Text>
            <AntDesign name="hearto" size={24} color="black" />
          </View>
          <Spacer location="top" size="large" />
          <Text variant="body">
            Anyone who has ever been in the grip of anxiety knows how intense it
            can be. According to the National Alliance on Mental Illness, an
            estimated 40 million adults in the U.S. have some kind of anxiety
            disorder. Worldwide, 1 in 14 people are affected. So if you feel
            like you’re the only one dealing with anxiety — and yes, that’s how
            isolating it can feel — be assured you’re not alone.
          </Text>
          <Spacer location="top" size="large" />
          <TouchableOpacity
            onPress={() => navigation.navigate("Anxiety", { index: 0 })}
          >
            <CourseScreenComponent
              photo="https://cdn.dribbble.com/users/1787323/screenshots/15410562/media/ec44c8f2e1bc0dde3e4ca2849baa5eaa.png?compress=1&resize=1600x1200"
              title="Day 1"
              description="20 minutes"
            />
          </TouchableOpacity>
          <Spacer position="top" size="large" />
          <TouchableOpacity
            onPress={() => navigation.navigate("Anxiety", { index: 1 })}
          >
            <CourseScreenComponent
              photo="https://cdn.dribbble.com/users/1787323/screenshots/15410562/media/d6ef8998158da8b8a3f7bd648512dcee.png?compress=1&resize=1600x1200"
              title="Day 2"
              description="20 minutes"
            />
          </TouchableOpacity>
          <Spacer position="top" size="large" />
          <TouchableOpacity
            onPress={() => navigation.navigate("Anxiety", { index: 2 })}
          >
            <CourseScreenComponent
              photo="https://cdn.dribbble.com/users/1787323/screenshots/15410562/media/31382ddd6bbf8f27e31826fea97b09bb.png?compress=1&resize=1600x1200"
              title="Day 3"
              description="20 minutes"
            />
          </TouchableOpacity>
          <Spacer position="top" size="large" />
          <TouchableOpacity
            onPress={() => navigation.navigate("Anxiety", { index: 3 })}
          >
            <CourseScreenComponent
              photo="https://cdn.dribbble.com/users/1787323/screenshots/15410562/media/64c2af5482f0aa0752ea90ef1e71a410.png?compress=1&resize=1600x1200"
              title="Day 4"
              description="20 minutes"
            />
          </TouchableOpacity>
          <Spacer position="top" size="large" />
          <TouchableOpacity
            onPress={() => navigation.navigate("Anxiety", { index: 4 })}
          >
            <CourseScreenComponent
              photo="https://cdn.dribbble.com/users/1787323/screenshots/15410562/media/b4fe6ee2ff0234c237def68f3c4aa452.png?compress=1&resize=1600x1200"
              title="Day 5"
              description="20 minutes"
            />
          </TouchableOpacity>
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
