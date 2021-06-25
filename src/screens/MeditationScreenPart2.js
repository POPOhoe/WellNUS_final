import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Text } from "../components/TextComponents";

import { MeditationScreen } from "./MeditationScreen";
import { Welcome } from "../components/Content/MeditationScreen/Welcome";
import { CourseScreen } from "../components/CourseScreen";
import { Player } from "../components/Player";
import { Player2 } from "../../Player2";

export const MeditationScreenPart2 = () => {
  const Stack = createStackNavigator();

  return (
    <>
      <NavigationContainer independent={true}>
        <Stack.Navigator>
          <Stack.Screen name="WellNUS" component={MeditationScreen} />
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Foundations" component={CourseScreen} />
          <Stack.Screen name="Player" component={Player2} />
          {/* <Stack.Screen name="Anxiety" component={Anxiety} />
          <Stack.Screen name="Stress" component={Stress} />
          <Stack.Screen name="Depression" component={Depression} />
          <Stack.Screen name="Productivity" component={Productivity} />
          <Stack.Screen name="Sleep" component={Sleep} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
