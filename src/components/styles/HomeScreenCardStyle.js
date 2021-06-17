import styled from "styled-components/native";
import { Card } from "react-native-paper";

export const ColumnSection = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

export const RowSection = styled.View`
  padding: ${(props) => props.theme.space[3]};
  flex-direction: row;
`;

export const SideSection = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

export const HomeScreenCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  margin-bottom: ${(props) => props.theme.space[2]};
`;

export const CardCover = styled(Card.Cover)`
  background-color: ${(props) => props.theme.colors.bg.primary};
`;
