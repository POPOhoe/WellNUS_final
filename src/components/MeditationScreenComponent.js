import React from "react";
import { Text } from "./TextComponents";
import { View } from "react-native";
import { Card } from "react-native-paper";
import styled from "styled-components/native";

export const HomeScreenCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

export const CardCover = styled(Card.Cover)`
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

export const MeditationScreenComponent = ({
  photo,
  title,
  description,
  onPress,
}) => {
  return (
    <HomeScreenCard elevation={5} onPress={onPress}>
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            flex: 2,
            paddingLeft: 16,
          }}
        >
          <Text variant="label">{title}</Text>
          <Text variant="body">{description}</Text>
        </View>

        <CardCover
          key={title}
          source={{ uri: photo }}
          style={{ height: 100, width: 125, padding: 0 }}
          // resizeMode={"auto"}
        />
      </View>
    </HomeScreenCard>
  );
};
