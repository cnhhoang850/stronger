import { useCallback, lazy, Suspense, useLayoutEffect } from "react";
import { StyleSheet, SectionList, ScrollView } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import storage from "@/store/LocalStore";
import useStore from "@/store/useStore";
import WorkoutCardSuspense from "@/components/WorkoutCardSuspense";
import { useNavigation } from "expo-router";
import { SFSymbol } from "@/components/SFSymbols";
import RoutineCard from "@/components/home/RoutineCard";
const WorkoutHistoryCard = lazy(() => import("@/components/WorkoutHistoryCard"));

import { Dimensions } from "react-native";
import LinkButton from "@/components/LinkButton";

const screenWidth = Dimensions.get("window").width;
const CARD_WIDTH = (screenWidth - 64) / 2;

export default function HomeScreen() {
  const nav = useNavigation();
  const templates = useStore((state) => state.templates);

  useLayoutEffect(() => {
    nav.setOptions({
      headerSearchBarOptions: {
        hideWhenScrolling: false,
      },
      headerRight: () => (
        <ThemedText
          style={{
            paddingRight: 6,
          }}
          type="system"
          onPress={() => {
            nav.navigate("modal");
          }}
        >
          <SFSymbol name="plus" size={24} style={{ width: 32, height: 32 }} />
        </ThemedText>
      ),
      headerLeft: () => (
        <ThemedText type="system" onPress={() => {}}>
          Edit
        </ThemedText>
      ),
    });
  }, [nav]);

  const renderItem = useCallback(({ item }) => {
    return <Suspense fallback={<WorkoutCardSuspense />}></Suspense>;
  }, []);

  return (
    <ScrollView
      style={{
        flex: 1,
        flexDirection: "column",
        flexWrap: "wrap",
      }}
      contentInsetAdjustmentBehavior="automatic"
    >
      {templates &&
        templates.map((template) => {
          console.log(template);
          return <RoutineCard style={{ width: CARD_WIDTH }} template={template} />;
        })}
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
