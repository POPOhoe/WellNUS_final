import React from "react";
import { ScrollView, Touchable, View } from "react-native";
import { HomeScreenComponents } from "../components/HomeScreenComponents";
import { HomeScreenComponents2 } from "../components/HomeScreenComponents2";
import { CardArea, ScrollingList } from "../components/styles/HomeScreenStyle";
import { Text } from "../components/TextComponents";
import { Button } from "react-native-paper";
import { Spacer } from "../components/spacer.component";
import { UserButtonArea } from "../components/styles/HomeScreenStyle";
import { Appbar } from "react-native-paper";
import { Player } from "../components/Player";

export const Homescreen = () => {
  const cards = [
    {
      photo:
        "https://ctl.s6img.com/society6/img/k_pRmrWZb45QjHwSVavzd7qfB70/w_700/prints/~artwork/s6-original-art-uploads/society6/uploads/misc/437ea683ac76447db2ab646d7572d00a/~~/be-kind-to-yourself110131-prints.jpg",
      title: "Good Morning, Dominic ",
      description: "Start your day right with WellNUS 🙂",
      id: 1,
    },
  ];

  return (
    <>
      <ScrollView>
        <UserButtonArea>
          <Appbar.Action
            icon="account"
            onPress={() => console.log("Pressed archive")}
          />
        </UserButtonArea>
        <CardArea>
          <Text variant="label" style={{ paddingBottom: 5 }}>
            Welcome Dominic to WellNUS!
          </Text>
          <Text variant="body" style={{ paddingBottom: 16 }}>
            Your everyday habit for mental well-being
          </Text>
          <HomeScreenComponents2
            photo="https://cdn.dribbble.com/users/1787323/screenshots/14331984/media/63c32e49add4e0cd14de47172e67fed0.png?compress=1&resize=1600x1200"
            description="Seeking help is a sign of strength — not a weakness."
          />
          <Spacer position="top" size="large" />
          <Text variant="label" style={{ paddingBottom: 16 }}>
            How are you feeling today?
          </Text>
          <Button
            mode="outlined"
            onPress={() => console.log("Pressed")}
            contentStyle={{ height: 50 }}
          >
            <Text>🤪 Happy</Text>
          </Button>
          <Spacer position="top" size="small" />
          <Button
            mode="outlined"
            onPress={() => console.log("Pressed")}
            contentStyle={{ height: 50 }}
          >
            <Text> 😫 Anxious</Text>
          </Button>
          <Spacer position="top" size="small" />
          <Button
            mode="outlined"
            onPress={() => console.log("Pressed")}
            contentStyle={{ height: 50 }}
          >
            <Text>😕 Sad</Text>
          </Button>
          <Spacer position="top" size="large" />

          <Text variant="label" style={{ paddingBottom: 16 }}>
            Happenings in NUS
          </Text>
          <HomeScreenComponents
            photo="https://www.nus.edu.sg/uhc/images/default-source/default-album/wmhdforstaffportal.jpg?sfvrsn=1b9b6b77_0"
            title="Talks and Workshops for World Mental Health Day"
            description="In Singapore, 1 in 10 adults suffer from a mental health disorder. Those afflicted are often prevented from seeking help because of stigma attached to mental health concerns."
            onPress={() =>
              "www.nus.edu.sg/uhc/activities/world-mental-health-day"
            }
          />
        </CardArea>
      </ScrollView>
    </>
  );
};
