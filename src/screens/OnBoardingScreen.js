import React from "react";
import { Image, StyleSheet } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { Text } from "../components/TextComponents";

export const OnboardingScreen = ({ navigation }) => {
  return (
    <Onboarding
      pages={[
        {
          backgroundColor: "#fff",
          image: (
            <Image
              source={require("../../assets/4f99372704d8fb21d82db7a60b2ce97c.webp")}
              style={{ height: 250, width: 200}}
            />
          ),
          title: "Meditation",
          subtitle: "Get started on your meditation journey with WellNUS!",
        },
        {
          backgroundColor: "#fff",
          image: (
            <Image
              source={require("../../assets/ccecf17ba275770b4b927093c881e620.webp")}
              style={{ height: 250, width: 200}}
            />
          ),
          title: "Mood-Tracking",
          subtitle: "Understand your emotions and mood better",
        },
        {
          backgroundColor: "#fff",
          image: (
            <Image
              source={require("../../assets/13aa8a7bc5548caa32c3ad4569fe9714.webp")}
              style={{ height: 250, width: 200}}
            />
          ),
          title: "Forum",
          subtitle: "Connect with like-minded peers",
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
