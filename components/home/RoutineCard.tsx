import { memo } from "react";
import { StyleSheet, View } from "react-native";
import getWorkoutTimeCategory from "@/utils/getDayPeriod";
import formatDate from "@/utils/dateToStr";
import formatDuration from "@/utils/secToStr";
import { Card as PaperCard, Button as PaperButton } from "react-native-paper";
import { ThemedText } from "@/components/ThemedText";
import IconText from "@/components/IconText";
import useStore from "@/store/useStore";
import ForwardButton from "@/components/ForwardButton";

function RoutineCard({ template }) {
  return (
    <PaperCard style={{ ...styles.cardContainer }} mode="contained">
      <PaperCard.Content>
        <View style={styles.headerContainer}>
          <ForwardButton path="/(tabs)/history/modal" params={{ id: template.id }} />
        </View>

        <View style={styles.columnContainer}>
          <View style={styles.entryColumn}>
            <ThemedText type="subtitleSemiBold">{"Exercise"}</ThemedText>

            {template.exercises.map((exercise, index) => (
              <ThemedText key={index} type="defaultSemiTrans">
                {exercise.name + " x " + exercise.sets.length + " sets"}
              </ThemedText>
            ))}
          </View>
        </View>
      </PaperCard.Content>
    </PaperCard>
  );
}

export default memo(RoutineCard);

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    marginBottom: "5%",
    marginHorizontal: 16,
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 2,
  },
  columnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  entryColumn: {
    display: "flex",
  },
});
