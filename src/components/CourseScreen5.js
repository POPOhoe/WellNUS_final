import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { View, Image } from "react-native";
import { Text } from "./TextComponents";
import { CourseScreenComponent } from "./CourseScreenComponent";
import { windowWidth, windowHeight } from "../infrastructure/theme/dimensions";
import { Spacer } from "./spacer.component";
import { AntDesign } from "@expo/vector-icons";

export const CourseScreen5 = ({ navigation }) => {
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
              uri: "https://cdn.dribbble.com/users/1787323/screenshots/15325939/media/cd5cc87ec417f659f6b9e18389b177d4.png?compress=1&resize=1600x1200",
            }}
          />
          <Spacer location="top" size="large" />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text variant="title">Productivity</Text>
            <AntDesign name="hearto" size={24} color="black" />
          </View>
          <Spacer location="top" size="large" />
          <Text variant="body">
            What’s the one productivity tool you can’t imagine living without?
            Maybe it’s a time-management app that keeps you on the straight and
            narrow. Perhaps you rely on a task/project organizer. It’s a pretty
            fair bet that few people would list meditation as their go-to tool.
            Meditation obviously wasn’t designed to make us more productive, but
            it’s not that surprising that it helps.
          </Text>
          <Spacer location="top" size="large" />
          <TouchableOpacity
            onPress={() => navigation.navigate("Productivity", { index: 0 })}
          >
            <CourseScreenComponent
              photo="https://cdn.dribbble.com/users/1787323/screenshots/15325939/media/9d5eb0ea281d9acd88ec8e76c54af1a9.png?compress=1&resize=1600x1200"
              title="Day 1"
              description="20 minutes"
            />
          </TouchableOpacity>
          <Spacer position="top" size="large" />
          <TouchableOpacity
            onPress={() => navigation.navigate("Productivity", { index: 1 })}
          >
            <CourseScreenComponent
              photo="https://cdn.dribbble.com/users/1787323/screenshots/15325939/media/9b55480cec65bd968b29ef492ea5c07a.png?compress=1&resize=1600x1200"
              title="Day 2"
              description="20 minutes"
            />
          </TouchableOpacity>
          <Spacer position="top" size="large" />
          <TouchableOpacity
            onPress={() => navigation.navigate("Productivity", { index: 2 })}
          >
            <CourseScreenComponent
              photo="https://cdn.dribbble.com/users/1787323/screenshots/15325939/media/0b24ee8b7e2aa92d912facf7db3919e6.png?compress=1&resize=1600x1200"
              title="Day 3"
              description="20 minutes"
            />
          </TouchableOpacity>
          <Spacer position="top" size="large" />
          <TouchableOpacity
            onPress={() => navigation.navigate("Productivity", { index: 3 })}
          >
            <CourseScreenComponent
              photo="https://cdn.dribbble.com/users/1787323/screenshots/15325939/media/461100b93e7450d3da3f6b42f4c13562.png?compress=1&resize=1600x1200"
              title="Day 4"
              description="20 minutes"
            />
          </TouchableOpacity>
          <Spacer position="top" size="large" />
          <TouchableOpacity
            onPress={() => navigation.navigate("Productivity", { index: 4 })}
          >
            <CourseScreenComponent
              photo="https://cdn.dribbble.com/users/1787323/screenshots/15325939/media/51d33e0a39ca141dc5a8acbf49a969db.png?compress=1&resize=1600x1200"
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
