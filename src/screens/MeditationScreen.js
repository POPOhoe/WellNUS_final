import React from "react";
import { Text } from "../components/TextComponents";
import { ScrollView } from "react-native";
import { MeditationScreenComponent } from "../components/MeditationScreenComponent";
import { MeditationScreenComponent2 } from "../components/MeditationScreenComponent2";
import { MeditationScreenComponent3 } from "../components/MeditationScreenComponent3";
import { CardArea } from "../components/styles/MeditationScreenStyle";
import { Spacer } from "../components/spacer.component";
import Controller from "../components/Controller";

export const MeditationScreen = ({ navigation }) => {
  return (
    <>
      <ScrollView>
        <CardArea style={{ backgroundColor: "white" }}>
          <MeditationScreenComponent
            photo="https://cdn.dribbble.com/users/1787323/screenshots/11102426/media/2f62ba8dc18e8ceb2e8abe5aef7df8ad.png?compress=1&resize=1600x1200"
            title="How to use WellNUS"
            description="start on your meditation journey today"
            onPress={() => navigation.navigate("Welcome")}
          />

          <Spacer location="top" size="large" />
          <Text variant="label">Today's meditation</Text>
          <Spacer location="top" size="large" />
          <MeditationScreenComponent2
            photo="https://cdn.dribbble.com/users/1787323/screenshots/10870264/media/7b391dbdbc06f4a188dfd5d0a1914a9d.png?compress=1&resize=1600x1200"
            title="Stressed Out? "
            description="5 mins"
            onPress={() => navigation.navigate("Stressed")}
          />
          <Spacer location="top" size="large" />
          <Text variant="label">Explore Meditation</Text>
          <Spacer location="top" size="large" />
          <MeditationScreenComponent3
            photo="https://cdn.dribbble.com/users/1787323/screenshots/15491880/media/b7743c488f2f89dd461ad8955405fa29.png?compress=1&resize=1600x1200"
            title="Foundations"
            description="Basics of meditation"
            onPress={() => navigation.navigate("Foundations")}
          />
          <Spacer location="top" size="large" />
          <MeditationScreenComponent3
            photo="https://cdn.dribbble.com/users/1787323/screenshots/15456036/media/af945d5a61cc8dfff32aee9afa99434f.png"
            title="Managing Anxiety"
            description="say no to anxiety!"
            onPress={() => navigation.navigate("Managing Anxiety")}
          />
          <Spacer location="top" size="large" />
          <MeditationScreenComponent3
            photo="https://cdn.dribbble.com/users/1787323/screenshots/15491880/media/6767bd6d559d452760e48a298b73e6f0.png?compress=1&resize=1600x1200"
            title="Overcoming Stress"
            description="Be at peace with your situatiion"
            onPress={() => navigation.navigate("Stress")}
          />
          <Spacer location="top" size="large" />
          <MeditationScreenComponent3
            photo="https://cdn.dribbble.com/users/1787323/screenshots/15445565/media/af6443b55617bd002e23d4b0bcc1dc36.png"
            title="Depression"
            description="find the mindfulness you need"
            onPress={() => navigation.navigate("DepressionCourse")}
          />
          <Spacer location="top" size="large" />
          <MeditationScreenComponent3
            photo="https://cdn.dribbble.com/users/1787323/screenshots/13413600/media/94b400acc6fefd50996098feba0b6aa3.png?compress=1&resize=1600x1200"
            title="Productivity"
            description="boost your mental energy!"
            onPress={() => navigation.navigate("ProductivityCourse")}
          />
          <Spacer location="top" size="large" />
          <MeditationScreenComponent3
            photo="https://cdn.dribbble.com/users/1787323/screenshots/14331984/media/63c32e49add4e0cd14de47172e67fed0.png?compress=1&resize=1600x1200"
            title="Sleep"
            description="Add meditation to your sleep routine."
            onPress={() => navigation.navigate("SleepCourse")}
          />
          <Spacer location="top" size="large" />
        </CardArea>
      </ScrollView>
    </>
  );
};
