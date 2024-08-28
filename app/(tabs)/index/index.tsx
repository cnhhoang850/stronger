import { useCallback, lazy, Suspense, useLayoutEffect } from "react";
import { Dimensions, StyleSheet, SectionList, ScrollView, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import storage from "@/store/LocalStore";
import useStore from "@/store/useStore";
import WorkoutCardSuspense from "@/components/WorkoutCardSuspense";
import { useNavigation } from "expo-router";
import { SFSymbol } from "@/components/SFSymbols";
import RoutineCard from "@/components/RoutineCard";
const WorkoutHistoryCard = lazy(() => import("@/components/WorkoutHistoryCard"));

import LinkButton from "@/components/LinkButton";

export default function HomeScreen() {
  const nav = useNavigation();
  const templates = useStore((state) => state.templates);
  const CARD_WIDTH = (Dimensions.get("window").width - 48) / 2;

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
    <ScrollView style={{}} contentInsetAdjustmentBehavior="automatic">
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          height: "100%",
          width: "100%",
          paddingLeft: 16,
          paddingRight: 0,
          margin: 0,
          marginTop: 32,
        }}
      >
        {templates &&
          templates.map((template, index) => {
            return <RoutineCard key={index} style={{ width: CARD_WIDTH }} template={template} />;
          })}
      </View>
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
