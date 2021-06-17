import React from "react";
import { Text } from "./TextComponents";
import { View } from "react-native";
import { Card } from "react-native-paper";
import styled from "styled-components/native";
import { windowWidth, windowHeight } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";

export const HomeScreenCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

export const CardCover = styled(Card.Cover)`
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

export const CourseScreenComponent = ({ photo, title, description }) => {
  return (
    <HomeScreenCard elevation={5}>
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            flex: 2,
            paddingLeft: 16,
          }}
        >
          <Text variant="body">{title} </Text>
          <View flexDirection="row" alignItems="center"> 
          <AntDesign name="sound" size={15} color="black" />
          <Text variant="description"> {description}</Text>

          </View>
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CardCover
            key={title}
            source={{ uri: photo }}
            style={{
              height: 100,
              width: 125,
            }}
            // resizeMode={"auto"}
          />
        </View>
      </View>
    </HomeScreenCard>
  );
};
