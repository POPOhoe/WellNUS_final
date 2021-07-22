import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { View, Image } from "react-native";
import { Text } from "./TextComponents";
import { CourseScreenComponent } from "./CourseScreenComponent";
import { windowWidth, windowHeight } from "../infrastructure/theme/dimensions";
import { Spacer } from "./spacer.component";
import { AntDesign } from "@expo/vector-icons";

export const CourseScreen3 = ({ navigation }) => {
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
              uri: "https://cdn.dribbble.com/users/1787323/screenshots/15418612/media/00625828d9e2e022502943e475f61863.png?compress=1&resize=1600x1200",
            }}
          />
          <Spacer location="top" size="large" />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text variant="title">Overcoming Stress</Text>
            <AntDesign name="hearto" size={24} color="black" />
          </View>
          <Spacer location="top" size="large" />
          <Text variant="body">
            Life can be stressful, and stress can have serious repercussions on
            our health. At one time or another, many of us will have experienced
            that sense of being overwhelmed, as if everything were too much.
            Sometimes, simply taking time to pause and rest the mind can be
            enough to feel better in the moment, so before going any further,
            here’s a quick exercise to help distance yourself from stressful
            thoughts right away.
          </Text>
          <Spacer location="top" size="large" />
          <TouchableOpacity
            onPress={() => navigation.navigate("Stressed Out", { index: 0 })}
          >
            <CourseScreenComponent
              photo="https://cdn.dribbble.com/users/1787323/screenshots/15418612/media/0d688b1ccda274550698f38e45dc70c6.png?compress=1&resize=1600x1200"
              title="Day 1"
              description="20 minutes"
            />
          </TouchableOpacity>
          <Spacer position="top" size="large" />
          <TouchableOpacity
            onPress={() => navigation.navigate("Stressed Out", { index: 1 })}
          >
            <CourseScreenComponent
              photo="https://cdn.dribbble.com/users/1787323/screenshots/15418612/media/8f0a3951e1b94a653188ab7a85b5f9df.png?compress=1&resize=1600x1200"
              title="Day 2"
              description="20 minutes"
            />
          </TouchableOpacity>
          <Spacer position="top" size="large" />
          <TouchableOpacity
            onPress={() => navigation.navigate("Stressed Out", { index: 2 })}
          >
            <CourseScreenComponent
              photo="https://cdn.dribbble.com/users/1787323/screenshots/15418612/media/dffb9172098b48648bf6fd28127673d8.png?compress=1&resize=1600x1200"
              title="Day 3"
              description="20 minutes"
            />
          </TouchableOpacity>
          <Spacer position="top" size="large" />
          <TouchableOpacity
            onPress={() => navigation.navigate("Stressed Out", { index: 3 })}
          >
            <CourseScreenComponent
              photo="https://cdn.dribbble.com/users/1787323/screenshots/15418612/media/eed5efc4110ad5b690f6b847f5b1ecea.png?compress=1&resize=1600x1200"
              title="Day 4"
              description="20 minutes"
            />
          </TouchableOpacity>
          <Spacer position="top" size="large" />
          <TouchableOpacity
            onPress={() => navigation.navigate("Stressed Out", { index: 4 })}
          >
            <CourseScreenComponent
              photo="https://cdn.dribbble.com/users/1787323/screenshots/15418612/media/9363be585c24df70c5a6378dec063024.png?compress=1&resize=1600x1200"
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
