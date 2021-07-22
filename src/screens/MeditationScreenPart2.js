import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Text } from "../components/TextComponents";

import { MeditationScreen } from "./MeditationScreen";
import { Welcome } from "../components/Content/MeditationScreen/Welcome";
import { CourseScreen } from "../components/CourseScreen";
import { Player } from "../components/Player";

import { Player1 } from "../../Players/Player1";
import { Player2 } from "../../Players/Player2";
import { CourseScreen2 } from "../components/CourseScreen2";
import { CourseScreen3 } from "../components/CourseScreen3";
import { Player3 } from "../../Players/Player3";
import { Player4 } from "../../Players/Player4";
import { CourseScreen4 } from "../components/CourseScreen4";
import { CourseScreen5 } from "../components/CourseScreen5";
import { Player5 } from "../../Players/Player5";
import { Player6 } from "../../Players/Player6";
import { Player7 } from "../../Players/Player7";
import { CourseScreen6 } from "../components/CourseScreen6";

const Basics = ({ route }) => {
  const { index } = route.params;
  return <Player2 index={index} />;
};

const Anxiety = ({ route }) => {
  const { index } = route.params;
  return <Player3 index={index} />;
};

const StressedOut = ({ route }) => {
  const { index } = route.params;
  return <Player4 index={index} />;
};

const Depression = ({ route }) => {
  const { index } = route.params;
  return <Player5 index={index} />;
};

const Productivity = ({ route }) => {
  const { index } = route.params;
  return <Player6 index={index} />;
};

const Sleep = ({ route }) => {
  const { index } = route.params;
  return <Player7 index={index} />;
};

export const MeditationScreenPart2 = () => {
  const Stack = createStackNavigator();

  return (
    <>
      <NavigationContainer independent={true}>
        <Stack.Navigator>
          <Stack.Screen name="WellNUS" component={MeditationScreen} />
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen
            name="Foundations"
            component={CourseScreen}
            options={{ title: "Basics" }}
          />
          <Stack.Screen
            name="Basics"
            component={Basics}
            options={{ title: "Basics" }}
          />
          <Stack.Screen name="Managing Anxiety" component={CourseScreen2} />
          <Stack.Screen
            name="Stress"
            component={CourseScreen3}
            options={{ title: "Managing Stress" }}
          />
          <Stack.Screen
            name="Stressed"
            component={Player1}
            options={{ title: "Stressed" }}
          />
          <Stack.Screen
            name="Anxiety"
            component={Anxiety}
            options={{ title: "Managing Anxiety" }}
          />
          <Stack.Screen
            name="Stressed Out"
            component={StressedOut}
            options={{ title: "Managing Stress" }}
          />
          <Stack.Screen
            name="Depression"
            component={Depression}
            options={{ title: "Managing Depression" }}
          />
          <Stack.Screen
            name="DepressionCourse"
            component={CourseScreen4}
            options={{ title: "Managing Depression" }}
          />
          <Stack.Screen
            name="Productivity"
            component={Productivity}
            options={{ title: "For Productivity" }}
          />
          <Stack.Screen
            name="ProductivityCourse"
            component={CourseScreen5}
            options={{ title: "For Productivity" }}
          />
          <Stack.Screen
            name="Sleep"
            component={Sleep}
            options={{ title: "For Sleep" }}
          />
          <Stack.Screen
            name="SleepCourse"
            component={CourseScreen6}
            options={{ title: "For Sleep" }}
          />
          {/* <Stack.Screen name="" component={CourseScreen} />  */}
          {/* <Stack.Screen name="Stress" component={Stress} />
          <Stack.Screen name="Depression" component={Depression} />
          <Stack.Screen name="Productivity" component={Productivity} />
          <Stack.Screen name="Sleep" component={Sleep} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
