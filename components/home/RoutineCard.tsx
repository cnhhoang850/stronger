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
import { ContextMenuView } from "react-native-ios-context-menu";
import { useTheme } from "react-native-paper";
import ExerciseImages from "@/assets/exercises/images";
import ExerciseListItem from "@/components/ExerciseListItem";

function RoutineCard({ template, style, ...rest }) {
  const theme = useTheme();
  const exerciseData = useStore((state) => state.exercises);

  return (
    <ContextMenuView
      style={{
        borderRadius: 16,
        marginRight: 16,
        marginBottom: 16,
      }}
      menuConfig={{
        menuTitle: "",
      }}
      previewConfig={{
        previewType: "CUSTOM",
        isResizeAnimated: true,
      }}
      renderPreview={() => <RoutineCardPreview template={template} />}
    >
      <PaperCard style={{ ...styles.cardContainer, ...style }} mode="contained">
        <PaperCard.Content>
          <View style={styles.headerContainer}>
            <ForwardButton
              path="/(tabs)/history/modal"
              params={{ id: template.id }}
            />
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

const RoutineCardPreview = ({ template }) => {
  return (
    <PaperCard style={{ width: 400, borderRadius: 12 }} mode="contained">
      <PaperCard.Content>
        <View style={styles.headerContainer}></View>

        <View style={styles.columnContainer}>
          <View style={styles.entryColumn}>
            <ThemedText type="subtitleSemiBold">{"Exercise"}</ThemedText>

            {template.exercises.map((exercise, index) => {
              const source = `img${exercise.id}`;
              return (
                <ExerciseListItem
                  exercise={exercise}
                  image={ExerciseImages[source]}
                />
              );
            })}
          </View>
        </View>
      </PaperCard.Content>
    </PaperCard>
  );
};

export default memo(RoutineCard);

const styles = StyleSheet.create({
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
