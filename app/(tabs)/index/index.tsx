import { useCallback, lazy, Suspense } from "react";
import { StyleSheet, SectionList, ScrollView } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import storage from "@/store/LocalStore";
import useStore from "@/store/useStore";
import WorkoutCardSuspense from "@/components/WorkoutCardSuspense";
const WorkoutHistoryCard = lazy(() => import("@/components/WorkoutHistoryCard"));

import LinkButton from "@/components/LinkButton";

export default function HomeScreen() {
  const workouts = useStore((state) => state.workouts);

  const renderItem = useCallback(({ item }) => {
    return (
      <Suspense fallback={<WorkoutCardSuspense />}>
        <WorkoutHistoryCard workout={item} />
      </Suspense>
    );
  }, []);

  storage.clearAll();

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <LinkButton path="/newWorkout" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  sectionListContainer: {
    flex: 1,
    margin: 0,
    height: "100%",
    paddingTop: 300,
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
