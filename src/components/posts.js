import React from "react";
import { FlatList } from "react-native";
import { Text } from "../../src/components/TextComponents";
import { Button, Card, Title, Paragraph } from "react-native-paper";

export const posts = ({
  type,
  OP,
  OPdp,
  title,
  date,
  description,
  likes,
  comments,
  ...props
}) => {
  const renderItem = ({ comment, like }) => {
    return (
      <Card>
        <Card.Content>
          <Paragraph>comment</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button>{like + "likes"}</Button>
        </Card.Actions>
      </Card>
    );
  };
  return (
    <>
      <Card>
        <Card.Title title={type} subtitle={"posted by " + OP} left={OPdp} />
        <Card.Content>
          <Title>{title}</Title>
          <Paragraph>{description}</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button>{comments.length}</Button>
          <Button>{likes + "♡"}</Button>
        </Card.Actions>
      </Card>
      <FlatList
        data={comments}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </>
  );
};
