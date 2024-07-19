import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import getWorkoutTimeCategory from "@/utils/getDayPeriod";
import formatDate from "@/utils/dateToStr";
import formatTime from "@/utils/secToStr";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { ThemedText } from "@/components/ThemedText";
import Card from "@/components/Card";
import IconText from "@/components/IconText";

export default function WorkoutHistoryCard({ workout }) {
  return (
    <Card>
      <ThemedText type="defaultSemiBold">{getWorkoutTimeCategory(workout.time)}</ThemedText>
      <ThemedText type="subtitle">{formatDate(workout.time)}</ThemedText>
      <View style={styles.iconContainer}>
        <IconText iconName="clock" text={formatTime(workout.duration)} />
        <IconText iconName="dumbbell" text={workout.volume + " kg"} />
        <IconText iconName="fire" text={workout.calories + " cal"} />
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
});
