import React from "react";
import { Text } from "./TextComponents";
import { View } from "react-native";
import { Card } from "react-native-paper";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export const HomeScreenCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

export const CardCover = styled(Card.Cover)`
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

export const MeditationScreenComponent2 = ({
  photo,
  title,
  description,
  onPress,
}) => {
  return (
    <HomeScreenCard elevation={5} onPress={onPress}>
      <View style={{ flexDirection: "row", padding: 16 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons
            name="play-circle-sharp"
            size={50}
            color="black"
            style={{ flex: 1 }}
          />
        </View>

        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            flex: 2,
            paddingLeft: 0,
          }}
        >
          <Text variant="body">{title}</Text>
          <View flexDirection="row" alignItems="center">
            <AntDesign name="sound" size={15} color="black" />
            <Text variant="body"> {description}</Text>
          </View>
        </View>

        <CardCover
          key={title}
          source={{ uri: photo }}
          style={{ height: 75, width: 100, padding: 0 }}
          // resizeMode={"auto"}
        />
      </View>
    </HomeScreenCard>
  );
};
