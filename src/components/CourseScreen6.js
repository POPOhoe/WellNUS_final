import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { View, Image } from "react-native";
import { Text } from "./TextComponents";
import { CourseScreenComponent } from "./CourseScreenComponent";
import { windowWidth, windowHeight } from "../infrastructure/theme/dimensions";
import { Spacer } from "./spacer.component";
import { AntDesign } from "@expo/vector-icons";

export const CourseScreen6 = ({ navigation }) => {
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
              uri: "https://cdn.dribbble.com/users/1787323/screenshots/15597277/media/109e5a9e9f38527845f9092b8d0db2f9.png?compress=1&resize=1600x1200",
            }}
          />
          <Spacer location="top" size="large" />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text variant="title">Sleeping Right!</Text>
            <AntDesign name="hearto" size={24} color="black" />
          </View>
          <Spacer location="top" size="large" />
          <Text variant="body">
            Healthy sleep has more to do with quality of rest than quantity of
            hours. Sleep meditations help create the inner conditions needed for
            a truly restful night. Because when we settle the mind, we rest the
            body — and that restfulness is what makes it easier to wind down and
            drift off.
          </Text>
          <Spacer location="top" size="large" />
          <TouchableOpacity
            onPress={() => navigation.navigate("Sleep", { index: 0 })}
          >
            <CourseScreenComponent
              photo="https://cdn.dribbble.com/users/1787323/screenshots/15597277/media/916c2cd132f3369bb6fc1e9f60e5768f.png?compress=1&resize=1600x1200"
              title="Day 1"
              description="20 minutes"
            />
          </TouchableOpacity>
          <Spacer position="top" size="large" />
          <TouchableOpacity
            onPress={() => navigation.navigate("Sleep", { index: 1 })}
          >
            <CourseScreenComponent
              photo="https://cdn.dribbble.com/users/1787323/screenshots/15597277/media/9b927deedbabcfa0687955f49b796534.png?compress=1&resize=1600x1200"
              title="Day 2"
              description="20 minutes"
            />
          </TouchableOpacity>
          <Spacer position="top" size="large" />
          <TouchableOpacity
            onPress={() => navigation.navigate("Sleep", { index: 2 })}
          >
            <CourseScreenComponent
              photo="https://cdn.dribbble.com/users/1787323/screenshots/15597277/media/d98a94d82f7d353983f122e01a36bb08.png?compress=1&resize=1600x1200"
              title="Day 3"
              description="20 minutes"
            />
          </TouchableOpacity>
          <Spacer position="top" size="large" />
          <TouchableOpacity
            onPress={() => navigation.navigate("Sleep", { index: 3 })}
          >
            <CourseScreenComponent
              photo="https://cdn.dribbble.com/users/1787323/screenshots/15597277/media/958fc33dcd498e10021003593507ca28.png?compress=1&resize=1600x1200"
              title="Day 4"
              description="20 minutes"
            />
          </TouchableOpacity>
          <Spacer position="top" size="large" />
          <TouchableOpacity
            onPress={() => navigation.navigate("Sleep", { index: 4 })}
          >
            <CourseScreenComponent
              photo="https://cdn.dribbble.com/users/1787323/screenshots/15597277/media/1498ce0bf405a06c7c73ea3eeecf1444.png?compress=1&resize=1600x1200"
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
