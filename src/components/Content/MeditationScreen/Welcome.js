import React from "react";
import { HomeScreenComponents } from "../../MeditationScreenComponent";
import { ScrollView, View } from "react-native";
import { Text } from "../../TextComponents";
import { ArticleScreenTemplate } from "../../ArticleScreenTemplate";

export const Welcome = () => {
  return (
    <>
      <ScrollView>
        <View style={{ padding: 16 }}>
          <ArticleScreenTemplate
            photo="https://cdn.dribbble.com/users/1787323/screenshots/13681277/media/8e6ab2337d70cd8db3990f10073607d1.png?compress=1&resize=1600x1200"
            title="Meditation for beginners"
            description="Most first-time meditators find it strange to sit in silence, to sit with their innermost thoughts and feelings, to sit and do nothing — the very things that, funnily enough, the mind tends to resist. To a beginner, meditation might initially feel a little alien, perhaps even daunting, but that’s okay. People have been meditating for around 3,000 years, and many have doubtless experienced the same reticence, trepidation, or wonder that first-time meditators often feel."
          />
        </View>
      </ScrollView>
    </>
  );
};
