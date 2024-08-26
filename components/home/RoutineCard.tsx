import { memo, useRef } from "react";
import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import getWorkoutTimeCategory from "@/utils/getDayPeriod";
import formatDate from "@/utils/dateToStr";
import formatDuration from "@/utils/secToStr";
import { Card as PaperCard, Button as PaperButton } from "react-native-paper";
import { ThemedText } from "@/components/ThemedText";
import IconText from "@/components/IconText";
import useStore from "@/store/useStore";
import ForwardButton from "@/components/ForwardButton";
import { ContextMenuView, ContextMenuButton } from "react-native-ios-context-menu";
import { useTheme } from "react-native-paper";
import ExerciseImages from "@/assets/exercises/images";
import ExerciseListItem from "@/components/ExerciseListItem";

function RoutineCard({ template, style, ...rest }) {
  const theme = useTheme();
  const exerciseData = useStore((state) => state.exercises);
  const contextTouchAreaRef = useRef(null);

  return (
    <ContextMenuView
      menuConfig={{
        menuTitle: "",
        menuItems: [
          {
            actionKey: "delete",
            actionTitle: "Delete",
          },
        ],
      }}
    >
      <PaperCard style={{ ...styles.cardContainer, ...style }} mode="contained">
        <PaperCard.Content>
          <View style={styles.headerContainer}>
            <ForwardButton path="/templateEditor/editor" params={{ id: template.id }} />
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
    </ContextMenuView>
  );
}

export default memo(RoutineCard);

const styles = StyleSheet.create({
  cardContainer: {
    marginRight: 16,
    marginBottom: 16,
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
