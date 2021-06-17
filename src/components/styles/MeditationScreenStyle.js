import { FlatList } from "react-native";
import styled from "styled-components/native";

export const CardArea = styled.View`
  flex: 1
  padding: 16px;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;
