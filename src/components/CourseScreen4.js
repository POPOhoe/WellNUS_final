import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { View, Image } from "react-native";
import { Text } from "./TextComponents";
import { CourseScreenComponent } from "./CourseScreenComponent";
import { windowWidth, windowHeight } from "../infrastructure/theme/dimensions";
import { Spacer } from "./spacer.component";
import { AntDesign } from "@expo/vector-icons";

export const CourseScreen4 = ({ navigation }) => {
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
              uri: "https://cdn.dribbble.com/users/1787323/screenshots/15877020/media/b0be5318efc0bdb26ca1b38321a90ad6.png?compress=1&resize=1600x1200",
            }}
          />
          <Spacer location="top" size="large" />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text variant="title">Managing Depression</Text>
            <AntDesign name="hearto" size={24} color="black" />
          </View>
          <Spacer location="top" size="large" />
          <Text variant="body">
            The World Health Organization recently listed depression as the
            leading cause of ill health and disability worldwide. It’s a global
            problem, and one for which many possible solutions have been
            explored; meditation and mindfulness are examples of solutions that
            have grown rapidly in popularity in recent years.
          </Text>
          <Spacer location="top" size="large" />
          <TouchableOpacity
            onPress={() => navigation.navigate("Depression", { index: 0 })}
          >
            <CourseScreenComponent
              photo="https://cdn.dribbble.com/users/1787323/screenshots/15877020/media/c931647f010a4788e9caa28e6fd00399.png?compress=1&resize=1600x1200"
              title="Day 1"
              description="20 minutes"
            />
          </TouchableOpacity>
          <Spacer position="top" size="large" />
          <TouchableOpacity
            onPress={() => navigation.navigate("Depression", { index: 1 })}
          >
            <CourseScreenComponent
              photo="https://cdn.dribbble.com/users/1787323/screenshots/15877020/media/8b076f38acea6b137982c15ebc46dcba.png?compress=1&resize=1600x1200"
              title="Day 2"
              description="20 minutes"
            />
          </TouchableOpacity>
          <Spacer position="top" size="large" />
          <TouchableOpacity
            onPress={() => navigation.navigate("Depression", { index: 2 })}
          >
            <CourseScreenComponent
              photo="https://cdn.dribbble.com/users/1787323/screenshots/15877020/media/6f27a4b7d4326a5fff5328725749d8cb.png?compress=1&resize=1600x1200"
              title="Day 3"
              description="20 minutes"
            />
          </TouchableOpacity>
          <Spacer position="top" size="large" />
          <TouchableOpacity
            onPress={() => navigation.navigate("Depression", { index: 3 })}
          >
            <CourseScreenComponent
              photo="https://cdn.dribbble.com/users/1787323/screenshots/15877020/media/42d965685a64e1eba273c52e8be6b272.png?compress=1&resize=1600x1200"
              title="Day 4"
              description="20 minutes"
            />
          </TouchableOpacity>
          <Spacer position="top" size="large" />
          <TouchableOpacity
            onPress={() => navigation.navigate("Depression", { index: 4 })}
          >
            <CourseScreenComponent
              photo="https://cdn.dribbble.com/users/1787323/screenshots/15877020/media/e5fe306c49bc41f59f40fe9a3c5a2a2e.png?compress=1&resize=1600x1200"
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
