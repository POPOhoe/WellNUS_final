import React from "react";
import { Image, Linking, TouchableOpacity } from "react-native";
import { Spacer } from "./spacer.component";
import { Text } from "./TextComponents";
import {
  ColumnSection,
  RowSection,
  HomeScreenCard,
  CardCover,
} from "./styles/HomeScreenCardStyle";

export const HomeScreenComponents = ({
  photo,
  title,
  description,
  onPress,
}) => {
  // const {
  //   photo = [
  //     "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwb2JqZWN0c3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
  //   ],
  //   title = "Courses and Singles",
  //   description = "Guided meditation for any moment",
  // } = card;

  return (
    <HomeScreenCard elevation={5}>
      <ColumnSection>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              "https://www.nus.edu.sg/uhc/activities/world-mental-health-day"
            )
          }
        >
          <CardCover
            key={title}
            source={{ uri: photo }}
            // resizeMode={"auto"}
            style={{
              flexDirection: "column",
              height: 100,
            }}
          />
          <ColumnSection style={{ flex: 4 }}>
            <Text variant="label" style={{ flex: 1 }}>
              {title}
            </Text>

            <Text variant="body" style={{ flex: 1 }}>
              {description}
            </Text>
          </ColumnSection>
        </TouchableOpacity>
      </ColumnSection>
    </HomeScreenCard>
  );
};
