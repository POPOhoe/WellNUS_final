import { StatusBar, SafeAreaView, FlatList } from "react-native";
import { Appbar } from "react-native-paper";
import styled from "styled-components/native";

export const SafeArea = styled(SafeAreaView)`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
`;

export const UserButtonArea = styled(Appbar)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  left: ${(props) => props.theme.space[0]};
  right: ${(props) => props.theme.space[0]};
  bottom: ${(props) => props.theme.space[0]};
`;

export const CardArea = styled.View`
  flex: 1
  padding: 16px;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

export const ScrollingList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;
