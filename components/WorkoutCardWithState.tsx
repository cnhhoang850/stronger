import { StyleSheet, View } from "react-native";
import getWorkoutTimeCategory from "@/utils/getDayPeriod";
import formatDate from "@/utils/dateToStr";
import formatDuration from "@/utils/secToStr";
import { Card as PaperCard } from "react-native-paper";
import { Link } from "expo-router";

import { ThemedText } from "@/components/ThemedText";
import IconText from "@/components/IconText";

export default function WorkoutHistoryCard({ workout }) {
  return (
    <PaperCard style={styles.cardContainer}>
      <PaperCard.Content>
        <View style={styles.headerContainer}>
          <View>
            <ThemedText type="defaultSemiBold">{getWorkoutTimeCategory(workout.time)}</ThemedText>

            <ThemedText type="subtitle">{formatDate(workout.time)}</ThemedText>
          </View>
          <Link href="/modal">...</Link>
        </View>

        <View style={styles.columnContainer}>
          <View style={styles.entryColumn}>
            <IconText iconName="clock" text={formatDuration(workout.duration)} />
            <ThemedText type="subtitleSemiBold">{"Exercise"}</ThemedText>

            {workout.exercises.map((exercise, index) => (
              <ThemedText key={index} type="defaultSemiTrans">
                {exercise.name + " x " + exercise.sets.length + " sets"}
              </ThemedText>
            ))}
          </View>

          <View style={styles.entryColumn}>
            <IconText iconName="weight-kilogram" text={workout.volume + " kg"} />
            <ThemedText type="subtitleSemiBold">{"Volume"}</ThemedText>

            {workout.exercises.map((exercise, index) => (
              <ThemedText key={index} type="defaultSemiTrans">
                {exercise.sets.reduce((acc, curr) => acc + curr.reps * curr.weight, 0) + " kg"}
              </ThemedText>
            ))}
          </View>

          <View style={styles.entryColumn}>
            <IconText iconName="lightning-bolt" text={workout.calories + " cal"} />
            <ThemedText type="subtitleSemiBold">{"Calories"}</ThemedText>

            {workout.exercises.map((exercise, index) => (
              <ThemedText key={index} type="defaultSemiTrans">
                {"200 kcal"}
              </ThemedText>
            ))}
          </View>
        </View>
      </PaperCard.Content>
    </PaperCard>
  );
}

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
