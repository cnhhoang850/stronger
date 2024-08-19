import { memo } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { Card as PaperCard, Button as PaperButton } from "react-native-paper";
import { ThemedText } from "@/components/ThemedText";

function TemplateCard() {
  return (
    <PaperCard style={styles.cardContainer} mode="contained">
      <View>
        <ActivityIndicator size="large" color="#000" />
      </View>
    </PaperCard>
  );
}

export default memo(WorkoutCardSuspense);

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    height: 200,
    marginHorizontal: 16,
    marginBottom: 16,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
});
