import { StyleSheet, View } from "react-native";
import getWorkoutTimeCategory from "@/utils/getDayPeriod";
import formatDate from "@/utils/dateToStr";
import formatTime from "@/utils/secToStr";

import { ThemedText } from "@/components/ThemedText";
import Card from "@/components/Card";
import IconText from "@/components/IconText";

export default function WorkoutHistoryCard({ workout }) {
  return (
    <Card>
      <ThemedText type="defaultSemiBold">{getWorkoutTimeCategory(workout.time)}</ThemedText>

      <ThemedText type="subtitle">{formatDate(workout.time)}</ThemedText>

      <View style={styles.columnContainer}>
        <View style={styles.entryColumn}>
          <IconText iconName="clock" text={formatTime(workout.duration)} />
          <ThemedText type="subtitleSemiBold">{"Exercise"}</ThemedText>

          {workout.exercises.map((exercise) => (
            <ThemedText type="defaultSemiTrans">
              {exercise.name + " x " + exercise.sets.length + " sets"}
            </ThemedText>
          ))}
        </View>

        <View style={styles.entryColumn}>
          <IconText iconName="weight-kilogram" text={workout.volume + " kg"} />
          <ThemedText type="subtitleSemiBold">{"Volume"}</ThemedText>

          {workout.exercises.map((exercise) => (
            <ThemedText type="defaultSemiTrans">
              {exercise.sets.reduce((acc, curr) => acc + curr.reps * curr.weight, 0) + " kg"}
            </ThemedText>
          ))}
        </View>

        <View style={styles.entryColumn}>
          <IconText iconName="lightning-bolt" text={workout.calories + " cal"} />
          <ThemedText type="subtitleSemiBold">{"Calories"}</ThemedText>

          {workout.exercises.map((exercise) => (
            <ThemedText type="defaultSemiTrans">{"200 kcal"}</ThemedText>
          ))}
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
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
