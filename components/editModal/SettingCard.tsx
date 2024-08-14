import { StyleSheet, View } from "react-native";
import getWorkoutTimeCategory from "@/utils/getDayPeriod";
import formatDate from "@/utils/dateToStr";
import formatDuration from "@/utils/secToStr";
import { Card as PaperCard, Button as PaperButton } from "react-native-paper";
import { ThemedText } from "@/components/ThemedText";

export default function SettingCard({ workout }) {
  return (
    <PaperCard mode="contained" style={styles.cardContainer}>
      <View style={styles.cardRow}>
        <ThemedText type="menu">{getWorkoutTimeCategory(workout.time)}</ThemedText>
      </View>
      <View style={styles.cardRow}>
        <ThemedText type="menu">Date</ThemedText>
        <ThemedText type="default">{formatDate(workout.time)}</ThemedText>
      </View>
      <View style={{ ...styles.cardRow, borderBottomWidth: 0 }}>
        <ThemedText type="menu">Duration</ThemedText>
        <ThemedText type="default">{formatDuration(workout.duration)}</ThemedText>
      </View>
    </PaperCard>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 2,
    paddingRight: 0,
    paddingLeft: 12,
    marginBottom: 26,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 26,
  },
  cardRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 44,
    lineHeight: 16,
    padding: 8,
    paddingLeft: 0,
    margin: 0,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderBottomColor: "#d3d3d3",
    alignContent: "center",
  },
});
