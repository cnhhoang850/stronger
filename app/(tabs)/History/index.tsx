import { useCallback, lazy, Suspense } from "react";
import { StyleSheet, SectionList, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import storage from "@/store/LocalStore";
import useStore from "@/store/useStore";
import WorkoutCardSuspense from "@/components/WorkoutCardSuspense";
const WorkoutHistoryCard = lazy(() => import("@/components/WorkoutHistoryCard"));
import { ContextMenuView } from "react-native-ios-context-menu";

export default function HomeScreen() {
  const workouts = useStore((state) => state.workouts);
  const groupedWorkouts = groupWorkoutsByMonth(workouts);

  const renderItem = useCallback(({ item }) => {
    return (
      <Suspense fallback={<WorkoutCardSuspense />}>
        <ContextMenuView
          menuConfig={{
            menuTitle: "",
            menuItems: [
              {
                actionKey: "delete",
                actionTitle: "Delete",
                menuTitle: "Options",
              },
            ],
          }}
          previewConfig={{
            previewType: "CUSTOM",
            backgroundColor: "black",
          }}
          renderPreview={() => (
            <View
              style={{ height: 100, width: 100, backgroundColor: "white" }}
            ></View>
          )}
        >
          <WorkoutHistoryCard workout={item} />
        </ContextMenuView>
      </Suspense>
    );
  }, []);

  storage.clearAll();

  return (
    <ThemedView style={styles.sectionListContainer}>
      <SectionList
        sections={groupedWorkouts}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => (
          <ThemedView
            style={{ paddingTop: 6, paddingBottom: 12, paddingLeft: 16 }}
          >
            <ThemedText type="subtitle">{title}</ThemedText>
          </ThemedView>
        )}
        contentInsetAdjustmentBehavior="automatic"
        stickySectionHeadersEnabled={true}
        initialNumToRender={6}
        maxToRenderPerBatch={5}
        windowSize={10}
        updateCellsBatchingPeriod={100}
        removeClippedSubviews={true}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  sectionListContainer: {
    flex: 1,
    margin: 0,
    overflow: "hidden",
  },
  cardContainer: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});

function groupWorkoutsByMonth(workouts) {
  const groupedWorkouts = {};

  workouts.forEach((workout) => {
    if (!workout) return;

    const date = new Date(workout.time);
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    const monthYear = `${month} ${year}`;

    if (!groupedWorkouts[monthYear]) {
      groupedWorkouts[monthYear] = [];
    }

    groupedWorkouts[monthYear].push(workout);
  });

  return Object.keys(groupedWorkouts).map((key) => ({
    title: key,
    data: groupedWorkouts[key],
  }));
}
